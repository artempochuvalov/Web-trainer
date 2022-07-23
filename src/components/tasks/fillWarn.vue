<template>
<transition name="fill-warn">
  <div class="fill-warn" v-if="condition">
    <h4 class="fill-warn__title">Незаполненные поля:</h4>
    <div class="fill-warn__content">
      <slot></slot>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: "fill-warn",
  props: {
    condition: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.fill-warn {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  background-color: rgba(var(--red-rgb), 0.8);
  border-radius: 8px;
  padding: 12px 18px;
}
.fill-warn__title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--white);
  text-transform: uppercase;
  margin-right: 12px;
}
.fill-warn__content {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--white);
  flex: 1 1 auto;
}
.fill-warn-enter-active,
.fill-warn-leave-active {
  transition: opacity 0.5s ease;
}
.fill-warn-enter-from,
.fill-warn-leave-to {
  opacity: 0;
}
</style>