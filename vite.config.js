import { defineConfig, loadEnv } from 'vite'
import { getSrcPath, createVitePlugins, wrapperEnv, createProxy } from './build'

export default defineConfig(({ command, mode }) => {
  const rootPath = getSrcPath()
  const srcPath = getSrcPath()
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  const isBuild = command === 'build'

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    base: VITE_PUBLIC_PATH || './',
    resolve: {
      // 设置别名
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    server: {
      host: '0.0.0.0', // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT, // 端口
      proxy: createProxy(VITE_PROXY), // 代理
    },
  }
})
