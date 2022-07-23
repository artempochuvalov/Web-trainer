<template>
  <div class="ospf-path">
    <div class="ospf-path__content">
      <span class="ospf-path__from">{{ from }}</span>
      <span
        class="ospf-path__add"
        @click="addNode"
        v-if="paths.length < routesNumber - 2"
      >
        <i class="fa-solid fa-plus" />
      </span>
      <draggable
        tag="ul"
        v-model="paths"
        item-key="id"
        class="ospf-path__list"
        v-show="paths.length > 0"
      >
        <template #item="{ element }">
          <li class="ospf__path-item item-path">
            <input
              type="text"
              class="item-path__input"
              maxlength="1"
              @input="updateNodeNumber(element.id, $event)"
              :value="element.node"
            />
            <span class="item-path__delete" @click="deletePath(element.id)">
              <i class="fa-solid fa-trash-can fa-xs"></i>
            </span>
          </li>
        </template>
      </draggable>
      <span class="ospf-path__to">{{ to }}</span>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  name: "ospf-path",
  props: {
    work: {
      type: String,
      required: true,
    },
    from: {
      type: Number,
      default: 0,
    },
    to: {
      type: Number,
      default: 0,
    },
    routesNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      paths: [],
    };
  },
  methods: {
    setRoute(paths) {
      this.$store.commit(`${this.work}/setRoute`, paths);
    },
    addNode() {
      this.paths.push({
        node: null,
        id: Date.now(),
      });
    },
    deletePath(id) {
      this.paths.splice(
        this.paths.findIndex((item) => item.id === id),
        1
      );
    },
    updateNodeNumber(id, evt) {
      const selectedElement = this.paths.find((item) => item.id === id);
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (
        this.paths.some((path) => path.node === evt.target.value) ||
        evt.target.value == this.from ||
        evt.target.value == this.to ||
        evt.target.value >= this.routesNumber
      ) {
        evt.target.value = "";
      }
      selectedElement.node = evt.target.value;
    },
  },
  watch: {
    paths: {
      handler() {
        this.setRoute(this.paths);
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.ospf-path__content {
  display: flex;
  align-items: center;
  column-gap: 6px;
}
.ospf-path__from,
.ospf-path__to {
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
  justify-content: center;
  width: 36px;
}
.ospf-path__add {
  color: var(--grey);
  cursor: pointer;
  padding: 6px;
}
.ospf-path__add:hover {
  color: var(--dark-grey);
}
.ospf-path__list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.ospf__path-item {
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