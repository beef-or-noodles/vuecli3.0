/**
 * Created by HIAPAD on 2020/5/7.
 */
/* 注册模块 */
const routes = [
    /*{
        path: '/',
        component: () => import('../pages/index')
    },*/
    {
        path: '/',
        component: () => import('../pages/live_demo')
    },
    {path: '*',redirect: '/'}//防输错或者没找到页面路由错误，跳转到首页
]
export default routes
