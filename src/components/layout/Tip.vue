<template>
  <div class="tip">
    <div class="tip__icon">
      <p class="tip__icon-text">{{ tip_title }}</p>
    </div>
    <div class="tip__text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Tip",
  computed: {
    ...mapGetters({
      getTaskUIText: "langs/getTaskUIText",
    }),
    tip_title() {
      return this.getTaskUIText('tip_title');
    }
  }
};
</script>

<style scoped>
.tip {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  background-color: var(--white);
  border-radius: 8px;
  padding: 12px 18px;
}
.tip__icon {
  background-color: var(--red);
  width: 132px;
  height: 30px;
  border-radius: 12px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tip__icon-text {
  align-self: center;
  font-size: 15px;
  text-transform: uppercase;
  color: var(--white);
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.05em;
  font-weight: 500;
}
.tip__text {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--dark);
  border-left: 3px solid var(--red);
  padding-left: 6px;
  flex: 1 1 auto;
}
</style>