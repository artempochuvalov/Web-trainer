<template>
  <form class="fill-warn-dialog" @submit.prevent="hideDialog" >
    <h4 class="fill-warn-dialog__title">В решении есть незаполненные поля</h4>
    <Button class="fill-warn-dialog__btn" @click.stop>Подвердить</Button>
  </form>
</template>

<script>
import Button from "../layout/Button.vue";

export default {
  components: { Button },
  name: "fill-warn-dialog",
  methods: {
    hideDialog() {
      this.$emit("hideFillWarnDialog");
    },
  },
};
</script>

<style scoped>
.fill-warn-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.fill-warn-dialog__title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 24px;
  color: var(--dark-red);
}
</style>