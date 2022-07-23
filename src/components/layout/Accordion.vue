<template>
  <div class="accordion" @click="toggleOpen">
    <div class="accordion__header">
      <h3 class="accordion__title">
        <span>{{ index + 1 }}</span>
        <slot name="header"></slot>
      </h3>
      <span
        class="accordion__icon"
        :class="{ 'accordion__icon_rotated ': open }"
      >
        <i class="fas fa-caret-down" />
      </span>
    </div>
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div class="accordion__content" @click.stop v-show="open">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  props: {
    index: {
      type: Number,
      required: true,
      default: "N/A",
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    enter(el) {
      el.style.height = "auto";
      const height = getComputedStyle(el).height;
      el.style.height = 0;
      getComputedStyle(el);
      setTimeout(() => {
        el.style.height = height;
      });
    },
    afterEnter(el) {
      el.style.height = "auto";
    },
    leave(el) {
      el.style.height = getComputedStyle(el).height;
      getComputedStyle(el);
      setTimeout(() => {
        el.style.height = 0;
      });
    },
  },
};
</script>

<style scoped>
.accordion {
  cursor: pointer;
  background-color: var(--white);
  width: 100%;
  padding: 12px;
  padding-bottom: 0;
  border-radius: 8px;
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  transition: 0.3s box-shadow;
}
@media (min-width: 992px) {
  .accordion:hover {
    box-shadow: none;
  }
}
.accordion__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
}
.accordion__title {
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.08em;
  color: var(--dark-grey);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}
.accordion__title span {
  font-family: "Radio Canada";
  font-size: 18px;
  color: var(--light-grey);
  background-color: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 12px;
  margin-right: 12px;
}
.accordion__icon {
  color: var(--dark-grey);
  transform: rotate(0);
  display: inline-block;
  margin-right: 12px;
  transform: rotate(0);
  transition: 0.2s transform linear;
}
.accordion__icon_rotated {
  transform: rotate(180deg);
  transition: 0.2s transform linear;
}
.accordion__content {
  padding: 0 12px 0;
  cursor: default;
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}
@media (max-width: 756px) {
  .accordion__title {
    font-size: 16px;
  }
  .accordion__title span {
    font-size: 16px;
    width: 36px;
    height: 36px;
  }
  .accordion {
    border-radius: 0;
    padding: 6px;
  }
  .accordion__header {
    padding-bottom: 6px;
  }
}
</style>