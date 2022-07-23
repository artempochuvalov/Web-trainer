<template>
  <table class="rip-table">
    <thead class="rip-table__head">
      <th class="rip-table__header">{{ subnet_text }}</th>
      <th class="rip-table__header">{{ router_text }}</th>
      <th class="rip-table__header">{{ distance_text }}</th>
    </thead>
    <draggable
      tag="tbody"
      v-model="table"
      item-key="id"
      class="rip-table__body"
    >
      <template #item="{ element }">
        <tr
          class="rip-table__row"
          :class="{ 'rip-table__row_incorrect': isIncorrectRow(element) }"
        >
          <td class="rip-table__data">
            <input
              type="text"
              class="rip-table__input"
              maxlength="1"
              @input="updateSubnet(element.id, $event)"
              :value="element.subnet"
            />
          </td>
          <td class="rip-table__data">
            <input
              type="text"
              class="rip-table__input"
              maxlength="1"
              @input="updateRouter(element.id, $event)"
              :value="element.router"
            />
          </td>
          <td class="rip-table__data">
            <input
              type="text"
              class="rip-table__input"
              maxlength="2"
              @input="updateDistance(element.id, $event)"
              :value="element.distance"
            />
          </td>
          <span class="rip-table__delete" @click="deleteRow(element.id)">
            <i class="fa-solid fa-trash-can fa-xs"></i>
          </span>
        </tr>
      </template>
    </draggable>
    <tfoot class="rip-table__footer">
      <td class="rip-table__data">
        <span @click="addRow" class="rip-table__add-row">{{ add_row_text }}</span>
      </td>
    </tfoot>
  </table>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  components: { draggable },
  name: "rip-table",
  data() {
    return {
      table: [],
    };
  },
  props: {
    routersNumber: {
      type: Number,
      default: 0,
    },
    subnetsNumber: {
      type: Number,
      default: 0,
    },
    incorrectVectors: {
      type: Array,
      default: [],
    },
  },
  methods: {
    ...mapMutations({
      setTable: "rip/setTable",
    }),

    updateSubnet(id, evt) {
      const selectedElement = this.table.find((item) => item.id === id);
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (evt.target.value >= this.subnetsNumber) {
        evt.target.value = "";
      }
      selectedElement.subnet = evt.target.value;
    },
    updateRouter(id, evt) {
      const selectedElement = this.table.find((item) => item.id === id);
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (evt.target.value >= this.routersNumber) {
        evt.target.value = "";
      }
      selectedElement.router = evt.target.value;
    },
    updateDistance(id, evt) {
      const selectedElement = this.table.find((item) => item.id === id);
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      selectedElement.distance = evt.target.value;
    },

    addRow() {
      this.table.push({
        id: Date.now(),
        subnet: null,
        router: null,
        distance: null,
      });
    },
    deleteRow(id) {
      this.table.splice(
        this.table.findIndex((item) => item.id === id),
        1
      );
    },

    isIncorrectRow(row) {
      return this.incorrectVectors.some(
        (item) =>
          item.distance == row.distance &&
          item.router == row.router &&
          item.subnet == row.subnet &&
          !Object.values(row).some((item) => item === "" || item === null)
      );
    },
  },
  computed: {
    ...mapGetters({
        getTextOfTask: "langs/getTextOfTask",
    }),

    subnet_text() {
      return this.getTextOfTask("rip", "subnet_text");
    },
    router_text() {
      return this.getTextOfTask("rip", "router_text");
    },
    distance_text() {
      return this.getTextOfTask("rip", "distance_text");
    },
    add_row_text() {
      return this.getTextOfTask("rip", "add_row_text");
    }
  },
  watch: {
    table: {
      handler(newTable) {
        this.setTable(newTable);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.rip-table {
  display: flex;
  flex-direction: column;
  max-width: 576px;
  padding: 6px;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
}
.rip-table__body {
  display: flex;
  flex-direction: column;
}
.rip-table__row,
.rip-table__footer,
.rip-table__head {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.rip-table__head {
  margin-bottom: 4px;
}
.rip-table__data {
  padding: 12px 18px;
}
.rip-table__row {
  position: relative;
  border: 2px dashed transparent;
  transition: 0.3s ease border-color;
}
.rip-table__row_incorrect {
  border-color: var(--red);
}
.rip-table__row:not(:last-of-type) {
  margin-bottom: 4px;
}
.rip-table__row:nth-of-type(even) {
  background-color: var(--light-grey);
}
.rip-table__data,
.rip-table__header {
  flex: 1 1 33.33%;
  text-align: center;
}
.rip-table__header {
  color: var(--white);
  padding: 12px;
  font-family: "Montserrat", sans-serif;
  background-color: var(--blue);
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 15px;
}
.rip-table__input {
  width: 100%;
  border-radius: 4px;
  border: none;
  background-color: var(--grey);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 14px;
  padding: 6px 12px;
  text-align: center;
  font-family: "Radio Canada";
  color: var(--dark);
}
.rip-table__input:focus {
  box-shadow: 0 2px 7px 0 var(--dark-grey), 3px 27px 54px -34px var(--dark-grey);
}
.rip-table__add-row {
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--grey);
  transition: 0.2s color ease;
}
.rip-table__add-row:hover {
  color: var(--dark-grey);
}
.rip-table__delete {
  color: var(--grey);
  cursor: pointer;
  position: absolute;
  right: 3.5px;
  top: 50%;
  transform: translateY(-50%);
}
.rip-table__delete:hover {
  color: var(--dark-grey);
}
@media (max-width: 576px) {
  .rip-table__header {
    font-size: 15px;
  }
  .rip-table__data {
    padding: 18px 6px;
  }
  .rip-table__delete {
    top: 2px;
    transform: translateY(0);
  }
}
</style>