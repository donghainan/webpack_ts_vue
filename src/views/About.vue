<template>
  <div>
    <van-button type="info" @click="go">去Home</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Button } from 'vant'
@Component({
  components: {
    vanButton: Button
  }
})
export default class Home extends Vue {
  mounted () {
    console.log(this.$route);
  }
  private go() {
    this.$router.go(-1);
    this.$router.isBack = false
  }
}

</script>

<style lang="less" scoped>

</style>