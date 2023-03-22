const userStore = {
  state: {
    user: JSON.parse(sessionStorage.getItem('user')), // 用户信息
    token: sessionStorage.getItem('token'),
    env: process.env || {}
  },
  getters: {
    menuList: state => {
      return state.user?.menuTrees || []
    }
  },
  mutations: {
    setToken(state, token) {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    setUser(state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    logout() {
      // 退出清空session
      sessionStorage.clear()
    }
  },
  actions: {},
  modules: {}
}

export default userStore
