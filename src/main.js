import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './index.css'
import router from './router'
import swalPlugin from './plugins/sweetalert2';


const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(swalPlugin);

app.mount('#app')
