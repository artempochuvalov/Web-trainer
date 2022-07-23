<template>
  <header class="header">
    <Burger v-if="$windowWidth <= 1024" class="header__burger" />
    <div class="header__container">
      <router-link :to="'/'" class="header__logo logo">
        Net <span>Design</span>
      </router-link>
      <div class="header__states">
        <langs-drop-down class="header__langs" />
        <div class="header__logout logout" v-if="cookie">
          <p class="logout__status">{{ log_status_text }}</p>
          <p class="logout__text" @click.stop="logout">{{ logout_text }}</p>
        </div>
        <router-link class="header__login" :to="'/login'" v-else>
          {{ login_text }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Burger from "./Burger.vue";
import LangsDropDown from "./langsDropDown.vue";

export default {
  components: { Burger, LangsDropDown },
  name: "Header",
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
  computed: {
    ...mapState({
      cookie: (state) => state.auth.cookie,
    }),
    ...mapGetters({
      getSystemText: "langs/getSystemText",
    }),

    login_text() {
      return this.getSystemText("login_text");
    },
    logout_text() {
      return this.getSystemText("logout_text");
    },
    log_status_text() {
      return this.getSystemText("log_status_text");
    },
  },
};
</script>

<style scoped>
.header {
  background-color: var(--white);
  box-shadow: 0px 8px 6px -8px var(--grey);
  border-bottom: 1px solid var(--light-grey);
  height: 56px;
  padding: 0 48px 0 24px;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
}
.header__burger {
  margin-right: 12px;
}
.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.header__states {
  display: flex;
  align-items: center;
}
.header__langs:not(:last-child) {
  margin-right: 42px;
}
.logout {
  display: flex;
  align-items: center;
}
.logout__status,
.logout__text {
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
}
.logout__status {
  margin-right: 12px;
  color: var(--blue);
}
.logout__text {
  cursor: pointer;
  color: var(--dark-grey);
}
@media (max-width: 992px) {
  .logout__status {
    display: none;
  }
}
@media (max-width: 768px) {
  .logout__text {
    display: none;
  }
  .header__langs {
    display: none;
  }
  .header__logo {
    margin: 0 auto;
  }
}
</style>