<template>
  <div class="stp">
    <div
      class="stp__content"
      :class="{
        stp__content_invisible: loading || shouldBeRotated,
      }"
    >
      <div class="stp__description description">
        <p class="description__text">
          {{ task_text }}
        </p>
      </div>
      <section class="stp__task task-stp task-stp_1">
        <div class="task-stp__description task-description">
          <span> 1 </span>
          <p class="task-description__text">
            {{ enter_root }}
          </p>
        </div>
        <Tip class="task-stp__tip" v-if="rootTip">
          корневой коммутатор определён неправильно
        </Tip>
        <fill-warn
          class="task-stp__fill-warn"
          :condition="!isRootFilled && !isFilled"
        >
          Не выбран корневой коммуттаор
        </fill-warn>
        <div class="task-stp__root-input stp-root">
          <form @submit.prevent class="stp-root__content">
            <label class="stp-root__label" for="stp-root-input">
              {{ root_switch }}
            </label>
            <stp-switch-input
              class="stp-root__input"
              id="stp-root-input"
              :device="root"
              :style="{
                border: rootTip
                  ? 'var(--red) dashed 2px'
                  : 'var(--grey) solid 2px',
              }"
              @update:device="setRoot($event)"
            />
          </form>
          <stp-switches class="task-stp__switches" />
        </div>
      </section>
      <section class="stp__task task-stp task-stp_2">
        <div class="task-stp__description task-description">
          <span> 2 </span>
          <p class="task-description__text">
            {{ delete_links }}
          </p>
          <Info class="task-description__info">
            {{ topology_interaction_info }}
          </Info>
        </div>
        <Tip class="task-stp__tip" v-if="connectionsTip">
          неверная топология
        </Tip>
        <stp-topology />
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Info from "../../layout/Info.vue";
import Tip from "../../layout/Tip.vue";
import FillWarn from "../fillWarn.vue";
import StpSwitches from "./stpSwitches.vue";
import StpSwitchInput from "./stpSwitchInput.vue";
import StpTopology from "./stpTopology.vue";

export default {
  name: "Stp",
  components: { StpTopology, StpSwitches, StpSwitchInput, Tip, Info, FillWarn },
  methods: {
    ...mapMutations({
      setRoot: "stp/setRoot",
    }),
  },
  computed: {
    ...mapState({
      loading: (state) => state.stp.loading,
      shouldBeRotated: (state) => state.stp.shouldBeRotated,

      connections: (state) => state.stp.connections,
      switches: (state) => state.stp.switches,

      root: (state) => state.stp.root,
      connectionsTip: (state) => state.stp.connectionsTip,
      rootTip: (state) => state.stp.rootTip,
      isFilled: (state) => state.stp.isFilled,
    }),
    ...mapGetters({
      getTextOfTask: "langs/getTextOfTask",
      isRootFilled: "stp/isRootFilled",
    }),

    task_text() {
      return this.getTextOfTask("stp", "task_text");
    },
    enter_root() {
      return this.getTextOfTask("stp", "enter_root");
    },
    delete_links() {
      return this.getTextOfTask("stp", "delete_links");
    },
    topology_interaction_info() {
      return this.getTextOfTask("stp", "topology_interaction_info");
    },
    root_switch() {
      return this.getTextOfTask("stp", "root_switch");
    },
  },
};
</script>
<style scoped>
.stp__content_invisible {
  visibility: hidden;
}
.description__text {
  color: var(--dark-grey);
  font-family: "Droid-serif", sans-serif;
  font-size: 16px;
  line-height: 1.2;
  max-width: 912px;
}
.stp__description {
  margin-bottom: 12px;
}
.stp__task:not(:last-of-type) {
  margin-bottom: 24px;
}
.task-description {
  display: flex;
  align-items: center;
}
.task-description {
  color: var(--dark);
  font-family: "Droid-serif", sans-serif;
  font-size: 16px;
  margin-bottom: 12px;
}
.task-description span {
  font-family: "Radio Canada";
  font-size: 18px;
  color: var(--light-grey);
  background-color: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 12px;
  margin-right: 12px;
}
.task-stp__tip {
  margin-bottom: 12px;
}
.stp-root {
  display: flex;
  align-items: center;
  justify-content: center;
}
.task-stp__switches {
  flex: 0 1 462px;
}
.stp-root__content {
  display: flex;
  align-items: center;
  margin-right: 48px;
}
.stp-root__label {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: var(--blue);
  margin-right: 8px;
}
.task-description__info {
  margin-left: 12px;
}
.task-stp__fill-warn {
  margin-bottom: 12px;
}
@media (max-width: 768px) {
  .stp-root {
    flex-direction: column-reverse;
    align-items: stretch;
  }
  .task-stp__switches {
    flex: none;
    margin-bottom: 12px;
  }
  .stp-root__content {
    margin-right: 0;
    align-self: center;
  }
  .description__text,
  .task-description__text {
    font-size: 14px;
  }
  .task-description span {
    font-size: 16px;
    width: 36px;
    height: 36px;
  }
}
</style>