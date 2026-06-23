const allPages = [{
  name: 'home',
  path: '',
  meta: { title: 'Home' },
  component: () => import('./features/home/Home.page.tsx'),
}, {
  name: 'work',
  path: 'work',
  meta: { title: 'Work' },
  component: () => import('./features/projects/Projects.layout.tsx'),
  redirect: { name: 'work-index' },
  children: [{
    name: 'work-index',
    path: '',
    meta: { title: 'Work' },
    component: () => import('./features/work/Work.page.tsx'),
  }, {
    name: 'work-project',
    path: ':slug',
    meta: { title: 'Work' },
    component: () => import('./features/work/Work.page.tsx'),
  }, {
    name: 'open-source',
    path: 'open-source',
    meta: { title: 'Open Source' },
    component: () => import('./features/openSource/OpenSource.page.tsx'),
  }, {
    name: 'open-source-project',
    path: 'open-source/:slug',
    meta: { title: 'Open Source' },
    component: () => import('./features/openSource/OpenSource.page.tsx'),
  }, {
    name: 'demos',
    path: 'demos',
    meta: { title: 'Demos' },
    component: () => import('./features/demos/Demos.shell.tsx'),
    redirect: { name: 'demo-python-todo' },
    // Order mirrors demoLinks (the sidebar source of truth), newest demo first.
    children: [{
      name: 'demo-python-todo',
      path: 'python-todo',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/PythonTodo.page.tsx'),
    }, {
      name: 'demo-reasonable',
      path: 'reasonable',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Reasonable.page.tsx'),
    }, {
      name: 'demo-amazon-price-check',
      path: 'amazon-price-check',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/AmazonPriceCheck.page.tsx'),
    }, {
      name: 'demo-clickmart',
      path: 'clickmart',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Clickmart.page.tsx'),
    }, {
      name: 'demo-currency',
      path: 'currency',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Currency.page.tsx'),
    }, {
      name: 'demo-onclick-notes',
      path: 'onclick-notes',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/OnclickNotes.page.tsx'),
    }, {
      name: 'demo-framework-challenge',
      path: 'framework-challenge',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/FrameworkChallenge.page.tsx'),
    }, {
      name: 'demo-valorant-blog',
      path: 'valorant-blog',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Valorant.page.tsx'),
    }, {
      name: 'demo-instatistics',
      path: 'instatistics',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Instatistics.page.tsx'),
    }, {
      name: 'demo-state-sync',
      path: 'state-sync',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/StateSync.page.tsx'),
    }, {
      name: 'demo-resize',
      path: 'resize',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Resize.page.tsx'),
    }, {
      name: 'demo-discord-queue',
      path: 'discord-queue',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/DiscordQueue.page.tsx'),
    }, {
      name: 'demo-almost-realtime',
      path: 'almost-realtime',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/AlmostRealtime.page.tsx'),
    }, {
      name: 'demo-dvd',
      path: 'dvd',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Dvd.page.tsx'),
    }, {
      name: 'demo-h8ball',
      path: 'h8ball',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/H8ball.page.tsx'),
    }, {
      name: 'demo-vue-queue',
      path: 'vue-queue',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/VueQueue.page.tsx'),
    }, {
      name: 'demo-roguelike',
      path: 'roguelike',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Roguelike.page.tsx'),
    }, {
      name: 'demo-css-3d-toggle',
      path: 'css-3d-toggle',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Css3dToggle.page.tsx'),
    }, {
      name: 'demo-vue-pagination',
      path: 'vue-pagination',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/VuePagination.page.tsx'),
    }, {
      name: 'demo-emoji',
      path: 'emoji',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Emoji.page.tsx'),
    }, {
      name: 'demo-svg-clock',
      path: 'svg-clock',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/SvgClock.page.tsx'),
    }, {
      name: 'demo-ios-chat-bubbles',
      path: 'ios-chat-bubbles',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/IosChatBubbles.page.tsx'),
    }, {
      name: 'demo-jquery-dropdown',
      path: 'jquery-dropdown',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/JqueryDropdown.page.tsx'),
    }, {
      name: 'demo-messenger',
      path: 'messenger',
      meta: { title: 'Demos' },
      component: () => import('./features/demos/views/Messenger.page.tsx'),
    }],
  }, {
    name: 'personal',
    path: 'personal',
    meta: { title: 'Personal' },
    component: () => import('./features/personal/Personal.page.tsx'),
  }, {
    name: 'personal-project',
    path: 'personal/:slug',
    meta: { title: 'Personal' },
    component: () => import('./features/personal/Personal.page.tsx'),
  }],
}, {
  name: 'blog',
  path: 'blog',
  meta: { title: 'Blog' },
  component: () => import('./features/blog/Blog.page.tsx'),
}, {
  name: 'article',
  path: 'blog/:slug',
  meta: { title: 'Blog' },
  component: () => import('./features/blog/Blog.page.tsx'),
}, {
  name: 'resume',
  path: 'resume',
  meta: { title: 'Resume' },
  component: () => import('./features/resume/Resume.page.tsx'),
}]

// Dev-only component playground, mirroring the governance app's playground.
const devRoutes = import.meta.env.DEV
  ? [{
      name: 'playground',
      path: 'playground',
      meta: { title: 'Playground' },
      component: () => import('./features/playground/Playground.page.tsx'),
    }]
  : []

export default [{
  name: 'site',
  path: '/',
  component: () => import('./components/Layout.tsx'),
  redirect: {
    name: 'home',
  },
  children: [
    ...allPages,
    ...devRoutes,
  ],
}]
