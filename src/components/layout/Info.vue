<template>
  <div class="info">
    <span
      class="info__icon"
      @mouseover="handleHover(true)"
      @mouseout="handleHover(false)"
      @click="togglePopUp"
    >
      <i class="fa-solid fa-circle-info"></i>
    </span>
    <div class="info__popup-text" v-if="showPopUp">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      showPopUp: false,
    };
  },
  methods: {
    handleHover(bool) {
      if (window.innerWidth > 1024) {
        this.showPopUp = bool;
      }
    },
    togglePopUp() {
      if (window.innerWidth <= 1024) {
        this.showPopUp = !this.showPopUp;
      }
    },
  },
};
</script>

<style scoped>
.info {
  position: relative;
}
.info__icon {
  text-align: center;
  color: var(--blue);
  font-size: 22px;
  display: inline-block;
  position: relative;
  z-index: 10;
}
.info__popup-text {
  background-color: var(--white);
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  color: var(--dark);
  font-family: "Roboto", sans-serif;
  font-size: 13.5px;
  width: 275px;
  padding: 0.75em;
  border-radius: 8px;
  position: absolute;
  top: 0;
  transform: translate(calc(-100% + 39px), calc(-100% - 11px));
}
.info__popup-text::after {
  content: "";
  border: 10px solid transparent;
  border-top: 10px solid var(--white);
  position: absolute;
  bottom: -19px;
  right: 18px;
}
</style>