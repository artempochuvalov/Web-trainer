<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
};
</script>

<style scoped>
.btn {
  background-color: var(--light-blue);
  border-radius: 0.5em;
  border: none;
  color: var(--light-grey);
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 15.5px;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding: 0.15em 1.2em;
  transition: background-color 0.3s ease-in, color 0.3s ease-in;
}
.btn:hover {
  background-color: var(--blue);
}
.btn_l {
  padding: 0.3em 1.2em;
}
.btn_xl {
  padding: 0.5em 1.2em;
}
.btn_grey {
  background-color: var(--light-grey);
  color: var(--dark-grey);
}
.btn_grey:hover {
  background-color: var(--grey);
}
.btn_wh-bl,
.btn_wh-blue {
  border-radius: 4px;
  background-color: var(--white);
  padding: 0.5em 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn_wh-bl {
  color: var(--dark-grey);
}
.btn_wh-blue {
  color: var(--blue);
}
.btn_wh-blue:hover {
  background-color: var(--blue);
  color: var(--white);
}
.btn_wh-bl:hover {
  background-color: var(--dark-grey);
  color: var(--white);
}
</style>