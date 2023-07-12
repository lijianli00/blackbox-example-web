// 布局
import Layout from '@/blackbox/layout/index.vue'

/**
 * meta： {
 *  title： 页面标题
 *  notAuth： 不需要校验权限的页面
 *  notLogin： 不需要登录就能访问的页面
 * }
 */
export const demo = {
  path: '/project',
  meta: { title: '布局', notAuth: true },
  component: Layout,
  children: [
    {
      path: '/project/index',
      meta: { title: '首页', notAuth: true },
      component: () => import('@/project/views/system/index/index.vue')
    }
  ]
}

export const demoBlank = [
  {
    path: '/project/test',
    meta: { title: '测试', notLogin: true },
    component: () => import('@/project/views/system/login/index.vue')
  }
]
