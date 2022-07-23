export const navMenuModule = {
    state: () => {
        return {
            MENU_WIDTH : 272,
            MENU_WIDTH_COLLAPSED : 72,
            collapsed: false,
        }
    },
    getters: {
        menuWidth : (state) => {
            return `${state.collapsed ? state.MENU_WIDTH_COLLAPSED : state.MENU_WIDTH}px`
        },
    },
    mutations: {
        setCollapsed(state, bool) {
            state.collapsed = bool;
        }
    },
    actions: {
        async toggleMenu({state, commit}) {
            commit('setCollapsed', !state.collapsed);
        }
    },
    namespaced: true
}