import { RouterError404, RouterError405 } from 'blackbox-ui'
import Layout from '../../layout/index.vue'

export const admin = [
  {
    path: '/',
    meta: { title: '布局' },
    component: Layout,
    children: [
      {
        path: '/',
        meta: { title: '首页' },
        component: () => import('../../views/system/index/index.vue')
      }
    ]
  },
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('../../views/system/login/index.vue')
  },
  {
    path: '/ztLogin',
    meta: { title: '第三方授权登录' },
    component: () => import('../../views/system/ztLogin/index.vue')
  },
  RouterError405,
  RouterError404
]
