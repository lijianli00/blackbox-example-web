// rollup打包分析插件
import visualizer from 'rollup-plugin-visualizer'

export function Visualizer() {
  return visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
  })
}
