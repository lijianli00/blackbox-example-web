/**
 * meta： {
 *  title： 页面标题
 *  notAuth： 不需要校验权限的页面
 *  notLogin： 不需要登录就能访问的页面
 * }
 */
export const base = [
  {
    path: '/222',
    meta: { title: '基础待办', notLogin: true },
    component: () => import('@/project/views/system/ztLogin/index.vue')
  }
]
