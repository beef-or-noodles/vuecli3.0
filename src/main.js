import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './route'
Vue.use(Router)

import ElementUI from 'element-ui' // 引入
import 'element-ui/lib/theme-chalk/index.css' // 引入
Vue.use(ElementUI)// 使用

import store from './store/index'
Vue.config.productionTip = false
const router = new Router({ routes })
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
