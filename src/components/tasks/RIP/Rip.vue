<template>
  <div class="rip">
    <div
      class="rip__content"
      :class="{
        rip__content_invisible: loading || shouldBeRotated,
      }"
    >
      <div class="rip__description description">
        <p class="description__text" v-html="task_text"></p>
        <rip-topology />
      </div>
      <section class="rip__task task-rip task-rip_1">
        <div class="task-rip__description task-description">
          <span> 1 </span>
          <p class="task-description__text" v-html="calc_table"></p>
        </div>
        <Tip class="task-rip__tip rip-tip" v-if="!tableTips.status">
          <ul class="rip-tip__list">
            <li class="rip-tip__item">
              таблица маршрутизации рассчитана неверно
            </li>
            <li class="rip-tip__item" v-if="tableTips.incorrect_vectors.length">
              строки таблицы, подсвеченные красным рассчитаны неверно
            </li>
            <li class="rip-tip__item" v-if="tableTips.copied_vectors">
              таблица содержит повторяющиеся строки
            </li>
            <li class="rip-tip__item" v-if="!tableTips.correct_length">
              неверное количество строк таблицы
            </li>
          </ul>
        </Tip>
        <fill-warn class="task-rip__fill-warn" :condition="!isFilled && !isTableFilled">
          некоторые элементы таблицы незаполнены
        </fill-warn>
        <rip-table
          :routersNumber="routersNumber"
          :subnetsNumber="subnetsNumber"
          :incorrectVectors="tableTips.incorrect_vectors"
        />
      </section>
      <section class="rip__task task-rip task-rip_2">
        <div class="task-rip__description task-description">
          <span> 2 </span>
          <p class="task-description__text" v-html="enter_path"></p>
        </div>
        <Tip class="task-rip__tip" v-if="routeTip">
          неверный кратчайший путь
        </Tip>
        <fill-warn class="task-rip__fill-warn" :condition="!isFilled && !isRouteFilled">
          не заполнены элементы пути
        </fill-warn>
        <rip-path
          class="task-rip__path"
          :class="{'task-rip__path_incorrect' : routeTip}"
          :router="path.router"
          :routersNumber="routersNumber"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Info from "../../layout/Info.vue";
import Tip from "../../layout/Tip.vue";
import RipPath from "./ripPath.vue";
import RipTable from "./ripTable.vue";
import ripTopology from "./ripTopology.vue";
import fillWarn from "../fillWarn.vue";

export default {
  components: { ripTopology, RipTable, RipPath, Tip, Info, fillWarn },
  name: "Rip",
  computed: {
    ...mapState({
      loading: (state) => state.rip.loading,
      loadFail: (state) => state.rip.loadFail,
      taskVisible: (state) => state.rip.taskVisible,
      shouldBeRotated: (state) => state.rip.shouldBeRotated,

      path: (state) => state.rip.path,
      router: (state) => state.rip.router,

      tableTips: (state) => state.rip.tableTips,
      routeTip: (state) => state.rip.routeTip,

      isFilled: (state) => state.rip.isFilled,
    }),
    ...mapGetters({
      routersNumber: "rip/routersNumber",
      subnetsNumber: "rip/subnetsNumber",
      getTextOfTask: "langs/getTextOfTask",
      isTableFilled: "rip/isTableFilled",
      isRouteFilled: "rip/isRouteFilled",
    }),

    task_text() {
      const task_text_pieces = this.getTextOfTask("rip", "task_text_pieces");
      const data_pieces = [this.router, this.path.router, this.path.subnet];

      return task_text_pieces.reduce(
        (previousPiece, currentPiece, index) =>
          previousPiece +
          currentPiece +
          (data_pieces[index] !== undefined
            ? `<span>${data_pieces[index]}</span>`
            : ""),
        ""
      );
    },
    calc_table() {
      return `${this.getTextOfTask("rip", "calc_table")} <span>${this.router}</span>`;
    },
    enter_path() {
      const enter_path_pieces = this.getTextOfTask("rip", "enter_path_pieces");
      const data_pieces = [this.path.router, this.path.subnet];

      return enter_path_pieces.reduce(
        (previousPiece, currentPiece, index) =>
          previousPiece + currentPiece + `<span> ${data_pieces[index]} </span>`,
        ""
      );
    },
  },
};
</script>

<style scoped>
.rip__content_invisible {
  visibility: hidden;
}
.description__text {
  color: var(--dark-grey);
  font-family: "Droid-serif", sans-serif;
  font-size: 16px;
  line-height: 1.2;
  max-width: 912px;
}
.rip__description {
  margin-bottom: 12px;
}
.rip__task:not(:last-of-type) {
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
.task-rip_2 {
  display: flex;
  flex-direction: column;
}
.task-rip__path {
  padding: 6px 12px;
  border: 2px dashed transparent;
  border-radius: 8px;
  transition: .6s ease border-color;
  align-self: flex-start;
}
.task-rip__path_incorrect {
  border-color: var(--red);
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
.task-rip__tip {
  margin-bottom: 18px;
}
.rip-tip__item:not(:last-of-type) {
  margin-bottom: 2px;
}
.task-rip__fill-warn {
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