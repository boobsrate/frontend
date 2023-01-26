import {createApp} from 'vue'
import App from './App.vue'

import router from "@/router";
import vfmPlugin from 'vue-final-modal'
import VueCookies from 'vue3-cookies'
import VueNativeSock from 'vue-native-websocket-vue3'

const app = createApp(App)

app.use(router)
app.use(vfmPlugin)
app.use(VueCookies)

app.use(VueNativeSock, "wss://" + process.env.VUE_APP_WS_URL + "/api/ws", {
    reconnection: true,
    reconnectionDelay: 3000,
})

app.mount('#app')
