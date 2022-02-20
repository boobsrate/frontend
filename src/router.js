import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/views/Home'),
        props: true,
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;