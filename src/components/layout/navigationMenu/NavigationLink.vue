<template>
  <router-link class="nav-link" :to="to" :class="{ active: isActive }" >
    <div class="nav-link__icon">
      <i :class="icon" />
    </div>
    <transition name="fade">
      <span v-if="!collapsed || $windowWidth <= 992">
        <slot></slot>
      </span>
    </transition>
  </router-link>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { mapState } from "vuex";

export default {
  name: "navigation-link",
  props: {
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      collapsed: (state) => state.navMenu.collapsed,
    }),
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(
      () => `/${route.path.split("/")[1]}` === props.to
    );
    return { isActive };
  },
};
</script>

<style scoped>
.nav-link {
  align-items: center;
  color: var(--dark-grey);
  cursor: pointer;
  display: flex;
  font-family: "Montserrat";
  font-size: 18px;
  gap: 10px;
  padding: 23.5px;
  position: relative;
  text-decoration: none;
  transition: 0.3s all ease-out;
}
.nav-link:hover {
  color: var(--blue);
  background-color: rgba(var(--light-blue-rgb), 0.1);
}
.nav-link.active {
  color: var(--blue);
}
.nav-link.active::before {
  content: "";
  position: absolute;
  height: 60%;
  width: 3px;
  background-color: var(--blue);
  left: 0;
}
.nav-link__icon {
  width: 25px;
  text-align: center;
  flex-shrink: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  overflow: hidden;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>