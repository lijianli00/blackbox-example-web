## 脚手架说明

### 切换地址源

脚手架是基于`blackbox-ui`包的基础上进行搭建的，`blackbox-ui`发布在公司的`http://192.168.0.221:4873/`环境上，所以需要先将地址源切换成`hhh`

- 安装`nrm`

  ```
  npm install -g nrm
  ```

- 查看源地址

  ```
  nrm ls
  ```

- 添加新的源地址

  ```
  nrm add hhh http://192.168.0.221:4873/
  ```

- 切换源地址

  ```
  nrm use hhh
  ```

- 删除源地址

  ```
  nrm del hhh
  ```



### 基础命令

推荐使用pnpm进行包的统一管理

- 安装pnpm

  ```
  npm install -g pnpm
  ```

- 下载依赖

  ```
  pnpm install
  ```

- 启动项目

  ```
  pnpm dev
  ```

- 打包

  ```
  pnpm build
  ```



### 目录结构

为了兼容一体化项目项目结构进行如下调整，子项目原则上只改动自己的代码，不改动`blackbox`里面的代码（除了代码的引用）

```
├── .vscode                        	// vscode配置，为了统一开发规范推荐使用vscode编辑器进行开发
├── build                        	// 编译配置
├── dist                        	// 打包后文件
├── node_modules                	// 依赖包
├── public                      	// 静态文件
├── src                         	// 源代码
├── ├── blackbox                	// 公用代码用于集成各个子项目
│   ├── ├── apis                    // 接口
│   ├── ├── layout                  // 布局
│   ├── ├── router                  // 路由
│   ├── ├── utils                  	// 封装方法
│   ├── ├── store                  	// vuex
│   ├── ├── views                  	// 页面
│   ├── ├── App.vue                 // 入口页面
│   └── ─── main.js                 // 入口

│   ├── project                  	// 子项目代码(可自己命名)
│   ├── ├── assets                  // 静态资源
│   ├── ├── components              // 全局公用组件
│   ├── ├── layout                  // 布局
│   ├── ├── router                  // 路由
│   ├── ├── store                   // 状态管理
│   ├── ├── utils                   // 公用方法
│   ├── ├── views                   // 页面代码
│   ├── │   ├── demo                // demo模块
│   ├── │   │   ├── table           // table页面
│   ├── │   │   │   ├── components  // 页面组件
│   ├── │   │   │   ├── Index.vue   // 页面入口
│   └── ─── main.js                 // 入口

│   ├── project2                  	// 子项目代码(可自己命名)
│   ├── project3                  	// 子项目代码(可自己命名)


│   └── main.js                 	// 入口
├── .env.dev                	  	// 开发环境配置文件
├── .env.test                	  	// 测试环境配置文件
├── .env.prod                	  	// 生产环境配置文件
└── package.json                	// 依赖包管理
```



#### 路由注册

在`project/router/index.js`抛出子项目路由

```

export const project = []

```

在`blackbox/router/moudel/index.js`引入

```
import { RouterBlackbox } from 'blackbox-ui'
import { project } from '@/project/router'

export default [
  ...project,
  ...RouterBlackbox // 一定要放在最后面
]

```

路由注册的时候必须加载子项目的前缀防止路由冲突，如

```
export const demoBlank = [
  {
    path: '/project/test',
    meta: { title: '测试', notLogin: true },
    component: () => import('@/project/views/system/login/index.vue')
  }
]
```





#### vuex注册

在`project/store/index.js`抛出子项目路由

```
//index.js
export * from './module/demoStore.js'


// moodule/demoStore.js
export const demoStore = () => {
  return {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
  }
}

```

在`blackbox/router/moudel/index.js`引入

```
import Vuex from 'vuex'
import Vue from 'vue'
import { userStore, tagsStore } from 'blackbox-ui'
import { projectStore } from '@/project/router'

const env = import.meta.env
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    userStore: userStore(env),
    tagsStore: tagsStore(),
    projectStore: projectStore()
  }
})

export default store

```

