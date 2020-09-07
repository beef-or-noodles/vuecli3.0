/**
 * Created by HIAPAD on 2020/5/7.
 */
/* 注册模块 */
const routes = [
    {
        path: '/',
        component: () => import('../pages/index')
    },
    {
        path: '/404',
        component: () => import('../pages/404')
    },
    { path: '*', redirect: '/404' }// 防输错或者没找到页面路由错误，跳转到首页
]
export default routes
