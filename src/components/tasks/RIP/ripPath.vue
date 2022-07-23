<template>
  <div class="rip-path">
    <div class="rip-path__content">
      <span class="rip-path__router">{{ router }}</span>
      <span
        class="rip-path__add"
        @click="addNode"
        v-if="nodes.length < routersNumber - 1"
      >
        <i class="fa-solid fa-plus" />
      </span>
      <draggable
        tag="ul"
        v-model="nodes"
        item-key="id"
        class="rip-path__list"
        v-show="nodes.length > 0"
      >
        <template #item="{ element }">
          <li class="rip__path-item item-path">
            <input
              type="text"
              class="item-path__input"
              maxlength="1"
              @input="updateNodeNumber(element.id, $event)"
              :value="element.node"
            />
            <span class="item-path__delete" @click="deleteNode(element.id)">
              <i class="fa-solid fa-trash-can fa-xs"></i>
            </span>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";

export default {
  components: { draggable },
  name: "rip-path",
  props: {
    router: {
      type: Number,
      default: 0,
    },
    routersNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      nodes: [],
    };
  },
  methods: {
    ...mapMutations({
      setRoute: "rip/setRoute",
    }),

    addNode() {
      this.nodes.push({
        node: null,
        id: Date.now(),
      });
    },
    deleteNode(id) {
      this.nodes.splice(
        this.nodes.findIndex((item) => item.id === id),
        1
      );
    },
    updateNodeNumber(id, evt) {
      const selectedElement = this.nodes.find((item) => item.id === id);
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (
        this.nodes.some((item) => item.node === evt.target.value) ||
        evt.target.value == this.router ||
        evt.target.value >= this.routesNumber
      ) {
        evt.target.value = "";
      }
      selectedElement.node = evt.target.value;
    },
  },
  watch: {
    nodes: {
      handler(newNodes) {
        this.setRoute(newNodes);
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.rip-path__content {
  align-items: center;
  column-gap: 5px;
  display: flex;
}
.rip-path__router {
  align-items: center;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 7px 0 rgb(0 0 0 / 70%), 3px 27px 54px -34px rgb(0 0 0 / 47%);
  color: var(--dark);
  display: flex;
  font-family: "Radio Canada", serif;
  color: var(--dark);
  font-size: 14px;
  height: 36px;
  width: 36px;
  justify-content: center;
}
.rip-path__add {
  color: var(--grey);
  cursor: pointer;
  padding: 6px;
}
.rip-path__add:hover {
  color: var(--dark-grey);
}
.rip-path__list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.rip__path-item {
  position: relative;
}
.item-path__input::-webkit-outer-spin-button,
.item-path__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.item-path__input[type="number"] {
  -moz-appearance: textfield;
}
.item-path__input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  border: none;
  height: 36px;
  width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  font-family: "Radio Canada";
  background-color: var(--white);
  border: 2px solid var(--grey);
  color: var(--dark);
}
.item-path__delete {
  color: var(--grey);
  cursor: pointer;
  position: absolute;
  right: -4px;
  top: -4px;
}
.item-path__delete:hover {
  color: var(--dark-grey);
}
</style>