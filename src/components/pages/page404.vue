<template>
  <Animation>
    <div class="page404">
      <h2 class="page404__title">404</h2>
      <h3 class="page404__subtitle">{{ page404_subtitle }}</h3>
      <p class="page404__description">
        {{ page404_description }}
      </p>
      <div class="page404__btns">
        <Button class="page404__btn btn_wh-bl" @click="$router.go(-1)">
          <i class="fas fa-arrow-left page404__icon" />
          {{ page404_back_btn }}
        </Button>
        <Button class="page404__btn btn_wh-blue" @click="$router.push('/')">
          <i class="fas fa-home page404__icon" />
          {{ page404_home_btn }}
        </Button>
      </div>
    </div>
  </Animation>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../layout/Button.vue";
import Animation from "./animationPage/Animation.vue";

export default {
  components: { Animation, Button },
  computed: {
    ...mapGetters({
      getPage404Text: "langs/getPage404Text",
    }),
    page404_subtitle() {
      return this.getPage404Text("page404_subtitle");
    },
    page404_description() {
      return this.getPage404Text("page404_description");
    },
    page404_back_btn() {
      return this.getPage404Text("page404_back_btn");
    },
    page404_home_btn() {
      return this.getPage404Text("page404_home_btn");
    },
  },
};
</script>

<style scoped>
.page404 {
  width: 432px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px;
  align-items: center;
}
.page404__title {
  font-family: "Monsterrat", sans-serif;
  font-weight: 700;
  font-size: 60px;
  color: var(--blue);
  margin-bottom: 18px;
}
.page404__subtitle {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 6px;
}
.page404__description {
  color: var(--dark-grey);
  text-align: center;
  font-size: 14px;
  max-width: 396px;
  margin-bottom: 36px;
}
.page404__btns {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.page404__btn {
  width: 156px;
}
.page404__icon {
  margin-right: 6px;
}
@media (max-width: 768px) {
  .page404 {
    padding: 12px;
    width: 276px;
  }
  .page404__title {
    font-size: 54px;
    margin-bottom: 6px;
  }
  .page404__description {
    margin-bottom: 12px;
  }
  .page404__btns {
    width: 100%;
    flex-direction: column-reverse;
  }
  .page404__btn {
    width: 100%;
    margin: 0 auto;
  }
  .page404__btn {
    margin-right: 0;
    margin-bottom: 6px;
  }
}
</style>