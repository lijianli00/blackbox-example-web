import Vuex from 'vuex'
import Vue from 'vue'
import { userStore, tagsStore } from 'blackbox-ui'
import { projectStore } from '@/project/store'

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
