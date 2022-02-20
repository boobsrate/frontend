import {createApp} from 'vue'
import App from './App.vue'

import vfmPlugin from 'vue-final-modal'
import VueCookies from 'vue3-cookies'

import router from "@/router";

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(vfmPlugin({
    key: '$vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer'
}))
app.mount('#app')