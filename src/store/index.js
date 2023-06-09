import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sys_user: sessionStorage.getItem("sys_user") || "",
  },
  mutations: {
    SYS_USER(state, data) { //用户名
      state.sys_user = data;
      sessionStorage.setItem("sys_user", state.sys_user)
    },
  },
  actions: {},
  modules: {},
})
