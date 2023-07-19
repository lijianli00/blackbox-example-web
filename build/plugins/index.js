import vue from '@vitejs/plugin-vue2'
// import Components from 'unplugin-vue-components/vite'
// import { visualizer } from "rollup-plugin-visualizer";
// import commonjs from '@rollup/plugin-commonjs'

import { unocss } from './unocss'
// import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { splitVendorChunkPlugin } from 'vite'
// import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
// import requireTransform from 'vite-plugin-require-transform'

// html title
import { configHtmlPlugin } from './html'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    splitVendorChunkPlugin(),
    configHtmlPlugin(viteEnv, isBuild),
    // Components({
    //   resolvers: [ElementUiResolver()]
    // }),
    // Unocss
    // requireTransform({
    //   fileRegex: /.js$|.jsx$ | .vue$/
    // }),
    unocss()
    // commonjs()
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // })
  ]

  return plugins
}
