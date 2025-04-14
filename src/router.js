import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/views/Compare'),
        props: true,
    },
    {
        path: '/top/:count',
        component: () => import('@/views/Top.vue'),
        props: true,
    },
    {
        path: '/abyss/:count',
        component: () => import('@/views/Abyss.vue'),
        props: true,
    },
    {
        path: '/about',
        component: () => import('@/views/SeoPage.vue'),
        meta: { title: 'About BoobsRate - Rate and Compare Boobs Online' }
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Обработка заголовков страниц для SEO
router.beforeEach((to, from, next) => {
  // Установка заголовка страницы из meta-данных маршрута
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    // Установка заголовка по умолчанию или на основе параметров маршрута
    switch (to.path) {
      case '/':
        document.title = 'BoobsRate - Rate and Compare Boobs Online';
        break;
      case `/top/${to.params.count}`:
        document.title = `Top ${to.params.count} Boobs - BoobsRate`;
        break;
      case `/abyss/${to.params.count}`:
        document.title = `Abyss - Lowest Rated Boobs - BoobsRate`;
        break;
      default:
        document.title = 'BoobsRate - Rate and Compare Boobs Online';
    }
  }
  next();
});

export default router;