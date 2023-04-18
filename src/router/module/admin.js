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
        component: () => import('../../views/index/index.vue')
      }
    ]
  },
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('../../views/login/index.vue')
  },
  RouterError405,
  RouterError404
]
