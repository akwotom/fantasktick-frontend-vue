import './assets/main.css'

// import Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import strings from './stores/strings'

const app = createApp(App)

app.use(createPinia()).use(router).use(createVfm()).mount('#app')

strings().setLang(
    strings().getLang()
)
