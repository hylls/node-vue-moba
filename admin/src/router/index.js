import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'

import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        name: 'CategoryCreate',
        component: CategoryEdit,
      },
      {
        path: '/categories/edit/:id',
        name: 'CategoryEdit',
        props: true,
        component: CategoryEdit,
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: CategoryList,
      },
      {
        path: '/items/create',
        name: 'ItemCreate',
        component: ItemEdit,
      },
      {
        path: '/items/edit/:id',
        name: 'ItemEdit',
        props: true,
        component: ItemEdit,
      },
      {
        path: '/items/list',
        name: 'ItemList',
        component: ItemList,
      },
      {
        path: '/heroes/create',
        name: 'HeroCreate',
        component: HeroEdit,
      },
      {
        path: '/heroes/edit/:id',
        name: 'HeroEdit',
        props: true,
        component: HeroEdit,
      },
      {
        path: '/heroes/list',
        name: 'HeroList',
        component: HeroList,
      },
      {
        path: '/articles/create',
        name: 'ArticleCreate',
        component: ArticleEdit,
      },
      {
        path: '/articles/edit/:id',
        name: 'ArticleEdit',
        props: true,
        component: ArticleEdit,
      },
      {
        path: '/articles/list',
        name: 'ArticleList',
        component: ArticleList,
      },
      {
        path: '/ads/create',
        name: 'AdCreate',
        component: AdEdit,
      },
      {
        path: '/ads/edit/:id',
        name: 'AdEdit',
        props: true,
        component: AdEdit,
      },
      {
        path: '/ads/list',
        name: 'AdList',
        component: AdList,
      },
      {
        path: '/admin_users/create',
        name: 'AdCreate',
        component: AdminUserEdit,
      },
      {
        path: '/admin_users/edit/:id',
        name: 'AdminUserEdit',
        props: true,
        component: AdminUserEdit,
      },
      {
        path: '/admin_users/list',
        name: 'AdminUserList',
        component: AdminUserList,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    next('/login')
  }
  next()
})

export default router
