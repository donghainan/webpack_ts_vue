/*
 * @Author: hainan.dong
 * @Date: 2020-07-12 17:21:28
 * @Last Modified by: hainan.dong
 * @Last Modified time: 2020-07-15 16:02:18
 *
 * 定义mixin时统一采用 mx_[name] 格式
 */
import Vue from 'vue'
const autostMixin = Vue.mixin({
  data() {
    return {}
  },
  created() { },
  mounted() { },
  methods: {
    mx_goBack() {
      this.$router.back()
    },
    mx_pushTo(url: string, flag: boolean = false) {
      //延迟100ms处理，防止页面键盘未关闭就跳转，再次返回页面点击拦截问题
      setTimeout(() => {
        //@ts-ignore
        this.$router.isBack = flag
        this.$router.push(url)
      }, 100)
    },
    mx_replaceTo(url: string, flag: boolean = false) {
      //@ts-ignore
      this.$router.isBack = flag
      this.$router.replace(url)
    }
  }
})

export { autostMixin }
