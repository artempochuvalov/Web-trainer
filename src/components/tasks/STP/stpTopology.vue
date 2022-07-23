<template>
  <div class="stp-topology">
    <div class="stp-topology__dialogs">
      <Dialog
        v-model:show="deleteLinkDialogVisible"
        :shouldBeRotated="shouldBeRotated"
      >
        <stp-delete-link @deleteLink="deleteLink" />
      </Dialog>
      <Dialog
        v-model:show="restoreLinkDialogVisible"
        :shouldBeRotated="shouldBeRotated"
      >
        <stp-restore-link @restoreLink="restoreLink" />
      </Dialog>
    </div>
    <div class="stp-topology__content">
      <div class="stp__problem stp-problem">
        <span class="stp-problem__text"> {{ reset_topology_text }}</span>
        <Button @click="redraw">{{ reset_topology_btn }}</Button>
      </div>
      <div class="stp-topology__topology">
        <div ref="stpNetwork" id="stpNetwork"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import Button from "../../layout/Button.vue";
import Dialog from "../../layout/Dialog.vue";
import StpDeleteLink from "./stpDeleteLink.vue";
import StpRestoreLink from "./stpRestoreLink.vue";

export default {
  components: {
    Button,
    Dialog,
    StpDeleteLink,
    StpRestoreLink,
  },
  name: "stp-topology",
  data() {
    return {
      deleteLinkDialogVisible: false,
      restoreLinkDialogVisible: false,

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
          image: require("@/assets/icons/switch.png"),
          size: 20,
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
      setLoading: "stp/setLoading",
      setLoadFail: "stp/setLoadFail",

      addDeletedLink: "stp/addDeletedLink",
      restoreDeletedLink: "stp/restoreDeletedLink",
    }),
    ...mapActions({
      fetchTask: "stp/fetchTask",
      cleaner: "stp/cleaner",
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
            this.$refs.stpNetwork,
            this.networkData,
            this.options
          );

          this.setEvents();
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              this.cleaner();
              this.logout();
            } else {
              this.cleaner();
              this.setLoadFail(true);
            }
          } else {
            console.log(err);
          }
        } finally {
          this.setLoading(false);
        }
      }, 2000);
    },
    setNodes() {
      for (let i = 0; i < this.connections.length; ++i) {
        this.networkData.nodes.add({
          id: i,
          label: `Switch ${i}`,
          title: `priority: ${this.switches[i].priority} </br>
                    mac: ${this.switches[i].mac}`,
        });
      }
    },
    setEdges() {
      for (let i = 0; i < this.connections.length; ++i) {
        for (let j = i; j < this.connections.length; ++j) {
          if (this.connections[i][j] !== 0) {
            this.networkData.edges.add({
              from: i,
              to: j,
              id: `${i},${j}`,
            });
          }
        }
      }
    },
    setEvents() {
      this.network.on("selectEdge", this.showOneLinkDialog);
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

    showOneLinkDialog() {
      const selectedLink = this.network.getSelectedEdges()[0];

      if (this.deletedLinks.has(selectedLink)) {
        this.restoreLinkDialogVisible = true;
      } else {
        this.deleteLinkDialogVisible = true;
      }
    },
    deleteLink(bool) {
      if (bool === true) {
        const linkToDelete = this.network.getSelectedEdges()[0];

        this.networkData.edges.update({
          id: linkToDelete,
          color: { color: "#ADB5BD", highlight: "#ADB5BD", hover: "#ADB5BD" },
          dashes: true,
        });

        this.addDeletedLink(linkToDelete);
      }

      this.deleteLinkDialogVisible = false;
    },
    restoreLink(bool) {
      if (bool === true) {
        const linkToRestore = this.network.getSelectedEdges()[0];

        this.networkData.edges.update({
          id: linkToRestore,
          color: { color: "#1976D2", highlight: "#0D47A1", hover: "#0D47A1" },
          dashes: false,
        });

        this.restoreDeletedLink(linkToRestore);
      }

      this.restoreLinkDialogVisible = false;
    },

    redraw() {
      this.network.destroy();
      this.options.layout.randomSeed += Math.floor(Math.random() * 1000);
      this.network = new vis.Network(
        this.$refs.stpNetwork,
        this.networkData,
        this.options
      );

      this.setEvents();
    },
  },
  computed: {
    ...mapState({
      connections: (state) => state.stp.connections,
      switches: (state) => state.stp.switches,
      deletedLinks: (state) => state.stp.deletedLinks,
      shouldBeRotated: (state) => state.stp.shouldBeRotated,
    }),
    ...mapGetters({
      preparedConnections: "stp/preparedConnections",
      getTaskUIText: "langs/getTaskUIText",
    }),
    reset_topology_text() {
      return this.getTaskUIText("reset_topology_text");
    },
    reset_topology_btn() {
      return this.getTaskUIText("reset_topology_btn");
    },
  },
  watch: {
    deleteLinkDialogVisible(newValue) {
      if (!newValue && Object.keys(this.network).length !== 0) {
        this.network.unselectAll();
      }
    },
    restoreLinkDialogVisible(newValue) {
      if (!newValue && Object.keys(this.network).length !== 0) {
        this.network.unselectAll();
      }
    },
  },
  mounted() {
    this.setTask();
  },
};
</script>

<style scoped>
.stp-topology__content {
  display: flex;
  flex-direction: column;
}
.stp__problem {
  align-self: flex-end;
  margin-right: 12px;
  margin-bottom: 12px;
}
.stp-problem {
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
}
.stp-problem__text {
  font-size: 12px;
  margin-bottom: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: var(--dark-grey);
}
#stpNetwork {
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  border-radius: 8px;
  background-color: var(--white);
  max-height: calc(100vh - 56px);
  height: 500px;
  width: 100%;
}
@media (max-width: 992px) {
  .stp-topology__content {
    width: 540px;
    margin: 0 auto;
  }
}
</style>