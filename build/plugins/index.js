import vue from '@vitejs/plugin-vue2'
import unocss from 'unocss/vite'
import progress from 'vite-plugin-progress'
import { splitVendorChunkPlugin } from 'vite'
// html title
import { configHtmlPlugin } from './html'
// rollup打包分析插件
import visualizer from 'rollup-plugin-visualizer'
// gzip压缩
import viteCompression from 'vite-plugin-compression'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    splitVendorChunkPlugin(),
    configHtmlPlugin(viteEnv, isBuild),
    progress(),
    unocss(),
    viteCompression({
      threshold: 10240 // 对大于 10kb 的文件进行压缩
    })
  ]

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    )
  }

  return plugins
}
