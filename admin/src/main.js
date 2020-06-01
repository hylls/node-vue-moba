import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import { http, http2 } from './api/index'
Vue.prototype.$http = http
Vue.prototype.$httpn = http2

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    mixinGetAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
