import Vuex from 'vuex'
import Vue from 'vue'

import actions from "./actions"
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products
  },

  // = data
  state: {

  },

  // = computed properties
  getters: {

  },

  // = methods
  // actions can be complicated but never update the state
  actions,

  // update state
  // mutation is not complicated logic, just simple and update state
  mutations: {

  }
})
