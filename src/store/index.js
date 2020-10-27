import Vue from 'vue'
import Vuex from 'vuex'

//将user导入进来
import user from "./modules/user";
import homepage from "./modules/homepage";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {//将模块导出去
    user,
    homepage
  }
})
