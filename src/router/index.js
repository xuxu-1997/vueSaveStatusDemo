import {createMemoryHistory, createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/auto',
        component: () => import('@/components/Layout'),
        children: [
            {
                path: '/auto',
                name: 'auto',
                component: () => import('@/pages/home'),
            }, {
                path: '/setting',
                name: 'setting',
                component: () => import('@/pages/setting'),
            }, {
                path: '/user',
                name: 'user',
                component: () => import('@/pages/user'),
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})