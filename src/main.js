import {createApp} from 'vue'
import App from './App.vue'

import router from "@/router";
import vfmPlugin from 'vue-final-modal'
import VueCookies from 'vue3-cookies'

const app = createApp(App)

app.use(router)
app.use(vfmPlugin)
app.use(VueCookies)
app.config.unwrapInjectedRef = true

app.mount('#app')
