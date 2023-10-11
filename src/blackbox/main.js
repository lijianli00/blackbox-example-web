import Vue from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

import ElementUI from 'element-ui'
import BlackboxUI from 'blackbox-ui'
import 'blackbox-ui/es/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import './utils/http.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(BlackboxUI, router, store)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
