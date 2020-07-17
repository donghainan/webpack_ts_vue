import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('NumberFormat', function(value?: number) {
  if (!value) {
    return '0'
  }
  let intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') //将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function(dataStr: number, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})

/** 字符串超长截取省略号显示 */
Vue.filter('ellipsis', function(value: string, vlength = 25) {
  if (!value) {
    return ''
  }
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
})
