import axios from 'axios';

export const profileModule = {
    state: () => {
        return {
            email: '',
            name: '',
            group: '',
            works: null,
            loadFail: false,
        }
    },
    getters: {
        worksNames: (state) => {
            return (state.works) ? Object.keys(state.works) : [];
        },
        getBand: (state) => (work) => {
          return (state.works && state.works[work]) ? state.works[work].band : '';
        },
        getMaxBand: (state) => (work) => {
            return (state.works && state.works[work]) ? state.works[work].max_band : null;
        },
        getLatestBands: (state) => (work) => {
            return (state.works && state.works[work]) ? state.works[work].latest : [];
        },
        getAchievements: (state) => (work) => {
            return (state.works && state.works[work]) ? Object.entries(state.works[work].achievements) : [];
        },
    },
    mutations: {
        setEmail(state, email) {
            state.email = email;
        },
        setName(state, name) {
            state.name = name;
        },
        setGroup(state, group) {
            state.group = group;
        },
        setWorks(state, works) {
            state.works = works;
        },
        setLoadFail(state, bool) {
            state.loadFail = bool;
        }
    },
    actions: {
        async fetchProfile({ commit }) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/me`, {
                    withCredentials: true
                })
                commit('setEmail', response.data.email);
                commit('setName', response.data.name);
                commit('setGroup', response.data.group);
                commit('setWorks', response.data.works);
            }
            catch(err) {
                throw err;
            }
        },
        cleaner({ commit }) {
            commit('setEmail', '');
            commit('setName', '');
            commit('setGroup', '');
            commit('setWorks', null);
            commit('setLoadFail', false);
        }
    },
    namespaced: true
}