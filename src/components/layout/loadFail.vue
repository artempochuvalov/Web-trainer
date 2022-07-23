<template>
  <div class="load-fail">
    <p class="load-fail__text">{{ network_error_text }}</p>
    <Button class="load-fail__reload-btn btn_xl" @click="reload">
      <i class="fa-solid fa-arrows-rotate"></i>
      <span>{{ network_error_btn }}</span>
    </Button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Button from "./Button.vue";

export default {
  components: { Button },
  name: "load-fail",
  methods: {
    reload() {
      this.$router.go();
    },
  },
  computed: {
    ...mapGetters({
      getSystemText: "langs/getSystemText",
    }),
    network_error_btn() {
      return this.getSystemText('network_error_btn');
    },
    network_error_text() {
      return this.getSystemText('network_error_text');
    }
  }
};
</script>

<style scoped>
.load-fail {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.load-fail__text {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--grey-grey);
  margin-bottom: 2px;
}
.load-fail__reload-btn {
  display: flex;
  align-items: center;
}
.load-fail__reload-btn span {
  margin-left: 6px;
}
</style>