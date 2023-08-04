const routes = [
   {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
         {path: '', component: () => import('pages/IndexPage.vue')},
         {
            name: 'home',
            path: 'popup',
            component: () => import('pages/PopupPage.vue'),
         },
         {
            name: 'jwtdecoder',
            path: 'jwtdecoder',
            component: () => import('src/pages/Encoders/JwtDecode.vue'),
         },
         {
            name: 'epochconverter',
            path: 'epochconverter',
            component: () => import('src/pages/Converters/EpochConverter.vue'),
         },
         {
            name: 'jsonformatter',
            path: 'jsonformatter',
            component: () => import('src/pages/Formatters/JsonFormatter.vue'),
         },
         {
            name: 'firebase-client',
            path: 'firebase-client',
            component: () => import('src/pages/Generators/FirebaseClient.vue'),
         },
         {
            name: 'firebase-server',
            path: 'firebase-server',
            component: () =>
               import('src/pages/Generators/FirebaseFunctions.vue'),
         },
      ],
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue'),
   },
]

export default routes
