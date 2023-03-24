import Layout from '../../layout/index.vue'
import { RouterSystem } from 'blackbox-ui'

export const system = {
  path: '/system',
  meta: { title: '布局' },
  component: Layout,
  children: [...RouterSystem]
}
