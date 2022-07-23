<template>
  <div class="langs-dropdown" @click="closed = !closed">
    <div
      class="langs-dropdown__preview"
      :style="{
        'background-color': !closed
          ? 'rgba(var(--light-blue-rgb), 0.1)'
          : 'var(--white)',
      }"
    >
      <span>
        {{ currentLang }}
      </span>
      <span
        class="langs-dropdown__icon"
        :class="{ 'langs-dropdown__icon_rotated ': !closed }"
      >
        <i class="fas fa-caret-down" />
      </span>
    </div>
    <ul class="langs-dropdown__list langs-list" v-if="!closed">
      <li
        class="langs-list__lang"
        v-for="lang in sortedLangs"
        @click="setLang(lang.name)"
        :key="lang.name"
      >
        <span>{{ lang.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "langs-drop-down",
  data() {
    return {
      closed: true,
    };
  },
  methods: {
    ...mapMutations({
      setLang: "langs/setLang",
    }),
  },
  computed: {
    ...mapState({
      currentLang: (state) => state.langs.currentLang,
    }),
    ...mapGetters({
      sortedLangs: "langs/sortedLangs",
    }),
  },
};
</script>

<style>
.langs-dropdown {
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  cursor: pointer;
}
.langs-dropdown__preview {
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 500;
  padding: 8px 12px;
}
.langs-dropdown__preview:hover {
  border: 1px solid var(--grey);
}
.langs-list__lang,
.langs-dropdown__preview {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  letter-spacing: 0.03em;
  color: var(--dark-grey);
  text-transform: uppercase;
}
.langs-dropdown__list {
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  position: absolute;
  top: calc(100% + 18px);
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
.langs-list {
  background-color: var(--white);
  padding: 6px;
  border-radius: 4px;
}
.langs-list__lang {
  text-align: center;
  padding: 8px 24px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.langs-list__lang:hover {
  background-color: rgba(var(--light-blue-rgb), 0.15);
  border: 1px solid rgba(var(--light-blue-rgb), 0.3);
}
.langs-list__lang:first-child {
  background-color: var(--blue);
  color: var(--white);
}
.langs-list__lang:not(:last-child) {
  margin-bottom: 6px;
}
.langs-dropdown__icon {
  display: inline-block;
  margin-left: 12px;
  transform: rotate(0);
  transition: 0.2s transform linear;
}
.langs-dropdown__icon_rotated {
  transform: rotate(180deg);
  transition: 0.2s transform linear;
}
</style>