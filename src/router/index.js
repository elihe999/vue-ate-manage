import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: 'self_config' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: 'Home' }
                },
                {
                    path: '/history',
                    component: resolve => require(['../components/page/HistoryTable.vue'], resolve),
                    meta: { title: 'Recode' }
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/page/SuiteTable.vue'], resolve),
                    meta: { title: 'test' }
                },
                {
                    path: '/select',
                    name: 'selectcase',
                    component: resolve => require(['../components/page/SelectCase.vue'], resolve),
                    meta: { title: 'Select' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
