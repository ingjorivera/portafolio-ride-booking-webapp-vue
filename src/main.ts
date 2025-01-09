import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import quasarIconSet from 'quasar/icon-set/fontawesome-v5'
import VueCookies from 'vue-cookies'

import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

import 'quasar/src/css/index.sass'
import '/src/assets/styles/fonts.css'
import '/src/assets/styles/icons.css'
import './style.css'

import App from './App.vue'
import router from './router'

import i18n from './i18n'

// Import stores
import { useAuthStore, useUiStore } from './store'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
console.log(isLocalhost, 'isLocalhost')

app.use(VueCookies, {
  expires: '7d',
  path: '/',
  domain: isLocalhost ? '' : '.drivania.com',
})

app.use(Quasar, {
  plugins: {
    Notify,
  },
  iconSet: quasarIconSet,
})

const authStore = useAuthStore()
const uiStore = useUiStore()

//check if user is logged in and if cookie is valid
authStore.initializeStore()
uiStore.getCountries(authStore.token)
uiStore.langSelected = 'en'

app.mount('#app')
