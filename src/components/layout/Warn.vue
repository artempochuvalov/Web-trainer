<template>
  <div class="warn">
    <span class="warn__icon">
      <i class="fa-solid fa-triangle-exclamation" />
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Warn",
};
</script>

<style scoped>
.warn {
  display: flex;
  align-items: flex-end;
}
.warn__icon {
  color: var(--yellow);
  margin-right: 4px;
  font-size: 21px;
}
</style>