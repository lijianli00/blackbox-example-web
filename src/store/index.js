import Vuex from 'vuex'
import Vue from 'vue'
import { userStore } from 'blackbox-ui'
// import userStore from './module/user'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    userStore
  }
})

export default store
