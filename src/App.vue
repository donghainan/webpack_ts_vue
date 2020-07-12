<template>
	<div>
		<transition :name="transitionName">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
			</keep-alive>
		</transition>
		<transition :name="transitionName">
			<router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
		</transition>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class App extends Vue {
	private transitionName: string = 'slide-left'
	mounted() {
		console.log(this.$route)
	}
	@Watch('$route')
	routechange(to: any, from: any) {
		// 切换动画
		const isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
		if (isBack === true) {
			this.transitionName = 'slide-right'
		} else {
			this.transitionName = 'slide-left'
		}
		this.$router.isBack = false
	}
}
</script>

<style>
.Router {
	font-family: Roboto, Lato, sans-serif;
	position: absolute;
	width: 100%;
	height: 100%;
	padding-bottom: 60px;
	transition: all 0.377s ease-in-out;
	box-sizing: border-box;
	overflow: auto;
}
.slide-left-enter,
.slide-right-leave-active {
	opacity: 0;
	-webkit-transform: translate(100%, 0);
	transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
	opacity: 0;
	-webkit-transform: translate(-100%, 0);
	transform: translate(-100% 0);
}
</style>
