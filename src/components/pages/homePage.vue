<template>
  <Animation>
    <div class="home-page">
      <header class="home-page__header home-header">
        <router-link :to="'/'" class="home-page__logo logo">
          Net <span>Design</span>
        </router-link>
        <div class="home-header__systems" v-if="$windowWidth > 768">
          <langs-drop-down class="home-page__langs" />
          <router-link class="home-header__login" :to="'/login'" v-if="!cookie">
            {{ login_text }}
          </router-link>
          <p class="home-header__logout" @click.stop="logout" v-else>
            {{ logout_text }}
          </p>
        </div>
      </header>
      <div class="home-page__description home-description">
        <p class="home-description__text">
          {{ description }}
        </p>
      </div>
      <ul class="home-page__links-list links-list" v-if="$windowWidth > 768">
        <li
          class="link-list__item"
          v-for="link in links"
          :key="link.name"
          @mouseover="handleHover($event, link.name)"
        >
          <router-link class="link-list__link" :to="`/${link.name}`">
            {{ getTextOfLink(link.name) }}
          </router-link>
        </li>
      </ul>
      <span
        class="home-page__line"
        :style="{ 'margin-left': hrMargin }"
        v-if="hovered && $windowWidth > 768"
      >
      </span>
      <div class="home-page__btns">
        <Button
          class="home-page__btn btn_wh-bl"
          @click="moveToTasks"
          v-if="$windowWidth <= 768"
        >
          {{ to_tasks_btn }}
          <i class="home-page__icon fa-solid fa-arrow-right-long" />
        </Button>
        <Button class="home-page__btn btn_wh-bl" @click="moveToCabinet">
          Cabinet MIEM
          <i class="home-page__icon fas fa-laptop-code" />
        </Button>
      </div>
    </div>
  </Animation>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Animation from "./animationPage/Animation.vue";
import Button from "../layout/Button.vue";
import LangsDropDown from "../layout/langsDropDown.vue";

export default {
  components: { Animation, Button, LangsDropDown },
  data() {
    return {
      links: [{ name: "profile" }, { name: "tasks" }, { name: "progress" }],
      hovered: "profile",
    };
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    handleHover(evt, name) {
      this.hovered = name;
    },
    moveToCabinet() {
      window.location.href = "https://cabinet.miem.hse.ru/#/project/956/";
    },
    moveToTasks() {
      this.$router.push("/tasks");
    },
    getTextOfLink(linkName) {
      return this.getHomePageText(`${linkName}_link_text`);
    },
  },
  computed: {
    ...mapState({
      cookie: (state) => state.auth.cookie,
    }),
    ...mapGetters({
      getCookie: "auth/getCookie",
      getHomePageText: "langs/getHomePageText",
      getSystemText: "langs/getSystemText",
    }),
    hrMargin: function () {
      const index = this.links.findIndex((item) => item.name === this.hovered);
      return `${index * 25}%`;
    },
    description() {
      return this.getHomePageText("description");
    },
    to_tasks_btn() {
      return this.getHomePageText("to_tasks_btn");
    },
    login_text() {
      return this.getSystemText("login_text");
    },
    logout_text() {
      return this.getSystemText("logout_text");
    },
  },
};
</script>
<style scoped>
.home-page {
  width: 624px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.home-page__header {
  margin-bottom: 18px;
}
.home-header__systems {
  display: flex;
  align-items: center;
}
.home-header__login,
.home-header__logout {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--dark-grey);
  letter-spacing: 0.05em;
  text-decoration: none;
  cursor: pointer;
}
.home-page__langs {
  margin-right: 36px;
}
.home-page__description {
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  line-height: 1.2;
  margin-bottom: 48px;
  max-width: 450px;
  align-self: center;
  text-align: center;
}
.home-page__links-list {
  margin-bottom: 48px;
  align-self: center;
}
.links-list {
  display: flex;
  align-items: center;
}
.link-list__item {
  padding: 6px 0;
  position: relative;
}
.link-list__item:not(:last-of-type) {
  margin-right: 32px;
}
.link-list__item:after {
  content: "";
  position: absolute;
  width: 0;
  height: 3px;
  display: block;
  margin-top: 6px;
  right: 0;
  background: var(--blue);
  transition: width 0.2s ease;
}
.link-list__item:hover:after {
  width: 100%;
  left: 0;
  background: var(--blue);
}
.link-list__link {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  text-decoration: none;
  letter-spacing: 0.06em;
  color: var(--blue);
}
.home-page__btns {
  align-self: center;
  width: 100%;
  padding: 0 120px;
  display: flex;
  flex-wrap: wrap;
}
.home-page__btn {
  display: flex;
  align-items: center;
  width: 100%;
}
.home-page__icon {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .home-page {
    padding: 18px;
    max-width: 276px;
  }
  .home-page__header {
    margin-bottom: 4px;
    align-self: center;
  }
  .home-page__description {
    font-size: 14px;
    line-height: 1;
    max-width: none;
    margin-bottom: 18px;
  }
  .home-page__btns {
    padding: 0;
  }
  .home-page__btn:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>