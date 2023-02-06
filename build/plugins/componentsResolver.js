/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export function configComponents() {
  return Components({
    dts: true,
    extensions: ['vue', 'js'],
    dirs: [], // 按需加载的文件夹
    resolvers: [NaiveUiResolver()],
  })
}
