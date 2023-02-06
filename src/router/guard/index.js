import { createPermissionGuard, createPageLoadingGuard, createPageTitleGuard } from 'blackbox-ui'

export function setupRouterGuard(router) {
  createPermissionGuard(router)
  createPageLoadingGuard(router)
  createPageTitleGuard(router)
}
