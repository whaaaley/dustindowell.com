import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const siteUrl = 'https://dustindowell.com'
export const siteName = 'Dustin Dowell'

const personSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteName,
  jobTitle: 'Software Engineer',
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Des Moines',
    addressRegion: 'Iowa',
    addressCountry: 'US',
  },
})

type SeoOptions = {
  title: string
  description: string
  image?: string
  noindex?: boolean
}

export const useSeo = (options: SeoOptions) => {
  const route = useRoute()

  const title = computed(() => (options.title === siteName ? `${siteName} | Software Engineer` : `${options.title} | ${siteName}`))
  const canonicalUrl = computed(() => new URL(route.path.replace(/\/$/, '') || '/', siteUrl).href)
  const image = computed(() => new URL(options.image ?? '/og-home.png', siteUrl).href)

  useHead({
    title: title.value,
    meta: [
      { name: 'author', content: siteName },
      { name: 'description', content: options.description },
      ...(options.noindex ? [{ name: 'robots', content: 'noindex' }] : []),

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl.value },
      { property: 'og:title', content: title.value },
      { property: 'og:description', content: options.description },
      { property: 'og:image', content: image.value },
      { property: 'og:image:alt', content: title.value },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title.value },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: image.value },
    ],
    script: [
      { type: 'application/ld+json', innerHTML: personSchema },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl.value },
    ],
  })
}
