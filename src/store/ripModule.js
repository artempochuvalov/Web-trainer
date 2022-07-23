import axios from 'axios';

export const ripModule = {
    state: () => {
        return {
            loading: false,
            loadFail: false,
            taskVisible: false,
            shouldBeRotated: false,

            connections: null,
            path: {
                router: null,
                subnet: null,
            },
            router: null,

            route: [],
            table: [],

            tableTips: {
                copied_vectors: false,
                correct_length: true,
                incorrect_vectors: [],
                status: true,
            },
            routeTip: false,
            tipsNotAcceptable: false,

            isFilled: true,
        }
    },
    getters: {
        routersNumber: (state) => {
            if (state.connections !== null) {
                return state.connections.length;
            }

            return 0;
        },
        subnetsNumber: (state) => {
            if (state.connections !== null) {
                return state.connections[0].length;
            }

            return 0;
        },

        preparedTable: (state) => {
            return state.table.map(item => {
                return {
                    subnet: +(item.subnet),
                    router: +(item.router),
                    distance: +(item.distance)
                }
            });
        },
        preparedRoute: (state) => {
            return [state.path.router, ...state.route.map(item => +(item.node))];
        },

        solution: (state, getters) => {
            const table = getters.preparedTable;
            const route = getters.preparedRoute;
            return {
                table,
                route,
            }
        },

        isTableFilled: (state) => {
            return state.table.every((item) =>
                item.subnet !== null && item.subnet !== "" &&
                item.router !== null && item.router !== "" &&
                item.distance !== null && item.distance !== ""
            );
        },
        isRouteFilled: (state) => {
            return state.route.every((item) => item.node !== null && item.node !== "");
        },
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

        setConnections(state, connections) {
            state.connections = connections;
        },
        setPath(state, { router, subnet }) {
            state.path.router = router;
            state.path.subnet = subnet;
        },
        setRouter(state, router) {
            state.router = router;
        },

        setRoute(state, paths) {
            state.route = paths;
        },
        setTable(state, table) {
            state.table = table;
        },

        setTableTips(state, { copied_vectors, correct_length, incorrect_vectors, status }) {
            state.tableTips.copied_vectors = copied_vectors;
            state.tableTips.correct_length = correct_length;
            state.tableTips.incorrect_vectors = incorrect_vectors;
            state.tableTips.status = status;
        },
        setRouteTip(state, bool) {
            state.routeTip = bool;
        },
        setTipsNotAcceptable(state, bool) {
            state.tipsNotAcceptable = bool;
        },

        setIsFilled(state, bool) {
            state.isFilled = bool;
        },
    },
    actions: {
        async fetchTask({ commit }) {
            try {
                const response = await axios.get(
                    `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/generate`, {
                    withCredentials: true,
                    params: {
                        work: "rip",
                    }
                });

                const { connections, path, router } = response.data;
                commit("setConnections", connections);
                commit("setPath", path);
                commit("setRouter", router);
            }
            catch (err) {
                throw err;
            }
        },
        async postSolution({ commit, getters }) {
            try {
                commit("setIsFilled", true);
                if (getters.isTableFilled && getters.isRouteFilled) {
                    const solution = await getters.solution;
                    axios.defaults.withCredentials = true;
                    const response = await axios.post(
                        `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/grade?work=rip`, {
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
                    params: {
                        work: 'rip',
                    },
                    withCredentials: true,
                });
                commit("setTableTips", response.data.table);
                commit("setRouteTip", !response.data.route.status);
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
            commit("setConnections", null);
            commit("setPath", {
                router: null,
                subnet: null,
            })
            commit("setRouter", null);
            commit("setRoute", []);
            commit("setTable", []);
            commit("setTableTips", {
                copied_vectors: false,
                correct_length: true,
                incorrect_vectors: [],
                status: true,
            })
            commit("setRouteTip", false);
            commit("setTipsNotAcceptable", false);
            commit("setIsFilled", true);
        }
    },
    namespaced: true,
}