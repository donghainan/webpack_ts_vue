import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TransitonView from '@/components/TransitonView.vue'

// 扩展vue-router goBack方法
// interface NewRouterConfig {
//   isBack?: boolean
//   goBack(n: number): void
// }
// class NewRouter extends VueRouter implements NewRouterConfig {
//   public isBack: boolean = false
//   public goBack() {
//     console.log('回退')
//     this.isBack = true
//     window.history.go(-1)
//   }
// }
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'App',
    component: TransitonView,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
          keepAlive: true
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/test/',
  routes
})
export default router
