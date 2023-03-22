const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          // 设置@/的意义
          '@': resolve('packages/src'),
          '~': resolve('')
        }
      }
    }
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}
