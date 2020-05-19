/**
 * Created by HIAPAD on 2020/5/19.
 */
import axios from 'axios'

axios.defaults.baseURL = '' // 默认请求地址
axios.defaults.timeout = 15000
const http_status = { '400': '请求错误', '401': '未授权，请登录', '403': '拒绝访问', '404': '请求地址出错', '408': '请求超时', '500': '服务器内部错误', '501': '服务未实现', '502': '网关错误', '503': '服务不可用', '504': '网关超时', '505': 'HTTP版本不受支持' }

// 防止重复提交
const pending = []
const cancelToken = axios.CancelToken
const removePending = (config) => {
    for (const p in pending) {
        if (pending[p].u + pending[p].data === config.url + '&' + config.method + JSON.stringify(config.data)) {
            pending[p].f() // 执行取消操作
            pending.splice(p, 1) // 把这条记录从数组中移除
        }
    }
}

// 设置拦截器
axios.interceptors.request.use(function(config) {
    removePending(config)
    config.cancelToken = new cancelToken((c) => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c, data: JSON.stringify(config.data) })
    })
    setloading() // 设置加载动画
    config => {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8' // 定义请求头
        config.headers['x-api'] = '1.53.0'
        const token = ''
        if (token) {
            config.headers['token'] = token
        }
        return config
    }
}, function(error) {
    console.log('进入请求拦截器')
    endLoading()
    // 对请求错误做些什么
    return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    removePending(response.config)
    endLoading()
    return response
}, function(error) {
    // 对响应错误做点什么
    endLoading()
    return Promise.reject(error)
})

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
// 加载动画
var loadingCount = 0// 设置请求个数
let timer = null

function setloading() {
    if (loadingCount === 0) {
        timer = setTimeout(() => {
            console.log('加载动画')
        }, 300)
    }
    loadingCount++
}

// 关闭加载
function endLoading() {
    if (loadingCount <= 0) return
    loadingCount--
    if (loadingCount === 0) {
        window.clearTimeout(timer)
        console.log('关闭加载动画')
    }
}
// psot 请求
export function http(method, url, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method,
            url,
            data
        }).then(res => {
            resolve(res)
        })
    })
}
