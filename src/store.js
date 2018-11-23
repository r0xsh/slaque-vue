import Vue from 'vue'
import Vuex from 'vuex'
import VueI from './main'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: null,
    chan: null,
    messages: [],
    users: [],
    channels: []
  },

  getters: {
    chan: state => state.chan,
    messages: state => state.messages,
    users: state => state.users,
    channels: state => state.channels,
    username: state => state.username
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },

    JOIN_CHANNEL(state, chan) {
      state.chan = chan
    },

    SET_MESSAGES(state, messages) {
      state.messages = messages
    },

    SET_MESSAGE(state, message) {
      state.messages.push(message)
    },

    SET_USER_STATE(state, {users}) {
      state.users = users
    },

    SET_CHANNELS_LIST(state, {channels}) {
      state.channels = channels
    },

    SET_USERNAME(state, username) {
      state.username = username
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
      },

      sendMessage({}, message) {
        VueI.$ws.send(JSON.stringify({
          action: 'send_message',
          message: message
        }))
      },

      setChannelMessages({commit}, {channel, messages}) {
        commit('SET_MESSAGES', messages)
        commit('JOIN_CHANNEL', channel)
      },

      appendMessage({commit}, message) {
        commit('SET_MESSAGE', message)
      },

      setAppState({commit}, appState) {
        commit('SET_USER_STATE', appState)
        commit('SET_CHANNELS_LIST', appState)
      },

      setUsername({commit}, username) {
        commit('SET_USERNAME', username)
      }
  }
})
