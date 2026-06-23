import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './NavBar'
import SiteFooter from './SiteFooter'
import PageShell from '~/layouts/PageShell'

const links = [
  { to: 'home', label: 'Home' },
  { to: 'work', label: 'Work' },
  // Blog hidden until there's enough to show.
  // { to: 'blog', label: 'Blog' },
  { to: 'resume', label: 'Resume' },
  { href: 'https://github.com/whaaaley', label: 'GitHub' },
  // Dev-only playground link, mirroring how onclick surfaces the playground in development.
  // ...(import.meta.env.DEV ? [{ to: 'playground', label: 'Playground' }] : []),
]

export default defineComponent({
  name: 'Layout',
  setup () {
    return () => (
      <PageShell
        v-slots={{
          header: () => (
            <NavBar
              links={links}
              v-slots={{
                // No horizontal padding here: the NavBar inner box already applies px-t6, matching the page content inset.
                logo: () => (
                  <RouterLink class='py-t4 text-lg font-bold text-zinc-100' to={{ name: 'home' }}>
                    Dustin Dowell
                  </RouterLink>
                ),
              }}
            />
          ),
          main: () => <RouterView/>,
          footer: () => <SiteFooter/>,
        }}
      />
    )
  },
})
