import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'App',
    component: () => import(/* webpackChunkName: "app" */ '../App.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
          keepAlive: false,
          isBack: false
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "home" */ '../views/About.vue'),
        meta: {
          keepAlive: false,
          isBack: false
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router