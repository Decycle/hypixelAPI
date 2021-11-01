const routes = [
  {
    path: '/',
    redirect: '/players',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'players',
        component: () =>
          import('src/pages/PlayerListPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
