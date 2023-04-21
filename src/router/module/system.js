import Layout from '../../layout/index.vue'
import { RouterSystem, RouterPlatform } from 'blackbox-ui'

export const system = {
  path: '/system',
  meta: { title: '系统管理' },
  component: Layout,
  children: [...RouterSystem]
}

export const platform = {
  path: '/platform',
  meta: { title: '平台管理' },
  component: Layout,
  children: [...RouterPlatform]
}
