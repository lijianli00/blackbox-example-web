import vue from '@vitejs/plugin-vue2'
import unocss from 'unocss/vite'
import { splitVendorChunkPlugin } from 'vite'
// html title
import { configHtmlPlugin } from './html'
export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [vue(), splitVendorChunkPlugin(), configHtmlPlugin(viteEnv, isBuild), unocss()]

  return plugins
}
