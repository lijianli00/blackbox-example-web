import VueRouter from 'vue-router'
import routes from './module'
import Vue from 'vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

export function useRouter() {
  return router
}

export function useRoute() {
  return router.currentRoute
}

export default router
