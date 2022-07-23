<template>
  <div class="ospf-topology">
    <div class="ospf-topology__dialogs">
      <Dialog v-model:show="editWeightDialogVisible" :shouldBeRotated="shouldBeRotated">
        <edit-weight @editWeight="editWeight" />
      </Dialog>
    </div>
    <div class="ospf-topology__content">
      <div class="ospf__problem ospf-problem">
        <span class="ospf-problem__text"> {{ reset_topology_text }}</span>
        <Button @click="redraw">{{ reset_topology_btn }}</Button>
      </div>
      <div class="ospf-topology__topology">
        <div ref="ospfNetwork" id="ospfNetwork"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import Dialog from "../../layout/Dialog.vue";
import EditWeight from "./ospfEditWeight.vue";
import Button from "../../layout/Button.vue";

export default {
  components: { Dialog, EditWeight, Button },
  name: "ospf-topology",
  data() {
    return {
      editWeightDialogVisible: false,

      network: {},
      networkData: {
        nodes: new vis.DataSet(),
        edges: new vis.DataSet(),
      },
      options: {
        autoResize: true,
        physics: false,
        width: "100%",
        height: "100%",
        nodes: {
          shape: "image",
          image: require("@/assets/icons/router.png"),
        },
        edges: {
          smooth: { type: "curvedCW", roundness: 0 },
          width: 4,
          color: { color: "#1976D2", highlight: "#0D47A1", hover: "#0D47A1" },
        },
        layout: {
          randomSeed: 1,
        },
        interaction: {
          dragView: false,
          zoomView: true,
          selectConnectedEdges: false,
          hover: true,
          hoverConnectedEdges: false,
        },
      },
    };
  },
  methods: {
    ...mapMutations({
      setLoading: "ospf/setLoading",
      setLoadFail: "ospf/setLoadFail",
      pushMetric: "ospf/pushMetric",
    }),
    ...mapActions({
      fetchTask: "ospf/fetchTask",
      cleaner: "ospf/cleaner",
      logout: "auth/logout",
    }),

    setTask() {
      this.setLoading(true);
      setTimeout(async () => {
        try {
          await this.fetchTask();

          this.setNodes();
          this.setEdges();

          this.network = new vis.Network(
            this.$refs.ospfNetwork,
            this.networkData,
            this.options
          );

          this.setEvents();
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              this.cleaner();
              this.logout();
            }
            else {
              this.cleaner();
              this.setLoadFail(true);
            }
          }
          else {
            console.log(err);
          }
        } finally {
          this.setLoading(false);
        }
      }, 2000);
    },
    setNodes() {
        for (let i = 0; i < this.bandwidths.length; ++i) {
          this.networkData.nodes.add({
            id: i,
            label: `Router ${i}`,
          });
        }
    },
    setEdges() {
      for (let i = 0; i < this.bandwidths.length; ++i) {
        for (let j = i; j < this.bandwidths.length; ++j) {
          if (this.bandwidths[i][j] > 0) {
            this.networkData.edges.add({
              from: i,
              to: j,
              label: this.bytesConverter(this.bandwidths[i][j]),
              title: this.bytesConverter(this.bandwidths[i][j]),
              id: `${i},${j}`,
            });
          }
        }
      }
    },
    setEvents() {
      this.network.on("selectEdge", this.showDialog);
      this.network.on("hoverEdge", () => {
        this.network.canvas.body.container.style.cursor = "pointer";
      });
      this.network.on("blurEdge", () => {
        this.network.canvas.body.container.style.cursor = "default";
      });
      this.network.on("hoverNode", () => {
        this.network.canvas.body.container.style.cursor = "pointer";
      });
      this.network.on("blurNode", () => {
        this.network.canvas.body.container.style.cursor = "default";
      });
      this.network.on("dragStart", () => {
        this.network.canvas.body.container.style.cursor = "grabbing";
      });
      this.network.on("dragging", () => {
        this.network.canvas.body.container.style.cursor = "grabbing";
      });
      this.network.on("dragEnd", () => {
        this.network.canvas.body.container.style.cursor = "pointer";
      });
    },

    editWeight(weight) {
      this.networkData.edges.update({
        id: this.network.getSelectedEdges()[0],
        label: weight,
      });
      this.pushMetric({
        [this.network.getSelectedEdges()[0]]: weight,
      });
      this.editWeightDialogVisible = false;
    },
    showDialog() {
      this.editWeightDialogVisible = true;
    },

    redraw() {
      this.network.destroy();
      this.options.layout.randomSeed += Math.floor(Math.random() * 1000);
      this.network = new vis.Network(
        this.$refs.ospfNetwork,
        this.networkData,
        this.options
      );
      this.setEvents();
    },
  },
  mounted() {
    this.setTask();
  },
  computed: {
    ...mapState({
      loading: (state) => state.ospf.loading,
      loadFail: (state) => state.ospf.loadFail,
      shouldBeRotated: (state) => state.ospf.shouldBeRotated,
      ref_bandwidth: (state) => state.ospf.ref_bandwidth,
      path: (state) => state.ospf.path,
      bandwidths: (state) => state.ospf.bandwidths,
      weightsTips: (state) => state.ospf.weightsTips,
    }),
    ...mapGetters({
      getTaskUIText: "langs/getTaskUIText",
      bytesConverter: "ospf/bytesConverter",
    }),

    reset_topology_text() {
      return this.getTaskUIText("reset_topology_text");
    },
    reset_topology_btn() {
      return this.getTaskUIText("reset_topology_btn");
    }
  },
  watch: {
    editWeightDialogVisible(newState) {
      if (!newState && Object.keys(this.network).length !== 0) {
        this.network.unselectAll();
      }
    },
    weightsTips(newWeightsTips) {
      let edgesIds = this.networkData.edges.getIds();
      for (let edgeId of edgesIds) {
        this.networkData.edges.update({
          id: edgeId,
          color: { color: "#1976D2", highlight: "#0D47A1", hover: "#0D47A1" },
          width: 4,
        });
      }
      if (newWeightsTips !== null) {
        for (let weight of newWeightsTips) {
          this.networkData.edges.update({
            id: weight.join(","),
            color: { color: "#e63946", highlight: "#e63946", hover: "#e63946" },
            width: 4,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.ospf-topology__content {
  display: flex;
  flex-direction: column;
}
.ospf__problem {
  align-self: flex-end;
  margin-right: 12px;
  margin-bottom: 12px;
}
.ospf-problem {
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
}
.ospf-problem__text {
  font-size: 12px;
  margin-bottom: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: var(--dark-grey);
}
#ospfNetwork {
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  border-radius: 8px;
  background-color: var(--white);
  max-height: calc(100vh - 56px);
  height: 500px;
  width: 100%;
}
@media (max-width: 992px) {
  .ospf-topology__content {
    width: 540px;
    margin: 0 auto;
  }
}
</style>