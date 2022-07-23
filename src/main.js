import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import '@fortawesome/fontawesome-free/js/all'
import { VueWindowSizePlugin } from 'vue-window-size/option-api';
import store from '@/store';
import VueCookies from 'vue-cookies'

const app = createApp(App);
app
    .use(router)
    .use(VueWindowSizePlugin)
    .use(store)
    .use(VueCookies)
    .mount('#app');
