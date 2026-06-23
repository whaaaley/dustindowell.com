import { useHead } from '@unhead/vue'
import { defineComponent } from 'vue'
import { personalProjects } from './personal.ts'
import SidebarDetailLayout from '~/components/SidebarDetailLayout'
import { useSidebarDetail } from '~/hooks/useSidebarDetail'

// Personal page: a sidebar lists personal/side projects by category; selecting one shows its presentation.
// Next/prev buttons (bottom-right) let visitors page through projects quickly.

export default defineComponent({
  name: 'PersonalPage',
  setup () {
    useHead({ title: 'Personal | Dustin Dowell' })

    const { active, items, handleSelect, handleNext, handlePrevious } = useSidebarDetail(personalProjects, 'personal-project')

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
              <p class='text-lg text-zinc-300'>{project.tagline}</p>
            </div>
            <div class='grid max-w-4xl gap-t4'>
              {project.body.map(paragraph => <p key={paragraph} class='text-zinc-300'>{paragraph}</p>)}
            </div>
          </div>
        </SidebarDetailLayout>
      )
    }
  },
})
