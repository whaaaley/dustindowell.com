import { defineComponent } from 'vue'
import { env } from '~/env.ts'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'OnclickNotesDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Onclick Notes',
      tagline: 'A serverless note editor that packs the whole note into the URL.',
      liveUrl: `${env.CLIENT_DEMOS_URL}/onclick-notes/editor`,
      views: [
        { label: 'Editor', src: `${env.CLIENT_DEMOS_URL}/onclick-notes/editor` },
        { label: 'Sample', src: `${env.CLIENT_DEMOS_URL}/onclick-notes/note?data=XVKxTsNADN3zFZa6RpkQO6JFDFUHVIQYzcXtHU3P4ew07d9jJy0gNsf3_N7zc6pqARtWEthGVFinE0HKoJHg9WVdVdtIxToCmUGonKgA5ta_WlT8QCFwRGPjBqKsyeDZCGsgA19g5NIC7yBp7TSBj30hEWonnh7DwcqUlSfNLuWDQYW6XQOP3F9uTia0184NWvBEncCYNBq8qarFAp55tNoFDzIZB6Wz_hOdJgqOsFw9rR-2q9pJM_gi93dD6WyFwO3VXVu47__a-xp8JdGS8r6BJRnUKvgcRKH4vmJBqgfJGTrGdnb2Fi_uzFMk1KraMGAIPGSVegpWueCevNbohCbXER481evGSX7yqUFsJKKb8P6kHjyrOVFRO8c7DxAww850EWQofUniA3h0Xb_InI6vZgB76uagOQe6uv3NrYYxphBvNsbIhu45XZn89l1StSadeyrpaH9C8w0` },
        { label: 'Home', src: `${env.CLIENT_DEMOS_URL}/onclick-notes/` },
      ],
      repoUrl: 'https://github.com/dustin-demos/notes',
      aspect: 'tall' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          A serverless markdown notes app from April 2021. The entire note lives in the URL, so there's no database, no accounts, nothing to store: you just share the link. It compresses the text with raw DEFLATE and base64-encodes it into the URL.
        </p>
        <p class='text-zinc-300'>
          I was trying to pack as much as possible into a single URL. I also went down a rabbit hole on{' '}
          <a class='text-brand-blurple underline' href='https://bellard.org/ts_zip/' rel='noopener noreferrer' target='_blank'>Fabrice Bellard's language-model text compression</a>, which uses a language model to compress text far beyond what a general compressor can, though that experiment isn't what ships in this demo.
        </p>
        <p class='text-zinc-300'>
          Built with pocket and Superfine, using mdast for the markdown.
        </p>

      </DemoContent>
    )
  },
})
