import { createRouter, createWebHistory } from 'vue-router'
import routes from './module'
import { setupRouterGuard } from './guard'

export const router = createRouter({
  // history: createWebHashHistory('/'),
  history: createWebHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app) {
  app.use(router)
  setupRouterGuard(router)
}
