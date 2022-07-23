<template>
  <div class="load" v-if="show" ref="load">
    <img class="load__img" src="@/assets/icons/load.svg" alt="Загрузка..." />
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
  name: "Load",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clientView: {
        clientX: 0,
        clientY: 0,
      },
    };
  },
  methods: {
    async scrollToLoad() {
      document.body.style.overflow = "hidden";
      await nextTick();
      if (this.$refs.load) {
        this.$refs.load.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    },
  },
  watch: {
    show() {
      if (this.show) {
        this.scrollToLoad();
      } else {
        window.scrollTo(this.clientView.clientX, this.clientView.clientY);
        document.body.style.overflow = "auto";
      }
    },
  },
  unmounted() {
    document.body.style.overflow = "auto";
  },
};
</script>

<style scoped>
.load {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.load__img {
  display: block;
  height: auto;
  width: 176px;
}
@media (max-width: 756px) {
  .load__img {
    width: 146px;
  }
}
</style>