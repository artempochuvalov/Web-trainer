<template>
  <inner-page>
    <div class="task">
      <div class="task__dialogs">
        <Dialog
          v-model:show="tipsAgreementDialogVisible"
          :shouldBeRotated="shouldBeRotated"
        >
          <tips-agreement
            :grade="grade"
            :tipsUsed="tipsUsed"
            :tipsNotAcceptable="tipsNotAcceptable"
            @disagreeTips="showGradeDialog"
            @agreeTips="agreeTips"
            @closeAgreement="tipsAgreementDialogVisible = false"
          />
        </Dialog>
        <Dialog
          v-model:show="gradeDialogVisible"
          :shouldBeRotated="shouldBeRotated"
        >
          <Grade :grade="grade" />
        </Dialog>
        <Dialog
          v-model:show="fillWarnDialogVisible"
          :shouldBeRotated="shouldBeRotated"
        >
          <fill-warn-dialog
            @hideFillWarnDialog="fillWarnDialogVisible = false"
          />
        </Dialog>
      </div>
      <div class="task__container">
        <h1
          class="task__title title-task"
          :style="{
            background:
              'center / cover no-repeat ' +
              'url(' +
              require(`@/assets/banners/${work}.jpg`),
          }"
          v-html="main_header"
        ></h1>
        <section
          class="task__theory theory"
          v-if="!taskVisible || !shouldBeRotated"
        >
          <h2 class="theory__header task__header">
            {{ theory_header }}
          </h2>
          <p class="theory__description">
            {{ description }}
          </p>
        </section>
        <section class="task__grade grade" v-if="!taskVisible">
          <h2 class="grade__header task__header">
            {{ grade_header }}
          </h2>
          <current-band class="grade__current-grade" :work="work" />
        </section>
        <section class="task__assignment assignment">
          <h2 class="assignment__header task__header">
            {{ assignment_header }}
          </h2>
          <div class="assignment__content" v-if="!loadFail && taskVisible">
            <slot></slot>
            <Load :show="loading" />
            <Rotate
              :show="!loading && shouldBeRotated && taskVisible && !loadFail"
              :loading="loading"
            />
          </div>
          <load-fail class="task__load-fail" v-if="loadFail" />
          <div class="assignment__btns">
            <Button
              @click="setTaskVisible(true)"
              v-if="!taskVisible && !loadFail"
              class="btn_xl"
            >
              {{ start_btn_text }}
            </Button>
            <Button
              @click="sendSolution"
              class="btn_xl"
              v-if="!shouldBeRotated && !loading && taskVisible && !loadFail"
              >{{ send_btn_text }}</Button
            >
          </div>
        </section>
      </div>
    </div>
  </inner-page>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Load from "../layout/Load.vue";
import Button from "../layout/Button.vue";
import Rotate from "../layout/Rotate.vue";
import currentBand from "./currentBand.vue";
import InnerPage from "../pages/innerPage.vue";
import Grade from "../layout/Grade.vue";
import Dialog from "../layout/Dialog.vue";
import FillWarnDialog from "./fillWarnDialog.vue";
import TipsAgreement from "./tipsAgreement.vue";
import Warn from "../layout/Warn.vue";
import LoadFail from "../layout/loadFail.vue";

export default {
  components: {
    Load,
    Button,
    Rotate,
    currentBand,
    InnerPage,
    Dialog,
    Grade,
    FillWarnDialog,
    TipsAgreement,
    Warn,
    LoadFail,
  },
  name: "Task",
  data() {
    return {
      grade: 0,
      gradeDialogVisible: false,
      tipsAgreementDialogVisible: false,
      fillWarnDialogVisible: false,
    };
  },
  props: {
    work: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      fetchProfile: "profile/fetchProfile",
      logout: "auth/logout",
    }),
    postSolution() {
      return this.$store.dispatch(`${this.work}/postSolution`);
    },
    fetchTips() {
      return this.$store.dispatch(`${this.work}/fetchTips`);
    },

    setTaskVisible(bool) {
      this.$store.commit(`${this.work}/setTaskVisible`, bool);
    },
    setShouldBeRotated(bool) {
      this.$store.commit(`${this.work}/setShouldBeRotated`, bool);
    },
    setTipsNotAcceptable(bool) {
      this.$store.commit(`${this.work}/setTipsNotAcceptable`, bool);
    },
    setLoadFail(bool) {
      this.$store.commit(`${this.work}/setLoadFail`, bool);
    },

    cleaner() {
      return this.$store.dispatch(`${this.work}/cleaner`);
    },

    async sendSolution() {
      try {
        const response = await this.postSolution();
        if (this.isFilled) {
          this.grade = response.data.grade;

          await this.fetchProfile();
          const max_band = this.getMaxBand(this.work);
          if (this.grade === max_band) {
            this.showGradeDialog();
          } else {
            this.showTipsDialog();
          }
        } else {
          this.fillWarnDialogVisible = true;
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            this.cleaner();
            this.logout();
          } else {
            this.cleaner();
            this.setLoadFail(true);
          }
        } else {
          console.log(err);
        }
      }
    },

    showGradeDialog() {
      this.tipsAgreementDialogVisible = false;
      this.cleaner();
      this.gradeDialogVisible = true;
    },
    showTipsDialog() {
      this.tipsAgreementDialogVisible = true;
    },
    async agreeTips() {
      try {
        await this.fetchTips();
        this.tipsAgreementDialogVisible = false;
      } catch (err) {
        if (err.response) {
          if (err.response.status === 406) {
            this.setTipsNotAcceptable(true);
          } else if (err.response.status === 401) {
            this.cleaner();
            this.logout();
          } else {
            this.cleaner();
            this.tipsAgreementDialogVisible = false;
            this.setLoadFail(true);
          }
        } else {
          console.log(err);
        }
      }
    },

    handleResize() {
      return (
        (window.innerWidth <= 768 || window.innerHeight <= 768) &&
        window.innerWidth < window.innerHeight
      );
    },
  },
  computed: {
    ...mapState({
      loading(state) {
        return state[this.work].loading;
      },
      loadFail(state) {
        return state[this.work].loadFail;
      },
      taskVisible(state) {
        return state[this.work].taskVisible;
      },
      tipsNotAcceptable(state) {
        return state[this.work].tipsNotAcceptable;
      },
      shouldBeRotated(state) {
        return state[this.work].shouldBeRotated;
      },
      isFilled(state) {
        return state[this.work].isFilled;
      },
    }),
    ...mapGetters({
      getTextOfTask: "langs/getTextOfTask",
      getTaskUIText: "langs/getTaskUIText",
      getMaxBand: "profile/getMaxBand",
    }),

    tipsUsed() {
      return this.getMaxBand(this.work) === 7;
    },

    main_header() {
      return this.getTextOfTask(this.work, "main_header");
    },
    theory_header() {
      return this.getTaskUIText("theory_header");
    },
    description() {
      return this.getTextOfTask(this.work, "description");
    },
    grade_header() {
      return this.getTaskUIText("grade_header");
    },
    assignment_header() {
      return this.getTaskUIText("assignment_header");
    },
    start_btn_text() {
      return this.getTaskUIText("start_btn_text");
    },
    send_btn_text() {
      return this.getTaskUIText("send_btn_text");
    },
  },
  beforeMount() {
    this.setShouldBeRotated(this.handleResize());
    window.addEventListener("resize", () => {
      this.setShouldBeRotated(this.handleResize());
    });
  },
};
</script>

<style scoped>
.title-task {
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  background-color: #fff;
  background-position: center center;
  background-size: cover;
  border-radius: 18px;
  box-shadow: 0 2px 7px 0 rgb(0 0 0 / 70%), 3px 27px 54px -34px rgb(0 0 0 / 47%);
  color: var(--light-grey);
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1.2;
  padding: 54px;
  transition: 0.3s box-shadow;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  user-select: none;
  text-align: center;
}
.task__title {
  margin-bottom: 32px;
}
@media (min-width: 1024px) {
  .title-task:hover {
    box-shadow: none;
  }
}
.task__header {
  color: var(--dark);
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.2px;
}
.task__header {
  margin-bottom: 6px;
}
.theory__description {
  max-width: 912px;
  color: var(--dark-grey);
  font-family: "Droid-serif";
  font-size: 16px;
  line-height: 1.2;
}
.task__theory,
.task__grade {
  margin-bottom: 24px;
}
.assignment__content {
  position: relative;
}
.assignment__content_invisible {
  visibility: hidden;
}
.assignment__header {
  margin-bottom: 6px;
}
.task__load-fail {
  margin: 24px 0;
}
.assignment__btns {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}
@media (max-width: 1024px) {
  .task__title {
    margin-bottom: 24px;
  }
  .text-task__description {
    margin-bottom: 12px;
    max-width: none;
  }
  .theory__header,
  .assignment__header,
  .grade__header {
    font-size: 18px;
  }
  .assignment__btns {
    margin-top: 24px;
  }
}
@media (max-width: 992px) {
  .theory,
  .grade {
    margin-bottom: 12px;
  }
  .task__text {
    max-width: none;
  }
  .title-task {
    font-size: 24px;
    padding: 42px 0 42px;
  }
}
@media (max-width: 768px) {
  .theory__description {
    font-size: 14px;
  }
  .btn_xl {
    padding-top: 0.3em;
    padding-bottom: 0.3em;
  }
  .assignment__btns {
    margin-top: 12px;
  }
}
@media (max-width: 576px) {
  .title-task {
    padding: 36px 0;
    text-align: center;
  }
  .theory__header,
  .assignment__header,
  .grade__header {
    text-align: center;
  }
  .grade__current-grade {
    margin-right: auto;
    margin-left: auto;
    width: 100%;
  }
}
</style>

<style>
.title-task span {
  color: var(--light-blue);
  text-transform: uppercase;
}
</style>