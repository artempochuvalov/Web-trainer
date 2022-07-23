<template>
  <router-link :to="to" class="link">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "Link",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.link {
  display: inline-block;
  color: var(--dark-blue);
  text-decoration: none;
  font-family: "Roboto";
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  padding: 5px;
  border-radius: 6px;
}
.link:hover {
  background-color: rgba(var(--light-blue-rgb), 0.2);
}
</style>