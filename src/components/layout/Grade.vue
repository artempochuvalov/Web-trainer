<template>
  <div class="grade">
    <h3 class="grade__title">{{ grade_dialog_title }}</h3>
    <div class="grade__grade">
      {{ grade_dialog_your_grade }} <span>{{ grade }}/10</span>
    </div>
    <div class="grade__links">
      <Link class="grade__link" :to="'/profile'">{{ grade_dialog_to_profile }}</Link>
      <Link class="grade__link" :to="'/progress'">{{ grade_dialog_to_grade }}</Link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Link from "./Link.vue";

export default {
  components: { Link },
  name: "Grade",
  props: {
    grade: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getTaskUIText: "langs/getTaskUIText",
    }),
    grade_dialog_title() {
      return this.getTaskUIText("grade_dialog_title");
    },
    grade_dialog_your_grade() {
      return this.getTaskUIText("grade_dialog_your_grade");
    },
    grade_dialog_to_grade() {
      return this.getTaskUIText("grade_dialog_to_grade");
    },
    grade_dialog_to_profile() {
      return this.getTaskUIText("grade_dialog_to_profile");
    },
  },
};
</script>

<style>
.grade {
  display: flex;
  flex-direction: column;
}
.grade__title {
  font-family: "Montserrat", sans-serif;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 6px;
  align-self: center;
}
.grade__grade {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: var(--dark-grey);
  font-size: 15.5px;
  margin-bottom: 16px;
  align-self: center;
}
.grade__grade span {
  font-family: "Radio Canada", sans-serif;
  display: inline-block;
  padding: 6px 8px 4px;
  background-color: rgba(var(--light-blue-rgb), 0.3);
  color: var(--light-blue);
  border-radius: 12px;
}
.grade__links {
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
}
.grade__link {
  text-align: center;
  flex: 0 1 49%;
  font-size: 14px;
}
</style>