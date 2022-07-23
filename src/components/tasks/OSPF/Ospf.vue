<template>
  <div class="ospf">
    <div
      class="ospf__content"
      :class="{
        ospf__content_invisible: loading || shouldBeRotated,
      }"
    >
      <div class="ospf__description description">
        <p class="description__text" v-html="task_text"></p>
      </div>
      <section class="ospf__task task-ospf task-ospf_1">
        <div class="task-ospf__description task-description">
          <span> 1 </span>
          <p class="task-description__text">{{ calc_metric }}</p>
          <Info class="task-description__info">
            {{ topology_interaction_info }}
          </Info>
        </div>
        <ospf-bandwidths class="task-ospf__bandwidths" />
        <Tip
          class="task-ospf__tip"
          v-if="
            weightsTips !== null && weightsTips.length && weightsTips.length > 0
          "
        >
          соединения, подсвеченные красным, рассчитаны неправильно
        </Tip>
        <fill-warn class="task-ospf__fill-warn"
          :condition="!areMetricsFilled && !isFilled"
        >
          введены не все веса соединений
        </fill-warn>
        <ospf-topology />
      </section>
      <section class="ospf__task task-ospf task-ospf_2">
        <div class="task-ospf__description task-description">
          <span> 2 </span>
          <p class="task-description__text" v-html="enter_path"></p>
        </div>
        <Tip class="task-ospf__tip" v-if="routeTip">
          неверный кратчайший путь
        </Tip>
        <fill-warn class="task-ospf__fill-warn"
          :condition="!isRouteFilled && !isFilled"
        >
          не заполнены элементы пути
        </fill-warn>
        <ospf-path
          class="task-ospf__path"
          :class="{ 'task-ospf__path_incorrect': routeTip === true }"
          :work="'ospf'"
          :from="path[0]"
          :to="path[1]"
          :routesNumber="metricsSize"
        />
      </section>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

import ospfTopology from "./ospfTopology.vue";
import Button from "../../layout/Button.vue";
import OspfPath from "./ospfPath.vue";
import Load from "../../layout/Load.vue";
import Info from "../../layout/Info.vue";
import Tip from "../../layout/Tip.vue";
import OspfBandwidths from "./ospfBandwidths.vue";
import FillWarn from "../fillWarn.vue";

export default {
  components: {
    ospfTopology,
    Button,
    OspfPath,
    Load,
    Info,
    Tip,
    OspfBandwidths,
    FillWarn,
  },
  name: "Ospf",
  data() {
    return {
      showUnfilledLinks: true,
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.ospf.loading,
      loadFail: (state) => state.ospf.loadFail,
      taskVisible: (state) => state.ospf.taskVisible,
      shouldBeRotated: (state) => state.ospf.shouldBeRotated,

      ref_bandwidth: (state) => state.ospf.ref_bandwidth,
      path: (state) => state.ospf.path,

      metrics: (state) => state.ospf.metrics,
      route: (state) => state.ospf.route,

      routeTip: (state) => state.ospf.routeTip,
      weightsTips: (state) => state.ospf.weightsTips,

      isFilled: (state) => state.ospf.isFilled,
    }),
    ...mapGetters({
      getTextOfTask: "langs/getTextOfTask",
      metricsSize: "ospf/metricsSize",
      bytesConverter: "ospf/bytesConverter",
      areMetricsFilled: "ospf/areMetricsFilled",
      isRouteFilled: "ospf/isRouteFilled",
    }),

    topology_interaction_info() {
      return this.getTextOfTask("ospf", "topology_interaction_info");
    },
    task_text() {
      let task_text_pieces = this.getTextOfTask("ospf", "task_text_pieces");
      return (
        task_text_pieces[0] +
        `<span> ${this.path[0]} </span>` +
        task_text_pieces[1] +
        `<span> ${this.path[1]} </span>` +
        task_text_pieces[2] +
        `<span> ${this.bytesConverter(this.ref_bandwidth)}</span>` +
        task_text_pieces[3]
      );
    },
    calc_metric() {
      return this.getTextOfTask("ospf", "calc_metric");
    },
    enter_path() {
      let enter_path_pieces = this.getTextOfTask("ospf", "enter_path_pieces");
      return (
        enter_path_pieces[0] +
        `<span> ${this.path[0]} </span>` +
        enter_path_pieces[1] +
        `<span> ${this.path[1]}<span>`
      );
    },
  },
};
</script>

<style scoped>
.ospf__content_invisible {
  visibility: hidden;
}
.description__text {
  color: var(--dark-grey);
  font-family: "Droid-serif", sans-serif;
  font-size: 16px;
  line-height: 1.2;
  max-width: 912px;
}
.ospf__description {
  margin-bottom: 12px;
}
.ospf__task:not(:last-of-type) {
  margin-bottom: 24px;
}
.task-description {
  display: flex;
  align-items: center;
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
  border-radius: 14px;
  margin-right: 8px;
}
.task-description__info {
  margin-left: 12px;
}
.task-ospf__bandwidths {
  margin-bottom: 12px;
}
.task-ospf_2 {
  display: flex;
  flex-direction: column;
}
.task-ospf__path {
  align-self: flex-start;
  padding: 6px 12px;
  border: 2px dashed transparent;
  border-radius: 8px;
  transition: 0.6s ease border-color;
}
.task-ospf__tip {
  margin-bottom: 12px;
}
.task-ospf__path_incorrect {
  border-color: var(--red);
}
.task-ospf__fill-warn {
  margin-bottom: 12px;
}
@media (max-width: 768px) {
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

<style>
.description__text span {
  color: var(--dark);
  white-space: nowrap;
  font-family: "Radio Canada", sans-serif;
}
.task-description__text span {
  font-family: "Radio Canada", sans-serif;
}
</style>