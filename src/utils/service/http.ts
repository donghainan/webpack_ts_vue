/*
 * @Author: hainan.dong
 * @Date: 2020-07-12 17:21:50
 * @Last Modified by: hainan.dong
 * @Last Modified time: 2020-07-17 19:27:42
 * 请求主体
 */
import Interceptors from './Interceptors'
import { Toast } from 'vant'
import { AxiosResponse } from 'axios'

/**
 * @param url   请求地址
 * @param params  参数
 * @param params.loading   是否loading 默认false
 * @param params.jwt   是否加密校验
 */
interface Options {
	url?: string
	params?: object
}
class Http {
	public axios: any
	constructor() {
		this.axios = new Interceptors().getInterceptors()
	}

	// get请求
	public get(options: Options) {
		return new Promise((resolve, reject) => {
			this.axios
				.get(options.url, options.params)
				.then((res: AxiosResponse) => {
					this.resultHandle(res, resolve)
				})
				.catch((err: any) => {
					reject(err.message || err.msg)
				})
		})
	}

	// post 请求
	public post(options: Options) {
		return new Promise((resolve, reject) => {
			this.axios
				.post(options.url, options.params)
				.then((res: AxiosResponse) => {
					this.resultHandle(res, resolve)
				})
				.catch((err: Error) => {
					reject(err.message)
				})
		})
	}

	/**
	 *
	 * @param res
	 * @param resolve
	 */
	public resultHandle(res: any, resolve: any) {
		if (res.success) {
			resolve(res.data)
		} else {
			this.errorHandle(res)
		}
	}

	/**
	 * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
	 * @param res
	 */
	public errorHandle(res: any) {
		Toast(res.msg || res.message || '服务异常，请稍候重试') // 统一谈服务端提示,我们提示统一由服务端提供
		// 状态码判断
		switch (res.status) {
			case 101:
				break
			case 102:
				break
			default:
			// console.log(other);
		}
	}
}

export default Http
