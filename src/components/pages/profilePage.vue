<template>
  <inner-page>
    <div class="profile-page" v-if="!loadFail">
      <Load :show="loading" />
      <div
        class="profile-page__content"
        :class="{ 'profile-page__content_invisible': loading }"
      >
        <div class="profile-page__user-info user-info">
          <img
            class="user-info__img"
            src="@/assets/icons/user.svg"
            alt="Profile Image"
          />
          <div class="user-info__content">
            <h2 class="user-info__name">
              {{ name }}
            </h2>
            <p class="user-info__email">
              {{ email }}
            </p>
          </div>
        </div>
        <section class="profile-page__user-works user-works">
          <h3 class="user-works__title">{{ user_works_title }}</h3>
          <ul class="user-works__list">
            <li
              class="user-works__item"
              v-for="(workName, i) in worksNames"
              :key="workName"
            >
              <accordion :index="i" class="user-works__work work">
                <template v-slot:header> {{ workName }} </template>
                <div class="work__content">
                  <div class="work__grade-info grade-info">
                    <h4 class="grade-info__title">
                      {{ grade_info_title }}
                    </h4>
                    <p class="grade-info__current-band">
                      {{ current_band_text }}
                      <span>{{ getBand(workName) }}/10</span>
                    </p>
                    <p class="grade-info__tips">
                      {{ tips_text }}
                      <span
                        class="tips-use tips-use_y"
                        v-if="tipsUsed(workName)"
                      >
                        <i class="fa-solid fa-check" />
                      </span>
                      <span class="tips-use tips-use_n" v-else>
                        <i class="fa-solid fa-xmark" />
                      </span>
                    </p>
                  </div>
                  <div class="work__achievements achievements">
                    <h4 class="achievements__title">
                      {{ achievements_title }}
                    </h4>
                    <ul class="achievements__list">
                      <li
                        class="achievements__item"
                        v-for="achivement of getAchievements(workName)"
                        :key="achivement[1]"
                      >
                        <p class="achivements__achivement">
                          {{
                            getProfilePageText(
                              `${workName}_${achivement[0]}_skill`
                            )
                          }}
                          <span
                            class="achivement-status achivement-status_y"
                            v-if="achivement[1]"
                          >
                            <i class="fa-solid fa-check" />
                          </span>
                          <span
                            class="achivement-status achivement-status_n"
                            v-else
                          >
                            <i class="fa-solid fa-xmark" />
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </accordion>
            </li>
          </ul>
        </section>
        <section class="profile-page__stats stats">
          <h3 class="stats__title">
            {{ stats_title }}
          </h3>
          <p class="stats__description">
            {{ stats_description }}
          </p>
          <highcharts class="stats__graph" :options="chartOptions"></highcharts>
        </section>
      </div>
    </div>
    <load-fail class="profile-page__load-fail" v-else />
  </inner-page>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Accordion from "../layout/Accordion.vue";
import innerPage from "./innerPage.vue";
import { Chart } from "highcharts-vue";
import Load from "../layout/Load.vue";
import LoadFail from "../layout/loadFail.vue";

export default {
  components: { innerPage, Accordion, highcharts: Chart, Load, LoadFail },
  name: "profile-page",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      fetchProfile: "profile/fetchProfile",
      logout: "auth/logout",
    }),
    ...mapMutations({
      setLoadFail: "profile/setLoadFail",
    }),
    loadProfile() {
      this.loading = true;
      setTimeout(async () => {
        try {
          await this.fetchProfile();
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              this.logout();
            } else {
              this.setLoadFail(true);
            }
          } else {
            console.log(err);
          }
        } finally {
          this.loading = false;
        }
      }, 2000);
    },

    tipsUsed(work) {
      return this.getMaxBand(work) === 7;
    },
  },
  computed: {
    ...mapState({
      loadFail: (state) => state.profile.loadFail,
      email: (state) => state.profile.email,
      name: (state) => state.profile.name,
      group: (state) => state.profile.group,
    }),
    ...mapGetters({
      getProfilePageText: "langs/getProfilePageText",
      worksNames: "profile/worksNames",
      getBand: "profile/getBand",
      getMaxBand: "profile/getMaxBand",
      getLatestBands: "profile/getLatestBands",
      getAchievements: "profile/getAchievements",
      getCurrentGradeText: "langs/getCurrentBandText",
    }),

    chartOptions() {
      return {
        accessibility: { enabled: false },
        chart: {
          type: "spline",
        },
        title: {
          text: "",
        },
        yAxis: {
          title: {
            text: this.stats_axis,
            style: {
              "font-size": 12,
              "font-family": "Roboto",
            },
          },
          max: 10,
        },
        legend: {
          verticalAlign: "top",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 1,
          },
        },
        series: this.allLatestBands,
      };
    },

    user_works_title() {
      return this.getProfilePageText("user_works_title");
    },
    achievements_title() {
      return this.getProfilePageText("achievements_title");
    },
    stats_title() {
      return this.getProfilePageText("stats_title");
    },
    stats_description() {
      return this.getProfilePageText("stats_description");
    },
    stats_axis() {
      return this.getProfilePageText("stats_axis");
    },

    grade_info_title() {
      return this.getCurrentGradeText("title");
    },
    current_band_text() {
      return this.getCurrentGradeText("current_band_text");
    },
    tips_text() {
      return this.getCurrentGradeText("tips_text");
    },
    allLatestBands() {
      return this.worksNames.map((item) => ({
        name: item,
        data: this.getLatestBands(item),
      }));
    },
  },
  mounted() {
    this.loadProfile();
  },
};
</script>

<style scoped>
.profile-page {
  min-height: calc(100vh - 55px);
  position: relative;
}
.profile-page__content_invisible {
  visibility: hidden;
}
.user-info {
  display: flex;
}
.profile-page__user-info {
  margin-bottom: 24px;
}
.user-info__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user-info__img {
  width: 88px;
  margin-right: 24px;
}
.user-info__name {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.04em;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 6px;
}
.user-info__email {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: var(--dark-grey);
}
.user-works {
  margin-bottom: 36px;
}
.work__content {
  padding-bottom: 12px;
}
.user-works__title,
.stats__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
}
.user-works__title {
  margin-bottom: 12px;
}
.user-works__item:not(:last-child) {
  margin-bottom: 12px;
}
.work__grade-info {
  margin-bottom: 12px;
}
.grade-info__title,
.achievements__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 15.5px;
  margin-bottom: 6px;
}
.grade-info__current-band,
.achivements__achivement,
.grade-info__tips {
  font-family: "Roboto", sans-serif;
  color: var(--dark-grey);
  font-size: 15.5px;
}
.achievements__item:not(:last-child) {
  margin-bottom: 4px;
}
.grade-info__tips,
.achivements__achivement {
  display: flex;
  align-items: center;
}
.tips-use,
.achivement-status {
  margin-left: 6px;
}
.tips-use_y,
.achivement-status_y {
  color: var(--green);
}
.tips-use_n,
.achivement-status_n {
  color: var(--red);
}
.grade-info__current-band span {
  display: inline-block;
  background-color: rgba(var(--light-blue-rgb), 0.1);
  padding: 6px 8px 4px;
  border-radius: 12px;
  font-weight: 500;
  color: var(--light-blue);
}
.stats__title {
  margin-bottom: 6px;
}
.stats__description {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: var(--dark-grey);
}
.stats__graph {
  margin-top: 12px;
}
.profile-page__load-fail {
  margin: 60px 0;
}
@media (max-width: 1024px) {
  .profile-page__user-info {
    margin-bottom: 18px;
  }
  .user-info__img {
    width: 80px;
  }
  .user-works {
    margin-bottom: 18px;
  }
}
@media (max-width: 992px) {
  .user-info__img {
    margin-right: 12px;
  }
  .user-info__name {
    font-size: 28px;
  }
  .user-info__email {
    font-size: 16px;
  }
  .user-works__title,
  .stats__title {
    font-size: 18px;
    margin-bottom: 6px;
  }
}
@media (max-width: 756px) {
  .profile-page__user-info {
    margin-bottom: 12px;
  }
  .user-info__img  {
    width: 66px;
  }
  .user-info__name {
    font-size: 24px;
  }
  .work__grade-info {
    margin-bottom: 8px;
  }
  .work__content {
    padding-bottom: 0px;
  }
  .grade-info__title,
  .achievements__title {
    font-size: 15px;
    text-align: center;
  }
}
@media (max-width: 576px) {
  .user-info__img  {
    display: none;
  }
  .user-works__title,
  .stats__title {
    text-align: center;
  }
}
</style>

<style>
.highcharts-container {
  margin: 0 auto;
}
</style>