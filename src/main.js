import { createApp } from 'vue'
import 'blackbox-ui/es/style.css'
import 'uno.css'
import { setupPinia } from './store'
import { setupRouter, router } from './router'
import { setupBlackbox } from 'blackbox-ui'
import App from './app.vue'
import 'virtual:svg-icons-register'

const app = createApp(App)
setupPinia(app)
setupRouter(app)
setupBlackbox(app, router)
app.mount('#app')
