import {
  RouterError404,
  RouterError405,
  RouterErrorDisable,
  RouterPlatformUnit,
  RouterPlatformPerson,
  RouterPlatformAuth
} from 'blackbox-ui'

import Layout from '../../layout/index.vue'

export const admin = [
  {
    path: '/',
    meta: { title: '布局', notAuth: true },
    component: Layout,
    children: [
      {
        path: '/index',
        meta: { title: '首页' },
        component: () => import('../../views/system/index/index.vue')
      },
      RouterPlatformUnit,
      RouterPlatformPerson,
      RouterPlatformAuth
    ]
  },
  {
    path: '/login',
    meta: { title: '登录', notLogin: true },
    component: () => import('../../views/system/login/index.vue')
  },
  {
    path: '/ztLogin',
    meta: { title: '第三方授权登录' },
    component: () => import('../../views/system/ztLogin/index.vue')
  },
  RouterErrorDisable,
  RouterError405,
  RouterError404
]
