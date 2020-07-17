import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Component } from 'vue-property-decorator'
import Http from './utils/service/http'
import API from './api'
import store from './store'
import bus from './bus/bus'
import './mixins'
import './derective'
import './filter'
import 'amfe-flexible'
import './styles/base'
// 注册路由钩子
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate'])

Vue.config.productionTip = false

Vue.prototype.$http = new Http()
Vue.prototype.$api = API
Vue.prototype.$bus = bus
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
