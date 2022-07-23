<template>
  <Animation>
    <div class="login-page">
      <h2 class="login-page__title">{{ login_page_title }}</h2>
      <p class="login-page__text">
        {{ login_page_subtitle }}
      </p>
      <Button class="login-page__btn btn-xl" @click="login">
        {{ login_page_btn }}
      </Button>
    </div>
  </Animation>
</template>

<script>
import store from "@/store/index.js";
import { mapActions, mapGetters } from "vuex";
import Button from "../layout/Button.vue";
import Animation from "./animationPage/Animation.vue";

export default {
  components: { Animation, Button },
  name: "login-page",
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
  },
  computed: {
    ...mapGetters({
      getLoginPageText: "langs/getLoginPageText",
    }),

    login_page_title() {
      return this.getLoginPageText("login_page_title");
    },
    login_page_subtitle() {
      return this.getLoginPageText("login_page_subtitle");
    },
    login_page_btn() {
      return this.getLoginPageText("login_page_btn");
    },
  },
  beforeRouteEnter(to, from) {
    if (store.state.auth.cookie) return { path: "/" };
  },
};
</script>

<style scoped>
.login-page {
  width: 360px;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-page__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: 0.06em;
  color: var(--dark);
  margin: 36px 0 12px;
}
.login-page__text {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: var(--dark-grey);
  text-align: center;
  margin-bottom: 72px;
}
.login-page__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 50%;
  margin-bottom: 48px;
  font-size: 13px;
}
@media (max-width: 992px) {
  .login-page__title {
    margin: 28px 0 14px;
    font-size: 20px;
  }
  .login-page__text {
    margin-bottom: 48px;
  }
  .login-page__btn {
    margin-bottom: 24px;
  }
}
@media (max-width: 768px) {
  .login-page {
    width: 276px;
  }
  .login-page__btn {
    width: 100%;
  }
  .login-page__btn {
    margin-bottom: 12px;
  }
}
</style>