import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import socket from './socket'

Vue.config.productionTip = false



export default new Vue({
  router,
  store,
  created: function() {
    this.$ws = new WebSocket('ws://localhost:47187')
    this.$ws.onmessage = socket
  },
  render: h => h(App)
}).$mount('#app')
