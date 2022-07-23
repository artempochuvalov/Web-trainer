import cookie from 'vue-cookies';
import router from '../router/router.js';

export const authModule = {
    state: () => {
        return {
            cookie: cookie.get('token')
        }
    },
    mutations: {
        setCookie(state, cookie) {
            state.cookie = cookie;
        }
    },
    actions: {
        login({ commit }) {
            window.location.href = `${process.env.VUE_APP_IP}${process.env.VUE_APP_BACKEND_PREFIX}/auth-redirect`;
            commit('setCookie', cookie.get('token'));
        },
        logout({commit, dispatch}) {
            dispatch('profile/cleaner', null, { root: true });
            cookie.remove('token');
            commit('setCookie', null);
            router.push('/login');
        },
    }, 
    namespaced: true
}