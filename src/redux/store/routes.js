/**
 * Created by zhangyuanyuan031 on 17/6/12.
 */
import Login from 'comp/Login/index'
import PageHome from 'comp/PageHome'
import syncRoutes from 'route/syncRoutes'

export default {
    path: '/',
    component: require('comp/App').default,
    indexRoute: {
        component: require('comp/Login').default
    },
    childRoutes: [
        {
            path: "login",
            component: Login
        },
        {
            path: "pagehome",
            getComponent(newSate, cb){
                require.ensure([], () => {
                    cb(null, PageHome)
                })
            },
            getChildRoutes(newState, cb){
                require.ensure([], (require) => {
                    cb(null, [
                        ...syncRoutes
                    ])
                })
            }
        },
        // 强制“刷新”页面的 hack
        {path: 'redirect', component: require('comp/Redirect').default},
        // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
        {path: '*', component: require('comp/404').default}
    ]
}
