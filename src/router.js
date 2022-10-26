import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/views/Compare'),
        props: true,
    },
    {
        path: '/top/:count',
        component: () => import('@/views/Compare'),
        props: true,
    },
    {
        path: '/abyss/:count',
        component: () => import('@/views/Compare'),
        props: true,
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;