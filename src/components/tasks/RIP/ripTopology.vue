<template>
  <div class="rip-topology">
    <div class="rip-topology__content">
      <div class="rip__problem rip-problem">
        <span class="rip-problem__text"> {{ reset_topology_text }}</span>
        <Button @click="redraw">{{ reset_topology_btn }}</Button>
      </div>
      <div class="rip-topology__topology">
        <div ref="ripNetwork" id="ripNetwork"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import Button from "../../layout/Button.vue";

export default {
  components: { Button },
  name: "rip-topology",
  data() {
    return {
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
          shape: "dot",
          size: 20,
        },
        edges: {
          smooth: { type: "curvedCW", roundness: 0 },
          width: 4,
          color: { color: "#1976D2", highlight: "#0D47A1", hover: "#0D47A1" },
        },
        groups: {
          routers: {
            shape: "image",
            image: require("@/assets/icons/router.png"),
          },
          subnets: {
            shape: "image",
            image: require("@/assets/icons/cloud.png"),
            size: 32,
          },
        },
        layout: {
          randomSeed: 1,
        },
        interaction: {
          dragView: false,
          zoomView: true,
          selectConnectedEdges: false,
          hover: false,
          hoverConnectedEdges: false,
        },
      },
    };
  },
  methods: {
    ...mapMutations({
      setLoading: "rip/setLoading",
      setLoadFail: "rip/setLoadFail",
    }),
    ...mapActions({
      fetchTask: "rip/fetchTask",
      cleaner: "rip/cleaner",
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
            this.$refs.ripNetwork,
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
          id: `rt${i}`,
          label: `Router ${i}`,
          group: "routers",
        });
      }

      for (let i = 0; i < this.connections[0].length; ++i) {
        this.networkData.nodes.add({
          id: `st${i}`,
          label: `Subnet ${i}`,
          group: "subnets",
        });
      }
    },
    setEdges() {
      for (let i = 0; i < this.connections.length; ++i) {
        for (let j = 0; j < this.connections[0].length; ++j) {
          if (this.connections[i][j] !== 0) {
            this.networkData.edges.add({
              from: `rt${i}`,
              to: `st${j}`,
              id: `rt${i},st${j}`,
            });
          }
        }
      }
    },
    setEvents() {
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

    redraw() {
      this.network.destroy();
      this.options.layout.randomSeed += Math.floor(Math.random() * 1000);
      this.network = new vis.Network(
        this.$refs.ripNetwork,
        this.networkData,
        this.options
      );

      this.setEvents();
    },
  },
  computed: {
    ...mapState({
      connections: (state) => state.rip.connections,
    }),
    ...mapGetters({
      getTaskUIText: "langs/getTaskUIText",
    }),
    reset_topology_text() {
      return this.getTaskUIText("reset_topology_text");
    },
    reset_topology_btn() {
      return this.getTaskUIText("reset_topology_btn");
    },
  },
  mounted() {
    this.setTask();
  },
};
</script>

<style scoped>
.rip-topology__content {
  display: flex;
  flex-direction: column;
}
.rip__problem {
  align-self: flex-end;
  margin-right: 12px;
  margin-bottom: 12px;
}
.rip-problem {
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
}
.rip-problem__text {
  font-size: 12px;
  margin-bottom: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: var(--dark-grey);
}
#ripNetwork {
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  border-radius: 8px;
  background-color: var(--white);
  max-height: calc(100vh - 56px);
  height: 500px;
  width: 100%;
}
@media (max-width: 992px) {
  .rip-topology__content {
    width: 540px;
    margin: 0 auto;
  }
}
</style>