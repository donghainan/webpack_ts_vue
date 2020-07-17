<template>
  <transition :name="transitionName" v-if="$route.meta.keepAlive">
    <keep-alive>
      <router-view class="child-view keepalive"></router-view>
    </keep-alive>
  </transition>
  <transition :name="transitionName" v-else>
    <router-view class="child-view keep"></router-view>
  </transition>
</template>

<script>
export default {
  name: 'TransitionView',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack
      // 滑出
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        // 滑入
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = true
    }
  }
}
</script>

<style lang="less">
.child-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
.keep {
  position: fixed;
  top: 0;
  overflow: auto;
}
.slide-left-enter {
  transform: translate(100%, 0);
  overflow-x: hidden;
}
.slide-left-enter-active {
  z-index: 9998;
}
.slide-left-leave-active {
  z-index: 0;
}
.slide-right-leave-active {
  transform: translate(100%, 0);
  z-index: 9999;
  overflow-x: hidden;
}
</style>
