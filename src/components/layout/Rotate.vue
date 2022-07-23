<template>
  <div v-if="show" class="rotate">
    <div class="rotate__content" ref="rotate">
      <img
        class="rotate__img"
        src="@/assets/images/rotate.svg"
        alt="Поверните устройство"
      />
      <h3 class="rotate__title">{{ rotate_title }}</h3>
      <p class="rotate__text">
        {{ rotate_subtitle }}
      </p>
    </div>
  </div>
</template>
<script>
import { nextTick } from "vue";
import {mapGetters} from 'vuex';

export default {
  name: "Rotate",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    loading: {
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
    async scrollToRotate() {
      await nextTick();
      if (this.$refs.rotate) {
        this.$refs.rotate.scrollIntoView({ block: "center" });
      }
      document.body.style.overflow = "hidden";
    },
  },
  computed: {
    ...mapGetters({
      getTaskUIText: "langs/getTaskUIText",
    }),

    rotate_title() {
      return this.getTaskUIText('rotate_title');
    },
    rotate_subtitle() {
      return this.getTaskUIText('rotate_subtitle');
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.scrollToRotate();
      } else {
        window.scrollTo(this.clientView.clientX, this.clientView.clientY);
        document.body.style.overflow = "auto";
      }
    },
    loading() {
      if (this.loading) {
        document.body.style.overflow = "hidden";
      }
    },
  },
  unmounted() {
    document.body.style.overflow = "auto";
  },
};
</script>
<style scoped>
.rotate {
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.rotate__content {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 6vh 0 0;
  text-align: center;
}
.rotate__img {
  margin-bottom: 18px;
  width: 40vw;
}
.rotate__title {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}
.rotate__text {
  color: var(--dark-grey);
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  max-width: 312px;
}
</style>