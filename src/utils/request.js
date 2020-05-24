/**
 * Created by HIAPAD on 2020/5/19.
 */
import axios from 'axios'
import store from '@/store/index'
const http_status = { '400': '请求错误', '401': '未授权，请登录', '403': '拒绝访问', '404': '请求地址出错', '408': '请求超时', '500': '服务器内部错误', '501': '服务未实现', '502': '网关错误', '503': '服务不可用', '504': '网关超时', '505': 'HTTP版本不受支持' }
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 20000 // request timeout
})
// 添加请求拦截器
service.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    setloading()
    const token = store.state.user.token
    config.headers['x-api'] = '1.53.0'
    if (token) {
        config.headers['token'] = token
    }
    return config
}, function(error) {
    // 对请求错误做些什么
    endLoading()
    return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    endLoading()
    const code = response.data.code
    if (code === 3000) {
        console.log('去登录')
        return
    }
    return response.data
}, function(error) {
    // 对响应错误做点什么
    endLoading()
    return Promise.reject(error)
})
// 加载动画
var loadingCount = 0// 设置请求个数
let timer = null

function setloading() {
    if (loadingCount === 0) {
        timer = setTimeout(() => {
            console.log('加载动画')
            store.commit('setLoading', true)
        }, 300)
    }
    loadingCount++
}

// 关闭加载
function endLoading() {
    if (loadingCount <= 0) return
    loadingCount--
    if (loadingCount === 0) {
        store.commit('setLoading', false)
        window.clearTimeout(timer)
    }
}
// 请求
export default service
