import { createApp } from 'vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from './router'
import {$lastingDataOpen} from "@/vue-save-status.es.js"

$lastingDataOpen('local')

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
})

createApp(App).use(router).use(vuetify).mount('#app')
