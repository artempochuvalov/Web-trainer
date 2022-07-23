<template>
  <inner-page>
    <div class="tasks-page">
      <div class="tasks-page__content">
        <h2 class="task-page__title">
          {{ task_page_title }}
        </h2>
        <ul class="tasks-page__list tasks-list">
          <li class="tasks-list__item" v-for="task of tasks" :key="task.name">
            <div
              class="tasks-list__img"
              :style="{
                background:
                  'center / cover no-repeat ' +
                  'url(' +
                  require(`@/assets/banners/${task.name}.jpg`),
              }"
            ></div>
            <div class="tasks-list__text task-text">
              <h3 class="task-text__title">
                {{ task.name }}
              </h3>
              <p class="task-text__desciption">
                {{ getShortDescription(task.name) }}
              </p>
              <Link class="task-text__link" :to="`/tasks/${task.name}`">
                {{ start_btn_text }}
                <i class="fa-solid fa-arrow-right-long task-text__link-item" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </inner-page>
</template>

<script>
import innerPage from "../innerPage.vue";
import Link from "../../layout/Link.vue";
import { mapGetters } from "vuex";

export default {
  components: { innerPage, Link },
  name: "tasks-page",
  data() {
    return {
      tasks: [{ name: "ospf" }, { name: "rip" }, { name: "stp" }],
    };
  },
  methods: {
    getShortDescription(task) {
      return this.getTextOfTask(task, "short_description");
    },
  },
  computed: {
    ...mapGetters({
      getTextOfTask: "langs/getTextOfTask",
      getTaskUIText: "langs/getTaskUIText",
    }),
    task_page_title() {
      return this.getTaskUIText("task_page_title");
    },
    start_btn_text() {
      return this.getTaskUIText("start_btn_text");
    },
  },
};
</script>

<style scoped>
.task-page__title {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 18px;
}
.tasks-list {
  display: flex;
  flex-direction: column;
  padding-left: 12px;
}
.tasks-list__item {
  display: flex;
  padding: 18px;
  background-color: var(--white);
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  border-radius: 8px;
  transition: 0.3s box-shadow;
}
@media (min-width: 992px) {
  .tasks-list__item:hover {
    box-shadow: none;
  }
}
.tasks-list__item:not(:last-of-type) {
  margin-bottom: 12px;
}
.tasks-list__img {
  flex: 0 0 318px;
  height: 120px;
  border-radius: 12px;
}
.tasks-list__text {
  margin-top: 12px;
  margin-left: 48px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.task-text__title {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}
.task-text__desciption {
  font-family: "Droid-serif", sans-serif;
  font-size: 15px;
  color: var(--dark-grey);
  line-height: 1.2;
  margin-top: -8px;
}
.task-text__link {
  align-self: flex-end;
  font-size: 14px;
  text-transform: lowercase;
  display: flex;
}
.task-text__link-item {
  margin-left: 6px;
}
@media (max-width: 1024px) {
  .tasks-list {
    padding: 0;
  }
  .task-page__title {
    margin-bottom: 12px;
  }
}
@media (max-width: 992px) {
  .tasks-list__item {
    flex-direction: column;
  }
  .tasks-list__img {
    flex: none;
    margin-bottom: 12px;
    height: 96px;
  }
  .tasks-list__text {
    margin: 0;
    justify-content: flex-start;
  }
  .task-text__title {
    margin-bottom: 12px;
  }
  .task-text__desciption {
    margin-bottom: 6px;
    font-size: 13px;
  }
  .task-text__link {
    font-size: 12px;
  }
}
@media (max-width: 756px) {
  .task-page__title {
    text-align: center;
    font-size: 18px;
  }
  .task-text__title {
    font-size: 16px;
  }
}
</style>