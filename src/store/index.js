import { setupStore } from 'blackbox-ui'
import { router } from '../router'

export function setupPinia(app) {
  setupStore(app, import.meta.env, router)
}
