<template>
  <transition name="toggle">
    <nav
      class="nav-menu"
      v-show="!collapsed || $windowWidth > 1024"
      :style="{ width: $windowWidth > 1024 ? menuWidth : `${MENU_WIDTH}px` }"
    >
      <div v-if="$windowWidth > 1024" class="nav-menu__switcher-wrapper">
        <div class="nav-menu__switcher" @click="toggleMenu">
          <span
            class="nav-menu__icon collapse-icon"
            :class="{ 'collapse-icon_rotated': !collapsed }"
          >
            <i class="fas fa-angle-double-right" />
          </span>
        </div>
      </div>
      <div class="nav-menu__links" ref="menu-links">
        <navigation-link :to="'/'" :icon="'fas fa-house'"
          >{{ home_text }}</navigation-link
        >
        <navigation-link :to="'/profile'" :icon="'fas fa-circle-user'"
          >{{ profile_text }}</navigation-link
        >
        <navigation-link :to="'/tasks'" :icon="'fas fa-book-open'"
          >{{ tasks_text }}</navigation-link
        >
        <navigation-link :to="'/progress'" :icon="'fas fa-graduation-cap'"
          >{{ grades_text }}</navigation-link
        >
      </div>
      <div v-if="$windowWidth <= 768" class="nav-menu__extra nav-menu-extra">
        <div class="nav-menu-extra__logout" @click="logout" v-if="cookie">
          <span class="nav-menu-extra__icon">
            <i class="fa-solid fa-arrow-right-from-bracket" />
          </span>
          <p class="nav-menu-extra__text">{{ logout_text }}</p>
        </div>
        <router-link class="nav-menu-extra__login" :to="'/login'" v-else>
          <span class="nav-menu-extra__icon">
            <i class="fa-solid fa-arrow-right-from-bracket" />
          </span>
          <p class="nav-menu-extra__text">{{ login_text }}</p>
        </router-link>
      </div>
    </nav>
  </transition>
</template>

<script>
import NavigationLink from "./NavigationLink.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: { NavigationLink },
  name: "navigation-menu",
  methods: {
    ...mapActions({
      toggleMenu: "navMenu/toggleMenu",
      logout: "auth/logout",
    }),
    ...mapMutations({
      setCollapsed: "navMenu/setCollapsed",
    }),
  },
  computed: {
    ...mapState({
      collapsed: (state) => state.navMenu.collapsed,
      MENU_WIDTH: (state) => state.navMenu.MENU_WIDTH,
      cookie: (state) => state.auth.cookie,
    }),
    ...mapGetters({
      menuWidth: "navMenu/menuWidth",
      getSystemText: "langs/getSystemText",
      getNavMenuText: "langs/getNavMenuText",
    }),

    login_text() {
      return this.getSystemText("login_text");
    },
    logout_text() {
      return this.getSystemText("logout_text");
    },
    home_text() {
      return this.getNavMenuText("home_text");
    },
    profile_text() {
      return this.getNavMenuText("profile_text");
    },
    tasks_text() {
      return this.getNavMenuText("tasks_text");
    },
    grades_text() {
      return this.getNavMenuText("grades_text");
    },
    langs_text() {
      return this.getNavMenuText("langs_text");
    }
  },
  beforeMount() {
    this.setCollapsed(true);
  },
};
</script>

<style scoped>
.nav-menu {
  background-color: var(--white);
  bottom: 0;
  box-shadow: 8px 0px 6px -6px var(--grey);
  color: var(--dark-grey);
  display: flex;
  flex-direction: column;
  font-size: 18px;
  left: 0;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  transition: 0.3s width ease;
  z-index: 101;
}
.nav-menu__switcher-wrapper {
  padding-bottom: 23.5px;
  padding-top: 23.5px;
  position: sticky;
  top: 0;
  width: inherit;
  z-index: 101;
}
.nav-menu__switcher-wrapper::after {
  background-color: var(--white);
  content: "";
  height: 62px;
  position: absolute;
  top: -12px;
  width: 100%;
}
.nav-menu__switcher {
  background-color: var(--white);
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
  margin-left: 16px;
  padding: 11px 12px;
  position: relative;
  transition: 0.2s ease background-color;
  width: 40px;
  z-index: 102;
}
.nav-menu__switcher:hover {
  background-color: var(--light-grey);
}
.nav-menu__switcher:active {
  color: var(--grey);
}
.collapse-icon {
  align-self: flex-start;
  display: inline-block;
  transition: 0.2s transform linear;
}
.collapse-icon_rotated {
  display: inline-block;
  transform: rotate(180deg);
  transition: 0.2s transform linear;
}
.nav-menu__links {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
}
.nav-menu__extra {
  display: flex;
  flex-direction: column;
}
.nav-menu__extra {
  border-top: 1px solid var(--light-grey);
}
.nav-menu-extra__logout,
.nav-menu-extra__login {
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
.nav-menu-extra__logout:hover {
  color: var(--blue);
  background-color: rgba(var(--light-blue-rgb), 0.1);
}
.nav-menu-extra__icon {
  width: 25px;
  text-align: center;
  flex-shrink: 0;
}
@media (max-width: 1024px) {
  .toggle-enter-active,
  .toggle-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .toggle-enter-from,
  .toggle-leave-to {
    transform: translateX(-100%);
  }
}
</style>