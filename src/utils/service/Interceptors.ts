/*
 * @Author: hainan.dong
 * @Date: 2020-07-12 17:21:50
 * @Last Modified by: hainan.dong
 * @Last Modified time: 2020-07-17 19:27:20
 * 请求拦截器
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { showLoading, hideLoading } from './globalLoading'
import { Toast } from 'vant'
import sign from './sign'

// 请求拦截器
class Interceptors {
	public instance: any
	constructor() {
		this.instance = axios.create({ timeout: 1000 * 12, withCredentials: false, baseURL: '' })
		this.initInterceptors()
	}
	// 获取实例
	public getInterceptors() {
		return this.instance
	}

	// 初始化拦截器
	public initInterceptors() {
		this.instance.defaults.headers.post['Content-Type'] = 'application/json'
		// this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
		/**
		 * 请求拦截器
		 * 每次请求前，如果存在token则在请求头中携带token
		 */
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
        // 拦截加密
				if (config.data.jwt !== false && config.data) {
          //@ts-ignore
					config.data = sign(config.data || {})
        }
        // 添加时间戳
        config.data.t = Date.now()

				// 请求拦截进来调用显示loading效果
				if (config.data.loading) {
					showLoading()
				}

        // 删除loading标志
				if (config.data.loading !== undefined) {
					delete config.data.loading
        }
        // 删除加密标志
				if (config.data.jwt !== undefined) {
					delete config.data.jwt
        }
        // 获取token
				const token = localStorage.getItem('id_token')
				if (token) {
					config.headers.Authorization = 'Bearer ' + token
				}
				return config
			},
			(error: any) => {
				console.log(error)
			}
		)

		// 相应拦截器
		this.instance.interceptors.response.use(
			//请求成功
			(res: AxiosResponse) => {
				hideLoading()
				if (res.headers.authorization) {
					localStorage.setItem('id_token', res.headers.authorization)
				} else {
					if (res.data && res.data.token) {
						localStorage.setItem('id_token', res.data.token)
					}
				}

				if (res.status === 200) {
					return Promise.resolve(res.data)
				} else {
					this.errHandle(res)
					return Promise.reject(res.data)
				}
			},
			// 响应失败
			(error: any) => {
				hideLoading()
				const { response } = error
				if (response) {
					// 请求发出，状态非2xx
					this.errHandle(response)
					return Promise.reject(response)
				} else {
					// 网络异常处理
					Toast.fail('网络连接异常,请稍后再试!')
				}
			}
		)
	}

	/**
	 * http握手错误
	 * @param res  响应回调,根据不同响应进行不同操作
	 */
	private errHandle(res: any) {
		switch (res.status) {
			case 401:
				Toast({
					message: '无权限，请联系管理员',
					forbidClick: true,
					duration: 2000
				})
				break
			case 403:
				Toast({
					message: '无权限，请联系管理员',
					forbidClick: true,
					duration: 2000
				})
				break
			case 404:
				Toast({
					message: '请求的资源不存在',
					forbidClick: true,
					duration: 2000
				})
				break
			default:
				Toast({
					message: res.msg || '连接错误',
					forbidClick: true,
					duration: 2000
				})
				break
		}
	}
}

export default Interceptors
