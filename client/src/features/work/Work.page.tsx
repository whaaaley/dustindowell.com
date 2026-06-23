import { useHead } from '@unhead/vue'
import { defineComponent } from 'vue'
import { projects } from './projects.ts'
import Gallery from '~/components/Gallery'
import SidebarDetailLayout from '~/components/SidebarDetailLayout'
import Surface from '~/components/Surface'
import TagList from '~/components/TagList'
import { useSidebarDetail } from '~/hooks/useSidebarDetail'

// Work page: a sidebar lists projects by category; selecting one shows its presentation.
// Next/prev buttons (bottom-right) let visitors spam through projects quickly.

export default defineComponent({
  name: 'WorkPage',
  setup () {
    useHead({ title: 'Work | Dustin Dowell' })

    const { active, items, handleSelect, handleNext, handlePrevious } = useSidebarDetail(projects, 'work-project')

    return () => {
      const project = active.value
      if (!project) return null

      return (
        <SidebarDetailLayout
          activeId={project.slug}
          items={items.value}
          nounLabel='project'
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSelect={handleSelect}
        >
          <div class='grid gap-t6'>
            <div class='grid gap-t2'>
              <p class='text-sm font-bold uppercase tracking-wider text-brand-blurple'>{project.category}</p>
              <h1 class='text-4xl font-bold text-white'>{project.title}</h1>
              <p class='text-sm text-zinc-400'>{project.dates}</p>
              <p class='text-lg text-zinc-300'>{project.tagline}</p>
            </div>
            {project.images && <Gallery images={project.images}/>}
            {!project.detail && (
              <>
                <div class='grid max-w-4xl gap-t4'>
                  {project.body.map(paragraph => <p key={paragraph} class='text-zinc-300'>{paragraph}</p>)}
                </div>
                <TagList tags={project.stack}/>
              </>
            )}
            {project.detail && (
              <Surface class='rounded-xl p-t6' tone='dark-500'>
                <h2 class='mb-t4 text-[22px] font-extrabold leading-tight text-white'>{project.title}</h2>
                <p class='mb-t4 text-base leading-relaxed text-zinc-300'>{project.detail.description}</p>
                {!!project.detail.links.length && (
                  <div class='flex flex-wrap justify-end gap-t4'>
                    {project.detail.links.map(link => (
                      <a key={link.href} class='rounded-md bg-brand-blurple px-t3 py-t2 text-sm text-dark-600 transition-colors hover:bg-brand-blurple/80' href={link.href} rel='noopener noreferrer' target='_blank'>
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                <div class='my-t8 h-0.5 bg-zinc-700'/>
                <h2 class='mb-t4 text-[22px] font-extrabold leading-tight text-white'>{project.detail.roleHeading}</h2>
                {project.detail.roleNarrative.map(paragraph => <p key={paragraph} class='mb-t4 text-[15px] leading-relaxed text-zinc-300 last:mb-0'>{paragraph}</p>)}
                <div class='my-t8 h-0.5 bg-zinc-700'/>
                <h2 class='mb-t4 text-[22px] font-extrabold leading-tight text-white'>Key Features</h2>
                <div class='my-t5 grid gap-t5 sm:grid-cols-2'>
                  {project.detail.keyFeatures.map(feature => (
                    <Surface key={feature.title} class='rounded-lg p-t5' tone='dark-300'>
                      <h3 class='mb-t2 text-base font-bold leading-tight text-white'>{feature.title}</h3>
                      <p class='text-sm text-zinc-300 opacity-85'>{feature.description}</p>
                    </Surface>
                  ))}
                </div>
                <div class='my-t8 h-0.5 bg-zinc-700'/>
                <h2 class='mb-t4 text-[22px] font-extrabold leading-tight text-white'>Additional Features</h2>
                <div class='my-t5 flex flex-col gap-t4'>
                  {project.detail.additionalFeatures.map(feature => (
                    <Surface key={feature.title} class='rounded-md px-t5 py-t4' tone='dark-300'>
                      <p class='mb-t1 text-base font-semibold text-white'>{feature.title}</p>
                      <p class='text-sm text-zinc-300 opacity-85'>{feature.description}</p>
                    </Surface>
                  ))}
                </div>
              </Surface>
            )}
          </div>
        </SidebarDetailLayout>
      )
    }
  },
})
