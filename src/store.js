import Vue from 'vue'
import Vuex from 'vuex'
import VueI from './main'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    chan: null
  },

  getters: {
    chan: state => state.chan
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },

    JOIN_CHANNEL(state, chan) {
      state.chan = chan
    }
  },

  actions: {
      setToken({commit}, token) {
        VueI.$ws.send(JSON.stringify({
          action:'send_token',
          message:token
        }))
        commit('SET_TOKEN', token)
      },

      joinChannel({commit}, chan) {
        VueI.$ws.send(JSON.stringify({
          action:'join_channel',
          message:chan
        }))
        commit('JOIN_CHANNEL', chan)
      }
  }
})
