import axios from 'axios'

import Vue from 'vue'

import router from '../router/index'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api/rest',
  // baseURL: 'http://localhost:3000/admin/api/rest',
})

const http2 = axios.create({
  baseURL: process.env.VUE_APP_API_URL2 || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api',
})

http2.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, err => {
  return Promise.reject(err)
})

http2.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err);
  if (err.response.data.message) {
    console.log(err.response.data.message);
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  if (err.response.status === 401) {
    router.push('/login')
  }
})


http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, err => {
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  if (err.response.status === 401) {
    router.push('/login')
  }
})

export { http, http2 }

export default function request(config) {
  const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL2 || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api',
    // timeout: 5000
  })
  return http(config)
}
