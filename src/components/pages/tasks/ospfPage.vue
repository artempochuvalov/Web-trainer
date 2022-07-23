<template>
  <Task :work="'ospf'">
    <Ospf />
  </Task>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Ospf from "../../tasks/OSPF/Ospf.vue";
import Task from "../../tasks/Task.vue";

export default {
  name: "ospf-page",
  components: { Task, Ospf },
  methods: {
    ...mapActions({
      cleaner: "ospf/cleaner",
    }),
  },
  computed: {
    ...mapState({
      taskVisible: (state) => state.ospf.taskVisible,
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