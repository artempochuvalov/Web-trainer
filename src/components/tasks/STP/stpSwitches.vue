<template>
  <div
    class="stp-switches"
  >
    <h4 class="stp-switches__title">
      {{ switches_search_label }}
    </h4>
    <form @submit.prevent class="stp-switches__search switches-search">
      <label class="switches-search__label" for="switches-search-input">
        {{ switch_search }}
      </label>
      <stp-switch-input
        class="switches-search__input"
        v-model:device="searchedSwitch"
        id="switches-search-input"
      />
    </form>
    <TransitionGroup
      class="stp-switches__list"
      name="stp-switches-list"
      tag="ul"
    >
      <p
        class="stp-switches-list__empty-search"
        v-if="!switchesFilteredList.length && searchedSwitch !== null"
      >
        {{ switch_search_fail }}
      </p>
      <li
        class="stp-switches__item stp-switch-info"
        v-for="{ mac, priority, index } in switchesFilteredList"
        :key="index"
      >
        <h5 class="stp-switch-info__number">Switch {{ index }}</h5>
        <p class="stp-switch-info__priority">
          priority: <span>{{ priority }}</span>
        </p>
        <p class="stp-switch-info__mac">
          mac: <span>{{ mac }}</span>
        </p>
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import stpSwitchInput from "./stpSwitchInput.vue";
export default {
  components: { stpSwitchInput },
  name: "stp-switches",
  data() {
    return {
      searchedSwitch: null,
    };
  },
  methods: {
    validateInput(evt) {
      evt.target.value = evt.target.value.replace(/[^\d]/g, "");
      if (evt.target.value >= this.connectionsSize) {
        evt.target.value = "";
      }

      if (evt.target.value === "") {
        this.searchedSwitch = null;
      } else {
        this.searchedSwitch = evt.target.value;
      }
    },
  },
  computed: {
    ...mapGetters({
      switchesWithIndexes: "stp/switchesWithIndexes",
      getTextOfTask: "langs/getTextOfTask",
    }),

    switchesFilteredList() {
      if (this.searchedSwitch !== null) {
        return this.switchesWithIndexes.filter(
          (item) => item.index == this.searchedSwitch
        );
      } else {
        return this.switchesWithIndexes;
      }
    },

    switches_search_label() {
      return this.getTextOfTask("stp", "switches_search_label");
    },
    switch_search() {
      return this.getTextOfTask("stp", "switch_search");
    },
    switch_search_fail() {
      return this.getTextOfTask("stp", "switch_search_fail");
    }
  },
};
</script>

<style scoped>
.stp-switches {
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
.stp-switches:hover {
  box-shadow: none;
}
.stp-switches__title {
  align-self: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 2px;
}
.stp-switches__search {
  align-self: center;
  margin-bottom: 6px;
}
.switches-search__label {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: var(--dark-grey);
  margin-right: 12px;
}
.stp-switches__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stp-switches__item {
  width: 75%;
  padding: 6px 18px;
  border-radius: 8px;
  background-color: var(--light-grey);
}
.stp-switches-list__empty-search {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: var(--dark-grey);
  margin-right: 12px;
}
.stp-switches__item:not(:last-of-type) {
  margin-bottom: 6px;
}
.stp-switch-info__number {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: var(--blue);
  margin-bottom: 4px;
}
.stp-switch-info__priority,
.stp-switch-info__mac {
  font-family: "Roboto", sans-serif;
  color: var(--dark-grey);
  font-size: 15px;
  padding-left: 6px;
}
.stp-switch-info__priority span,
.stp-switch-info__mac span {
  font-family: "Radio Canada", sans-serif;
  color: var(--dark);
}
.stp-switch-info__priority {
  margin-bottom: 2px;
}
.stp-switches::-webkit-scrollbar {
  border-radius: 15px;
  width: 10px;
}
.stp-switches::-webkit-scrollbar-thumb {
  background-color: var(--grey);
  border-radius: 10px;
  border: 2px solid var(--white);
}
.stp-switches::-webkit-scrollbar-thumb:hover {
  background-color: var(--dark-grey);
}
.switches-search {
  display: flex;
  align-items: center;
}
.stp-switches-list-move,
.stp-switches-list-enter-active,
.stp-switches-list-leave-active {
  transition: all 0.5s ease;
}
.stp-switches-list-enter-from,
.stp-switches-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.stp-switches-list-leave-active {
  position: absolute;
  z-index: -1;
}
@media (max-width: 768px) {
  .stp-switches {
    height: 192px;
  }
}
</style>