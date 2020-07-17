<template>
	<div class="home">
		<van-button type="info">{{ TRANSITION_NAME }}</van-button>
		<div class="top"></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Button } from 'vant'
import { State, namespace } from 'vuex-class'
import sign from '../utils/service/sign'
const animateModule = namespace('animate')
@Component({
	components: {
		vanButton: Button
	}
})
export default class Home extends Vue {
	@animateModule.State('TRANSITION_NAME') TRANSITION_NAME!: string
	created() {
		// this.$http
		// 	.post({
		// 		url: this.$api.login,
		// 		params: {
		// 			username: 'admin',
    //       password: '123',
    //       loading: true,
    //       jwt: false
		// 		}
		// 	})
		// 	.then((res) => {
		// 		console.log(res)
		// 	})
	}
}
</script>

<style lang="less" scoped>
@import './home.less';
.home {
	background-color: cyan;
}
.top {
	width: 100%;
	height: 153px;
	background-color: #fff;
}
</style>
