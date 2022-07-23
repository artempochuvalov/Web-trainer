import axios from 'axios';

export const ospfModule = {
    state: () => {
        return {
            loading: false,
            loadFail: false,
            taskVisible: false,
            shouldBeRotated: false,

            ref_bandwidth: 0,
            path: [],
            bandwidths: null,

            metrics: new Map(),
            route: [],

            weightsTips: null,
            routeTip: false,
            tipsNotAcceptable: false,

            isFilled: true,
        }
    },
    getters: {
        metricsSize: (state) => {
            if (state.bandwidths !== null) {
                return state.bandwidths.length;
            }

            return 0;
        },
        edgesNumber: (state, getters) => {
            let edgesDoubleNumber = 0;
            for (let i = 0; i < getters.metricsSize; ++i) {
                for (let j = 0; j < getters.metricsSize; ++j) {
                    if (state.bandwidths[i][j] !== 0) {
                        edgesDoubleNumber++;
                    }
                }
            }

            return Math.floor(edgesDoubleNumber / 2);
        },
        bytesConverter: () => (bandwidth) => {
            if (bandwidth < 1e3) {
                return `${bandwidth} Bs`;
            } else if (bandwidth >= 1e3 && bandwidth < 1e6) {
                return `${bandwidth / 1e3} Kbs`;
            } else if (bandwidth >= 1e6 && bandwidth < 1e9) {
                return `${bandwidth / 1e6} Mbs`;
            } else if (bandwidth >= 1e9) {
                return `${bandwidth / 1e9} Gbs`;
            }
        },

        bandwidthsWithIndexes: (state) => {
            const bandwidthsWithIndexes = [];

            if (state.bandwidths !== null) {
                for (let i = 0; i < state.bandwidths.length; ++i) {
                    for (let j = i; j < state.bandwidths.length; ++j) {
                        if (state.bandwidths[i][j] !== 0) {
                            bandwidthsWithIndexes.push({
                                from: i,
                                to: j,
                                bandwidth: state.bandwidths[i][j],
                                index: bandwidthsWithIndexes.length,
                            });
                        }
                    }
                }
            }

            return bandwidthsWithIndexes;
        },

        preparedMetrics: (state, getters) => {
            let preparedMetrics = [];
            for (let i = 0; i < getters.metricsSize; ++i) {
                preparedMetrics.push(new Array(getters.metricsSize));
                for (let j = 0; j < getters.metricsSize; ++j) {
                    preparedMetrics[i][j] = 0;
                }
            }
            for (let [edge, weight] of state.metrics.entries()) {
                preparedMetrics
                [+(edge.split(',')[0])]
                [+(edge.split(',')[1])] = +(weight);
                preparedMetrics
                [+(edge.split(',')[1])]
                [+(edge.split(',')[0])] = +(weight);
            }

            return preparedMetrics;
        },
        preparedRoute: (state) => {
            return [state.path[0], ...state.route.map(item => +(item.node)), state.path[1]];
        },
        solution: (state, getters) => {
            const metrics = getters.preparedMetrics;
            const route = getters.preparedRoute;
            return {
                metrics,
                route,
            }
        },

        areMetricsFilled: (state, getters) => {
            return state.metrics.size === getters.edgesNumber;
        },
        isRouteFilled: (state) => {
            return state.route.every((item) => item.node !== null && item.node !== "");
        }
    },
    mutations: {
        setLoading(state, bool) {
            state.loading = bool;
        },
        setLoadFail(state, bool) {
            state.loadFail = bool;
        },
        setTaskVisible(state, bool) {
            state.taskVisible = bool;
        },
        setShouldBeRotated(state, bool) {
            state.shouldBeRotated = bool;
        },

        setRefBandwidth(state, ref_bandwidth) {
            state.ref_bandwidth = ref_bandwidth;
        },
        setPath(state, path) {
            state.path = path;
        },
        setBandwidths(state, bandwidths) {
            state.bandwidths = bandwidths;
        },

        pushMetric(state, metric) {
            state.metrics.set(...(Object.entries(metric)[0]));
        },
        setMetrics(state, metrics) {
            state.metrics = metrics;
        },
        setRoute(state, route) {
            state.route = route;
        },

        setWeightsTips(state, weightsTips) {
            state.weightsTips = weightsTips;
        },
        setRouteTip(state, bool) {
            state.routeTip = bool;
        },

        setTipsNotAcceptable(state, bool) {
            state.tipsNotAcceptable = bool;
        },

        setIsFilled(state, bool) {
            state.isFilled = bool;
        }
    },
    actions: {
        async fetchTask({ commit }) {
            try {
                const response = await axios.get(
                    `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/generate`, {
                    withCredentials: true,
                    params: {
                        work: "ospf",
                    }
                });
                const { ref_bandwidth, path, bandwidths } = response.data;
                commit("setRefBandwidth", ref_bandwidth);
                commit("setPath", path);
                commit("setBandwidths", bandwidths);
            }
            catch (err) {
                throw err;
            }
        },
        async postSolution({ getters, commit }) {
            try {
                commit("setIsFilled", true);
                if (getters.areMetricsFilled && getters.isRouteFilled) {
                    const solution = await getters.solution;
                    axios.defaults.withCredentials = true;
                    const response = await axios.post(`${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/grade?work=ospf`, {
                        "solution": solution,
                    });

                    return response;
                }
                commit("setIsFilled", false);
            } catch (err) {
                throw err;
            }
        },
        async fetchTips({ commit }) {
            try {
                const response = await axios.get(
                    `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/tips`, {
                    withCredentials: true,
                    params: {
                        work: 'ospf',
                    },
                });
                commit('setWeightsTips', response.data.metric.incorrect_links);
                commit('setRouteTip', !response.data.route.status);
            }
            catch (err) {
                throw err;
            }
        },
        cleaner({ commit }) {
            commit("setLoading", false,);
            commit("setLoadFail", false);
            commit("setTaskVisible", false);
            commit("setShouldBeRotated", false);
            commit("setRefBandwidth", 0);
            commit("setPath", []);
            commit("setBandwidths", null);
            commit("setMetrics", new Map());
            commit("setRoute", []);
            commit("setWeightsTips", null);
            commit("setRouteTip", false);
            commit("setTipsNotAcceptable", false);
            commit("setIsFilled", true);
        }
    },
    namespaced: true,
}