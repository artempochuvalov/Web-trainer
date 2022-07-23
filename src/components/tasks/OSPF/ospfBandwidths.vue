<template>
  <div class="ospf-bandwidths">
    <h4 class="ospf-bandwidths__title">Пропускные способности соединений</h4>
    <form @submit.prevent class="ospf-bandwidths__search bandwidths-search">
      <h5 class="bandwidths-search__title">Поиск соединения</h5>
      <fieldset class="bandwidths-search__inputs">
        <input
          class="bandwidths-search__input"
          maxlength="1"
          :placeholder="'от'"
          :value="searchedFrom"
          @input="validateInput($event, 'searchedFrom')"
        />
        <input
          class="bandwidths-search__input"
          maxlength="1"
          :placeholder="'до'"
          :value="searchedTo"
          @input="validateInput($event, 'searchedTo')"
        />
      </fieldset>
    </form>
    <TransitionGroup
      class="ospf-bandwidths__list"
      name="ospf-bandwidths-list"
      tag="ul"
    >
      <p
        class="ospf-bandwidths__list__empty-search"
        v-if="
          !bandwidthsFilteredList.length &&
          searchedFrom !== null &&
          searchedTo !== null
        "
      >
        Нет таких соединений
      </p>
      <li
        class="ospf-bandwidths__item ospf-bandwidth-info"
        v-for="bandwidth in bandwidthsFilteredList"
        :key="bandwidth.index"
      >
        <div class="ospf-bandwidth-info__routers">
          <h5 class="ospf-bandwidth-info__from">Router {{ bandwidth.from }}</h5>
          <img
            class="ospf-bandwidth-info__img"
            src="@/assets/images/exchange.svg"
          />
          <h5 class="ospf-bandwidth-info__to">Router {{ bandwidth.to }}</h5>
        </div>
        <p class="ospf-bandwidth-info__bandwidth">
          проп. способность:
          <span>{{ bytesConverter(bandwidth.bandwidth) }}</span>
        </p>
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ospf-bandwidths",
  data() {
    return {
      searchedFrom: null,
      searchedTo: null,
    };
  },
  methods: {
    validateInput(evt, direction) {
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (evt.target.value >= this.metricsSize) {
        evt.target.value = "";
      }
      if (evt.target.value === "") {
        this[direction] = null;
      } else {
        this[direction] = evt.target.value;
      }
    },
  },

  computed: {
    ...mapGetters({
      bandwidthsWithIndexes: "ospf/bandwidthsWithIndexes",
      bytesConverter: "ospf/bytesConverter",
      metricsSize: "ospf/metricsSize",

      getTextOfTask: "langs/getTextOfTask",
    }),

    bandwidthsFilteredList() {
      if (this.searchedFrom !== null && this.searchedTo !== null) {
        return this.bandwidthsWithIndexes.filter(
          (item) =>
            (item.from == this.searchedFrom && item.to == this.searchedTo) ||
            (item.from == this.searchedTo && item.to == this.searchedFrom)
        );
      } else if (this.searchedFrom !== null) {
        return this.bandwidthsWithIndexes.filter(
          (item) =>
            item.from == this.searchedFrom || item.to == this.searchedFrom
        );
      } else if (this.searchedTo !== null) {
        return this.bandwidthsWithIndexes.filter(
          (item) => item.from == this.searchedTo || item.to == this.searchedTo
        );
      }
      return this.bandwidthsWithIndexes;
    },
  },
};
</script>

<style scoped>
.ospf-bandwidths {
  background-color: var(--white);
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  height: 246px;
  border-radius: 8px;
  padding: 12px;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.ospf-bandwidths:hover {
  box-shadow: none;
}
.ospf-bandwidths__title {
  align-self: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 6px;
}
.ospf-bandwidths__item {
  width: 75%;
  padding: 6px 18px;
  border-radius: 8px;
  background-color: var(--light-grey);
}
.ospf-bandwidths__item:not(:last-of-type) {
  margin-bottom: 6px;
}
.ospf-bandwidths__search {
  align-self: center;
  margin-bottom: 6px;
}
.bandwidths-search__title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: var(--dark-grey);
  align-self: center;
  margin-bottom: 2px;
  text-align: center;
}
.bandwidths-search__inputs {
  display: flex;
}
.bandwidths-search__input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  border: none;
  height: 36px;
  width: 72px;
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
.bandwidths-search__input::placeholder {
  font-family: "Roboto", sans-serif;
  font-weight: 500; 
  font-size: 12px;
  color: var(--grey);
}
.bandwidths-search__input:not(:last-of-type) {
  margin-right: 6px;
}
.ospf-bandwidths__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ospf-bandwidths__list__empty-search {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--dark-grey);
  margin: 36px 0;
}
.ospf-bandwidth-info__routers {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
}
.ospf-bandwidth-info__from,
.ospf-bandwidth-info__to {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--blue);
}
.ospf-bandwidth-info__img {
  width: 36px;
  margin: 0 36px;
}
.ospf-bandwidth-info__bandwidth {
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--dark-grey);
}
.ospf-bandwidth-info__bandwidth span {
  font-family: "Radio Canada";
  color: var(--dark);
}
.ospf-bandwidths::-webkit-scrollbar {
  border-radius: 15px;
  width: 10px;
}
.ospf-bandwidths::-webkit-scrollbar-thumb {
  background-color: var(--grey);
  border-radius: 10px;
  border: 2px solid var(--white);
}
.ospf-bandwidths::-webkit-scrollbar-thumb:hover {
  background-color: var(--dark-grey);
}
.ospf-bandwidths-list-move,
.ospf-bandwidths-list-enter-active,
.ospf-bandwidths-list-leave-active {
  transition: all 0.8s ease;
}
.ospf-bandwidths-list-enter-from,
.ospf-bandwidths-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.ospf-bandwidths-list-leave-active {
  position: absolute;
  z-index: -1;
}
@media (max-width: 576px) {
  .ospf-bandwidths {
    height: 192px;
  }
}
</style>