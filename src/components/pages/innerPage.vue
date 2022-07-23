<template>
  <div class="inner-page">
    <navigation-menu class="inner-page__nav-menu" />
    <Header />
    <main
      class="inner-page__container"
      :style="{
        'margin-left':
          $windowWidth > 1400
            ? menuWidth
            : $windowWidth > 1024
            ? MENU_WIDTH_COLLAPSED + 'px'
            : 0,
      }"
    >
      <div class="inner-page__content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import Header from "../layout/Header.vue";
import NavigationMenu from "../layout/navigationMenu/NavigationMenu.vue";

export default {
  name: "inner-page",
  components: { NavigationMenu, Header },
  computed: {
    ...mapState({
      MENU_WIDTH_COLLAPSED: (state) => state.navMenu.MENU_WIDTH_COLLAPSED,
    }),
    ...mapGetters({
      menuWidth: "navMenu/menuWidth",
    }),
  },
};
</script>

<style scoped>
.inner-page__nav-menu {
  margin-top: 56px;
}
.inner-page__container {
  background-color: var(--light-grey);
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  transition: 0.3s margin ease;
  overflow-x: hidden;
}
.inner-page__content {
  max-width: 1140px;
  margin: 0 auto;
  padding: 56px 15px;
  width: 100%;
}
@media (max-width: 1024px) {
  .inner-page__content {
    max-width: 992px;
    padding: 36px 15px;
  }
}
@media (max-width: 992px) {
  .inner-page__content {
    max-width: 768px;
    padding: 30px 15px;
  }
}
@media (max-width: 768px) {
  .inner-page__content {
    max-width: none;
    padding: 24px 15px;
  }
}
</style>