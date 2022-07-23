<template>
  <div
    class="burger"
    @click="toggleMenu"
    :class="{ burger_active: !collapsed }"
  >
    <div class="burger__line"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Burger",
  computed: {
    ...mapState({
      collapsed: (state) => state.navMenu.collapsed,
    }),
  },
  methods: {
    ...mapActions({
      toggleMenu: "navMenu/toggleMenu",
    }),
  },
};
</script>

<style scoped>
.burger {
  position: relative;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.burger__line {
  width: 18px;
  height: 2px;
  background-color: var(--dark-grey);
  border-radius: 3px;
  transition: all 0.3s ease;
}
.burger__line::before,
.burger__line::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 2px;
  background-color: var(--dark-grey);
  border-radius: 3px;
  transition: all 0.3s ease;
}
.burger__line::before {
  transform: translateY(-5px);
}
.burger__line::after {
  transform: translateY(5px);
}
.burger_active .burger__line {
  transform: translateX(-10px);
  background-color: transparent;
}
.burger_active .burger__line::before {
  transform: rotate(45deg) translate(7px, -7px);
}
.burger_active .burger__line::after {
  transform: rotate(-45deg) translate(7px, 7px);
}
</style>