import Vuex from 'vuex'
import Vue from 'vue'
import { userStore, tagsStore } from 'blackbox-ui'

const env = import.meta.env
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    userStore: userStore(env),
    tagsStore: tagsStore()
  }
})

export default store
