import vue from '@vitejs/plugin-vue2'
// import Components from 'unplugin-vue-components/vite'

import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { splitVendorChunkPlugin } from 'vite'
// import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

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
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()]
    })
  ]

  return plugins
}
