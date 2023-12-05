import { RouterCustomLayout, RouterBaseCustom } from 'blackbox-ui'
import { project } from '@/project/router'

export default [
  {
    path: '/',
    meta: {
      title: '布局',
      notAuth: true
    },
    component: () => import('../../layout/index.vue'),
    children: RouterCustomLayout
  },
  {
    path: '/login',
    meta: {
      title: '配置登录',
      notLogin: true
    },
    component: () => import('../../views/configLogin/index.vue')
  },
  {
    path: '/qcLogin',
    meta: { title: '公众号登录', notLogin: true },
    component: () => import('../../views/qcLogin/index.vue')
  },
  ...project,
  ...RouterBaseCustom
]
