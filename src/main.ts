import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Dialog, Notify, Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Quasar, {
  // import Quasar plugins and add here
  plugins: {
    Dialog, // doesn't appear to support default settings
    Notify,
  },
  config: {
    dark: true,
    // brand: {
    //   // primary: '#e46262',
    //   // ... or all other brand colors
    // },
    // notify: {...}, // default set of options for Notify Quasar plugin
    // loading: {...}, // default set of options for Loading Quasar plugin
    // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // // ..and many more (check Installation card on each Quasar component/directive/plugin)
  },
})

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')
