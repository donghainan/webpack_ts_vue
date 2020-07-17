/*
 * @Author: hainan.dong 
 * @Date: 2020-07-13 17:12:33 
 * @Last Modified by: hainan.dong
 * @Last Modified time: 2020-07-17 17:37:07
 */

import Vue from 'vue'
import { Toast } from 'vant'
const vm = new Vue()
let loadingRequestCount: number = 0
let toast:any = null
// 允许同时弹多个弹框
Toast.allowMultiple(true)

const showLoading = () => {
	if (loadingRequestCount === 0) {
		toast = Toast.loading({
			message: '加载中...',
			forbidClick: true,
			loadingType: 'spinner',
		})
	}
	loadingRequestCount++
}

const hideLoading = () => {
	if (loadingRequestCount <= 0) return
	loadingRequestCount--
	if (loadingRequestCount === 0) {
		vm.$nextTick(() => {
			//以服务的方式调用的 Loading 需要异步关闭
			toast.clear()
		})
	}
}

export {
	showLoading,
	hideLoading
}
