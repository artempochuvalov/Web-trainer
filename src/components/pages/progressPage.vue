<template>
  <inner-page>
    <div class="progress-page" v-if="!loadFail">
      <load :show="loading" />
      <div
        class="progress-page__content"
        :class="{ 'progress-page__content_invisible': loading }"
      >
        <h2 class="progress-page__title">{{ progress_page_title }}</h2>
        <h3 class="progress-page__subtitle">{{ progress_page_subtitle }}</h3>
        <Multiselect
          class="progress-page__multiselect"
          ref="groupsMultiselect"
          v-model="selectedGroups"
          :hideSelected="false"
          :placeholder="progress_page_placeholder"
          :mode="'tags'"
          :options="groups"
          maxHeight="300"
          @select="handleSelect"
        />
        <ag-grid-vue
          class="progress-page__table ag-theme-alpine"
          v-if="selectedGroups.length || loading"
          @grid-ready="onGridReady"
          :defaultColDef="defaultColDef"
          :columnDefs="columnDefs"
          :rowData="rowData"
        >
        </ag-grid-vue>
      </div>
    </div>
    <load-fail class="progress-page__load-fail" v-else />
  </inner-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import innerPage from "./innerPage.vue";
import Load from "../layout/Load.vue";
import LoadFail from "../layout/loadFail.vue";

export default {
  components: { innerPage, Multiselect, AgGridVue, Load, LoadFail },
  name: "progress-page",
  data() {
    return {
      loading: false,
      loadFail: false,

      selectedGroups: [],
      groups: [],
      columnDefs: null,
      rowData: null,
      gridApi: null,
      gridColumnApi: null,
      defaultColDef: {
        lockPosition: true,
        flex: 3,
      },
    };
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    fetchGroups() {
      this.loading = true;
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/groups`,
            {
              withCredentials: true,
            }
          );
          this.groups = ["Все", ...response.data];
          this.selectedGroups = this.groups.slice(1);
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              this.logout();
            } else {
              this.loadFail = true;
            }
          } else {
            console.log(err);
          }
        } finally {
          this.loading = false;
        }
      }, 2000);
    },
    fetchProgress() {
      this.loading = true;
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/progress`,
            {
              withCredentials: true,
              params: {
                groups: this.selectedGroups.reduce((f, s) => `${f},${s}`, ""),
              },
            }
          );
          this.columnDefs = [
            {
              field: "ФИО",
              sortable: true,
              unSortIcon: false,
              flex: 5,
              minWidth: 250,
            },
            {
              field: "Группа",
              sortable: true,
              unSortIcon: true,
              flex: 4,
              minWidth: 100,
            },
            { field: "OSPF", minWidth: 75 },
            { field: "RIP", minWidth: 75 },
            { field: "STP", minWidth: 75 },
          ];
          if (response.data !== null) {
            this.rowData = response.data.map((item) => {
              return {
                ФИО: item.name,
                Группа: item.group,
                OSPF: item.works.ospf.band,
                RIP: item.works.rip.band,
                STP: item.works.stp.band,
              };
            });
          } else {
            this.rowData = null;
          }
        } catch (err) {
          if (err.response) {
            if (err.response.status === 401) {
              this.logout();
            } else {
              this.loadFail = true;
            }
          } else {
            console.log(err);
          }
        } finally {
          this.loading = false;
        }
      }, 500);
    },

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.setDomLayout("autoHeight");
    },
    handleSelect(evt) {
      if (evt.toLowerCase() === "all" || evt.toLowerCase() === "все") {
        this.$refs.groupsMultiselect.remove(evt);
        this.selectedGroups = this.groups.slice(1);
      }
    },
  },
  computed: {
    ...mapGetters({
      getPogressPageText: "langs/getPogressPageText",
    }),

    progress_page_title() {
      return this.getPogressPageText("progress_page_title");
    },
    progress_page_subtitle() {
      return this.getPogressPageText("progress_page_subtitle");
    },
    progress_page_placeholder() {
      return this.getPogressPageText("progress_page_placeholder");
    }
  },
  watch: {
    selectedGroups: {
      handler() {
        this.fetchProgress();
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchGroups();
  },
};
</script>

<style scoped>
.progress-page {
  position: relative;
}
.progress-page__content_invisible {
  visibility: hidden;
}
.progress-page__title {
  color: var(--dark);
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 18px;
}
.progress-page__subtitle {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-grey);
  margin-bottom: 4px;
}
.progress-page__multiselect {
  --ms-tag-bg: var(--light-grey);
  --ms-tag-color: var(--light-blue);
  --ms-option-bg-selected: var(--blue);
  --ms-option-bg-selected-pointed: var(--blue);
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
}
.progress-page__table {
  margin-top: 54px;
  box-shadow: 0 2px 7px 0 var(--grey), 3px 27px 54px -34px var(--grey);
}
.progress-page__load-fail {
  margin: 60px 0;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>