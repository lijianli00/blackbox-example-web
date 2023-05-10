import Layout from '../../layout/index.vue'
import {
  RouterSystem,
  RouterFile,
  RouterMsg,
  RouterLog,
  RouterWorkflow,
  RouterScheduler,
  RouterLogResponseCode,
  RouterPlatform
} from 'blackbox-ui'

export const system = {
  path: '/system',
  meta: { title: '布局' },
  component: Layout,
  children: [
    ...RouterSystem,
    ...RouterFile,
    ...RouterMsg,
    ...RouterLog,
    ...RouterWorkflow,
    ...RouterScheduler,
    RouterLogResponseCode
  ]
}

export const platform = {
  path: '/platform',
  meta: { title: '布局' },
  component: Layout,
  children: RouterPlatform
}
