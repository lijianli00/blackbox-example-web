import Layout from '../../layout/index.vue'
import { RouterError404, RouterError405, RouterSystem } from 'blackbox-ui'
console.log(333, RouterSystem)
export const sys = [
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('../../views/login/index.vue')
  },
  {
    path: '/',
    meta: { title: '布局' },
    component: Layout,
    children: [
      {
        path: '/index',
        meta: { title: '首页' },
        component: () => import('../../views/index/index.vue')
      },
      ...RouterSystem
    ]
  },
  RouterError405,
  RouterError404
]
