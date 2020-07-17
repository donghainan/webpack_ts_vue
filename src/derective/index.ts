/*
 * @Author: hainan.dong
 * @Date: 2020-07-12 17:21:11
 * @Last Modified by: hainan.dong
 * @Last Modified time: 2020-07-15 17:15:52
 *
 * vue 自定义指令
 * 
 */

import Vue from 'vue'

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})

/**权限指令**/
// 注册一个全局指令，`v-has`, 获取按钮权限
Vue.directive('has', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode) {
    let btnPermissions = binding.value || '' // 获取指令按钮权限
    // 获取路由按钮权限
    btnPermissions = btnPermissions.split(',')
    if (!Vue.prototype.$_has(btnPermissions)) {
      const parentNode: any = el.parentNode
      parentNode.removeChild(el)
    }
  }
})
// 权限检查方法
Vue.prototype.$_has = function(value: Array<string>) {
  let isExist = false
  let btnPermissionsStr: any = sessionStorage.getItem('btnPermissions')
  if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
    return false
  }
  let res = value.filter((x: string) => {
    return JSON.parse(btnPermissionsStr).includes(x)
  })
  if (res.length > 0) {
    isExist = true
    return isExist
  }
}
