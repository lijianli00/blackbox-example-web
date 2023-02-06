import vue from '@vitejs/plugin-vue'

/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

import { unocss } from './unocss'
import { Visualizer } from './visualizer'
import { configHtmlPlugin } from './html'
// 打包进度条
import progress from 'vite-plugin-progress'
import { configComponents } from './componentsResolver'
import createSvgIconsPlugin from './svgIcons'

import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    unocss(),
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    Visualizer(),
    progress(),
    configComponents(),
    createSvgIconsPlugin,
    viteCommonjs(),
  ]

  return plugins
}
