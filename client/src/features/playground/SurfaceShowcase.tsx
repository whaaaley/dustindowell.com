import { defineComponent } from 'vue'
import ShowcaseSubsection from './ShowcaseSubsection'
import Surface, { type SurfaceTone } from '~/components/Surface'

const tones: SurfaceTone[] = ['dark-950', 'dark-600', 'dark-500', 'dark-450', 'dark-400', 'dark-300', 'dark-200', 'dark-100']

export default defineComponent({
  name: 'SurfaceShowcase',
  setup () {
    return () => (
      <div class='grid gap-t8'>
        <ShowcaseSubsection title='Surface — tones'>
          {tones.map(tone => (
            <Surface key={tone} tone={tone}>
              <div class='p-t6 text-sm'>{tone}</div>
            </Surface>
          ))}
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Surface — colors'>
          <Surface color='primary'><div class='p-t6 text-sm'>Primary</div></Surface>
          <Surface color='ghost'><div class='p-t6 text-sm'>Ghost</div></Surface>
          <Surface color='rose'><div class='p-t6 text-sm'>Rose</div></Surface>
          <Surface color='yellow'><div class='p-t6 text-sm'>Yellow</div></Surface>
          <Surface color='emerald'><div class='p-t6 text-sm'>Emerald</div></Surface>
          <Surface color='sky'><div class='p-t6 text-sm'>Sky</div></Surface>
          <Surface color='cyan'><div class='p-t6 text-sm'>Cyan</div></Surface>
          <Surface color='red'><div class='p-t6 text-sm'>Red</div></Surface>
          <Surface color='violet'><div class='p-t6 text-sm'>Violet</div></Surface>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Surface — status'>
          <Surface status='info'><div class='p-t6 text-sm'>Info</div></Surface>
          <Surface status='success'><div class='p-t6 text-sm'>Success</div></Surface>
          <Surface status='warn'><div class='p-t6 text-sm'>Warn</div></Surface>
          <Surface status='error'><div class='p-t6 text-sm'>Error</div></Surface>
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Surface — square'>
          {tones.map(tone => (
            <Surface key={tone} square tone={tone}>
              <div class='p-t6 text-sm'>{tone}</div>
            </Surface>
          ))}
        </ShowcaseSubsection>
        <ShowcaseSubsection title='Surface — shadow'>
          <Surface shadow><div class='p-t6 text-sm'>950 + shadow</div></Surface>
          <Surface shadow color='primary'><div class='p-t6 text-sm'>Primary + shadow</div></Surface>
          <Surface shadow status='info'><div class='p-t6 text-sm'>Info + shadow</div></Surface>
        </ShowcaseSubsection>
      </div>
    )
  },
})
