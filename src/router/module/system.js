import { RouterSystem, RouterMsg, RouterFile } from 'blackbox-ui'

export const system = {
  path: '/system',
  meta: { title: '系统管理' },
  component: () => import('~/layout/AdminLayout/index.vue'),
  children: [...RouterSystem, ...RouterMsg, ...RouterFile],
}
