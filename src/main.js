import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './index.css'
import router from './router'
import swalPlugin from './plugins/sweetalert2';
import tooltip from "@/assets/js/tooltip.js";
import "@/assets/css/tooltip.css";
import 'animate.css';

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(swalPlugin)
app.directive("tooltip", tooltip);

app.mount('#app')
