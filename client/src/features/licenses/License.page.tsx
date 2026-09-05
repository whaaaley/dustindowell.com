import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { findLicense, type License } from './licenses.ts'
import Markdown from '~/components/markdown/Markdown.tsx'
import NotFoundPage from '~/features/notFound/NotFound.page.tsx'
import { useSeo } from '~/hooks/useSeo.ts'

const content = (license: License) => [
  `## ${license.name.toUpperCase()}`,
  '',
  `${license.version} ✦ ${license.license} ✦ [All licenses](/licenses)`,
  '',
  license.body,
].join('\n')

export default defineComponent({
  name: 'LicensePage',
  setup () {
    const route = useRoute()
    const license = computed(() => findLicense(String(route.params.slug)))

    useSeo({
      title: license.value ? `${license.value.name} license` : 'Page Not Found',
      description: license.value ? `License notice for ${license.value.name} ${license.value.version}.` : 'The page you are looking for does not exist.',
      noindex: !license.value,
    })

    return () => (license.value
      ? <div data-testid='page-license'><Markdown content={content(license.value)}/></div>
      : <NotFoundPage/>
    )
  },
})
