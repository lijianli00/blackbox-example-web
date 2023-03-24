import Vuex from 'vuex'
import Vue from 'vue'
import { userStore } from 'blackbox-ui'

const env = import.meta.env
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    userStore: userStore(env)
  }
})

export default store
