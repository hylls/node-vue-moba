import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/iconfont/iconfont.css'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'

import './assets/style.scss'
import router from './router'

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
