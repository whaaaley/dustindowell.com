export default [{
  path: '/',
  component: () => import('./layouts/Website.layout.tsx'),
  children: [{
    name: 'resume',
    path: '',
    component: () => import('./features/resume/Resume.page.tsx'),
  }, {
    name: 'licenses',
    path: 'licenses',
    component: () => import('./features/licenses/Licenses.page.tsx'),
  }, {
    name: 'license',
    path: 'licenses/:slug',
    component: () => import('./features/licenses/License.page.tsx'),
  }, {
    name: 'work',
    path: 'work',
    component: () => import('./features/work/Work.page.tsx'),
  }, {
    path: 'work/:slug',
    component: () => import('./features/work/Work.layout.tsx'),
    children: [{
      name: 'product',
      path: '',
      component: () => import('./features/work/Product.page.tsx'),
    }],
  }, {
    name: 'playground',
    path: 'playground',
    component: () => import('./features/playground/Playground.page.tsx'),
  }, {
    name: 'banner',
    path: 'banner',
    component: () => import('./features/banner/Banner.page.tsx'),
  }, {
    name: 'not-found',
    path: ':catchAll(.*)',
    component: () => import('./features/notFound/NotFound.page.tsx'),
  }],
}]
