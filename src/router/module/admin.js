import { RouterError404, RouterError405 } from 'blackbox-ui'

export const admin = {
  path: '/',
  meta: { title: '布局', notAuth: true },
  component: () => import('~/layout/AdminLayout/index.vue'),
  children: [
    {
      path: '/workbench',
      meta: { title: '首页' },
      component: () => import('~/views/index/index.vue'),
    },
    RouterError405,
  ],
}

export const blank = {
  path: '/',
  meta: { title: '空白布局' },
  component: () => import('~/layout/BlankLayout/index.vue'),
  children: [
    {
      path: '/login',
      meta: { title: '登录', notLogin: true },
      component: () => import('~/views/login/index.vue'),
    },
    // error500,
    // error405,
    RouterError404,
  ],
}
