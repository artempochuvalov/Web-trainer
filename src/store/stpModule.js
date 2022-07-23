import axios from 'axios';

export const stpModule = {
    state: () => {
        return {
            loading: false,
            loadFail: false,
            taskVisible: false,
            shouldBeRotated: false,

            connections: [],
            switches: [],

            deletedLinks: new Set(),
            root: null,

            connectionsTip: false,
            rootTip: false,
            tipsNotAcceptable: false,

            isFilled: true,
        }
    },
    getters: {
        connectionsSize: (state) => {
            return state.connections.length;
        },
        switchesWithIndexes: (state) => {
            return state.switches.map((item, index) => ({
                index, ...item
            }));
        },
        preparedConnections: (state) => {
            const preparedConnections = state.connections.map(
                function func(item) {
                    if (Array.isArray(item)) {
                        return item.map(func);
                    }
                    return item;
                });

            for (let [deletedLink] of state.deletedLinks.entries()) {
                const [from, to] = deletedLink.split(',').map(item => parseInt(item));
                preparedConnections[from][to] = 0;
                preparedConnections[to][from] = 0;
            }

            return preparedConnections;
        },
        solution: (state, getters) => {
            const connections = getters.preparedConnections;
            const root = +(state.root);
            return {
                connections,
                root,
            }
        },

        isRootFilled: (state) => {
            return state.root !== null && state.roout !== "";
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

        setConnections(state, connections) {
            state.connections = connections;
        },
        setSwitches(state, switches) {
            state.switches = switches;
        },

        addDeletedLink(state, link) {
            state.deletedLinks.add(link);
        },
        restoreDeletedLink(state, link) {
            state.deletedLinks.delete(link);
        },
        setDeletedLinks(state, deletedLinks) {
            state.deletedLinks = deletedLinks;
        },
        setRoot(state, root) {
            state.root = root;
        },

        setRootTip(state, bool) {
            state.rootTip = bool;
        },
        setConnectionsTip(state, bool) {
            state.connectionsTip = bool;
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
                        work: "stp",
                    }
                });

                const { connections, switches } = response.data;
                commit("setConnections", connections);
                commit("setSwitches", switches);
            }
            catch (err) {
                throw err;
            }
        },
        async postSolution({ getters, commit }) {
            try {
                commit("setIsFilled", true);
                if (getters.isRootFilled) {
                    const solution = await getters.solution;
                    axios.defaults.withCredentials = true;
                    const response = await axios.post(
                        `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/grade?work=stp`, {
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
                        work: 'stp',
                    },
                    withCredentials: true,
                }
                )
                commit("setConnectionsTip", !response.data.correct_tree.status);
                commit("setRootTip", !response.data.correct_root.status);
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
            commit("setConnections", []);
            commit("setSwitches", []);
            commit("setRoot", null);
            commit("setDeletedLinks", new Set());
            commit("setConnectionsTip", false);
            commit("setRootTip", false);
            commit("setTipsNotAcceptable", false);
            commit("setIsFilled", true);
        }
    },
    namespaced: true,
}