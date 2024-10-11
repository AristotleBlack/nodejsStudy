import { createStore } from 'vuex'
import createPersistedsate from 'vuex-persistedstate'
export default createStore({
  state: {
    isToken: false,
    collapse: false,
    personalDetails: {
      role:1
    }
  },
  getters: {
  },
  mutations: {
    getChangeToken(state, value) {
      state.isToken = value
    },
    collapseFn(state) {
      state.collapse = !state.collapse
    },
    changePersonalDetails(state, value) {
      state.personalDetails = {...state.personalDetails,...value}
    },
    //去除信息
    clearPersonINformation(state) {
      state.personalDetails = {
        role:1
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedsate({
    paths: ['collapse','personalDetails']//控制是否持久化
  }
  )]
})
