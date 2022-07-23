<template>
  <Task :work="'stp'">
    <Stp />
  </Task>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Stp from "../../tasks/STP/Stp.vue";
import Task from "../../tasks/Task.vue";

export default {
  name: "stp-page",
  components: { Task, Stp },
  methods: {
    ...mapActions({
      cleaner: "stp/cleaner",
    }),
  },
  computed: {
    ...mapState({
      taskVisible: (state) => state.stp.taskVisible,
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