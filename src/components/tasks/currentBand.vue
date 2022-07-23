<template>
  <div class="current-band" v-if="!loadFail">
    <div class="current-band__content">
      <h4 class="current-band__title">{{ title }}</h4>
      <div class="current-band__info info">
        <div class="info__content">
          <p class="info__band">
            {{ current_band_text }}
            <span> {{ band }}/10 </span>
          </p>
          <p class="info__tips">
            {{ tips_text }}
            <span class="tips-use tips-use_y" v-if="tipsUsed">
              <i class="fa-solid fa-check" />
            </span>
            <span class="tips-use tips-use_n" v-if="!tipsUsed">
              <i class="fa-solid fa-xmark" />
            </span>
          </p>
        </div>
        <Info class="info__extra-info">
          <p class="info__extra-info-paragraph">
            {{ definition }}
          </p>
          <p class="info__extra-info-paragraph">
            {{ max_band_text }}: <span>{{ max_band }}</span>
          </p>
        </Info>
      </div>
      <p class="current-band__profile">
        <Link :to="'/profile'">
          {{ profile_link }}
          <i class="fa-solid fa-arrow-right-long" />
        </Link>
      </p>
    </div>
    <div class="current-band__img"></div>
  </div>
  <load-fail class="current-band__load-fail" v-else />
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import Info from "../layout/Info.vue";
import Link from "../layout/Link.vue";
import LoadFail from "../layout/loadFail.vue";

export default {
  components: { Link, Info, LoadFail },
  name: "current-band",
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
    ...mapMutations({
      setLoadFail: "profile/setLoadFail",
    }),

    async fetchBandsInfo() {
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
      }
    },
  },
  computed: {
    ...mapState({
      loadFail: (state) => state.profile.loadFail,
    }),
    ...mapGetters({
      getBand: "profile/getBand",
      getMaxBand: "profile/getMaxBand",
      getCurrentGradeText: "langs/getCurrentBandText",
    }),
    band() {
      return this.getBand(this.work);
    },
    max_band() {
      return this.getMaxBand(this.work);
    },
    tipsUsed() {
      return this.getMaxBand(this.work) === 7;
    },

    title() {
      return this.getCurrentGradeText("title");
    },
    current_band_text() {
      return this.getCurrentGradeText("current_band_text");
    },
    tips_text() {
      return this.getCurrentGradeText("tips_text");
    },
    profile_link() {
      return this.getCurrentGradeText("profile_link");
    },
    load_fail_text() {
      return this.getCurrentGradeText("load_fail_text");
    },
    definition() {
      return this.getCurrentGradeText("definition");
    },
    max_band_text() {
      return this.getCurrentGradeText("max_band_text");
    },
  },
  mounted() {
    this.fetchBandsInfo();
  },
};
</script>

<style scoped>
.current-band {
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
  max-width: 420px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.current-band__img {
  flex: 0 0 132px;
  background-color: var(--dark-blue);
  background-image: url("../../assets/images/grades.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50%;
  border-radius: 8px 0 0 8px;
  min-height: 108px;
}
.current-band__content {
  flex: 1 1 auto;
  padding: 12px;
  display: grid;
}
.current-band__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 15px;
}
.current-band__info,
.current-band__fail {
  align-self: center;
}
.info {
  display: flex;
  justify-content: space-between;
}
.info__band,
.info__tips {
  font-family: "Roboto", sans-serif;
  color: var(--dark-grey);
  font-size: 15px;
}
.info__tips {
  margin-top: -4px;
}
.info__extra-info {
  align-self: center;
}
.info__extra-info-paragraph:not(:last-of-type) {
  margin-bottom: 6px;
}
.info__extra-info-paragraph span {
  display: inline-block;
  background-color: rgba(var(--light-blue-rgb), 0.2);
  color: var(--light-blue);
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 8px;
}
.info__band span {
  display: inline-block;
  background-color: rgba(var(--light-blue-rgb), 0.1);
  padding: 6px 8px 4px;
  border-radius: 12px;
  font-weight: 500;
  color: var(--light-blue);
}
.current-band__profile {
  align-self: end;
  justify-self: end;
  font-size: 14px;
}
.tips-use_y {
  color: var(--green);
}
.tips-use_n {
  color: var(--red);
}
@media (max-width: 756px) {
  .current-band {
    flex-direction: column-reverse;
    max-width: 325px;
    justify-content: stretch;
  }
  .current-band__img {
    min-height: 0;
    flex: 0 0 96px;
    background-size: 22%;
    border-radius: 8px 8px 0 0;
  }
  .current-band__title {
    margin-bottom: 6px;
  }
  .info__tips {
    margin-top: -2px;
  }
  .current-band__info {
    margin-bottom: 6px;
  }
}
</style>