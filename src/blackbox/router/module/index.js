import { RouterBlackbox } from 'blackbox-ui'
import { project } from '@/project/router'

export default [
  {
    path: '/login',
    meta: { title: '登录', notLogin: true },
    component: () => import('../../views/login/index.vue')
  },
  {
    path: '/ztLogin',
    meta: { title: '重定向', notLogin: true },
    component: () => import('../../views/ztLogin/index.vue')
  },
  {
    path: '/qcLogin',
    meta: { title: '公众号登录', notLogin: true },
    component: () => import('../../views/qcLogin/index.vue')
  },
  ...project,
  ...RouterBlackbox // 一定要放在最后面
]
