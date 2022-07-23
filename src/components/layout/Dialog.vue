<template>
  <div class="dialog" v-if="show === true" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <div class="dialog__close close" @click="hideDialog"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    shouldBeRotated: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
    preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault) e.preventDefault();
      e.returnValue = false;
    },
    disableScroll() {
      window.addEventListener("DOMMouseScroll", this.preventDefault, false);
      document.addEventListener("wheel", this.preventDefault, {
        passive: false,
      });
      document.addEventListener("scroll", this.preventDefault, {
        passive: false,
      });
    },
    enableScroll() {
      window.removeEventListener("DOMMouseScroll", this.preventDefault, false);
      document.removeEventListener("wheel", this.preventDefault, {
        passive: false,
      });
      document.removeEventListener("scroll", this.preventDefault, {
        passive: false,
      });
    },
  },
  watch: {
    shouldBeRotated() {
      if (this.shouldBeRotated) {
        this.hideDialog();
      }
    },
    show() {
      if (this.show === true) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },
  },
  unmounted() {
    this.enableScroll();
  },
};
</script>

<style scoped>
.dialog {
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  display: flex;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
}
.dialog__content {
  background: var(--white);
  border-radius: 8px;
  display: flex;
  flex-flow: column nowrap;
  margin: auto;
  min-height: 50px;
  min-width: 375px;
  padding: 15px;
  z-index: 1001;
}
.dialog__close {
  align-self: flex-end;
}
.close {
  cursor: pointer;
  height: 20px;
  margin-bottom: 10px;
  position: relative;
  width: 20px;
}
.close::before,
.close::after {
  background-color: var(--grey);
  content: "";
  height: 2px;
  left: 0;
  position: absolute;
  top: 50%;
  transition: 0.3s background-color ease-out;
  width: 100%;
}
.close::before {
  transform: rotate(45deg);
}
.close::after {
  transform: rotate(-45deg);
}
.close:hover::after,
.close:hover::before {
  background-color: var(--dark);
}
@media (max-width: 467.98px) {
  .dialog__content {
    max-width: 290px;
    min-width: 0;
  }
}
</style>