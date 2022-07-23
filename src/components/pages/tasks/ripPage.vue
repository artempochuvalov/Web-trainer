<template>
  <Task :work="'rip'">
    <Rip />
  </Task>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Rip from "../../tasks/RIP/Rip.vue";
import Task from "../../tasks/Task.vue";

export default {
  name: "stp-page",
  components: { Task, Rip },
  methods: {
    ...mapActions({
      cleaner: "rip/cleaner",
    }),
  },
  computed: {
    ...mapState({
      taskVisible: (state) => state.rip.taskVisible,
    }),
    ...mapGetters({
      getTaskUIText: "langs/getTaskUIText",
    }),
    leave_warn_text() {
      return this.getTaskUIText('leave_warn_text');
    }
  },
  beforeRouteLeave(to, from) {
    if (to.path === "/login") {
      this.cleaner();
    } else if (this.taskVisible) {
      const leave = confirm(
        this.leave_warn_text
      );
      if (leave) {
        this.cleaner();
      } else {
        return false;
      }
    }
  },
};
</script>