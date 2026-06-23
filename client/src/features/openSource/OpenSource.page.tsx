import { PhArrowSquareOut, PhGithubLogo, PhPackage, PhStar } from '@phosphor-icons/vue'
import { useHead } from '@unhead/vue'
import { defineComponent } from 'vue'
import { packages } from './packages.ts'
import Button from '~/components/form/Button'
import SidebarDetailLayout from '~/components/SidebarDetailLayout'
import TagList from '~/components/TagList'
import { useSidebarDetail } from '~/hooks/useSidebarDetail'

// Open source page: a sidebar lists packages by category; selecting one shows its presentation.
// Next/prev buttons (bottom-right) let visitors spam through packages quickly.

export default defineComponent({
  name: 'OpenSourcePage',
  setup () {
    useHead({ title: 'Open Source | Dustin Dowell' })

    const { active, items, handleSelect, handleNext, handlePrevious } = useSidebarDetail(packages, 'open-source-project')

    return () => {
      const project = active.value
      if (!project) return null

      return (
        <SidebarDetailLayout
          activeId={project.slug}
          items={items.value}
          nounLabel='package'
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSelect={handleSelect}
        >
          <div class='grid gap-t6'>
            <div class='grid gap-t2'>
              <p class='text-sm font-bold uppercase tracking-wider text-brand-blurple'>{project.category}</p>
              <div class='flex flex-wrap items-center gap-t3'>
                <h1 class='text-4xl font-bold text-white'>{project.title}</h1>
                {project.stars !== undefined && (
                  <span class='flex items-center gap-t1 rounded-full bg-zinc-800 px-t3 py-t1 text-sm text-zinc-300'>
                    <PhStar class='size-4' weight='fill'/>
                    {project.stars.toLocaleString()}
                  </span>
                )}
              </div>
              <p class='text-lg text-zinc-300'>{project.tagline}</p>
            </div>
            <div class='grid max-w-4xl gap-t4'>
              {project.body.map(paragraph => <p key={paragraph} class='text-zinc-300'>{paragraph}</p>)}
            </div>
            <TagList tags={project.tags}/>
            <div class='flex flex-wrap gap-t3'>
              {project.npm && (
                <a href={project.npm} rel='noopener noreferrer' target='_blank'>
                  <Button color='outline' icon={PhPackage} size='sm' text='npm'/>
                </a>
              )}
              {project.jsr && (
                <a href={project.jsr} rel='noopener noreferrer' target='_blank'>
                  <Button color='outline' icon={PhArrowSquareOut} size='sm' text='JSR'/>
                </a>
              )}
              {project.github && (
                <a href={project.github} rel='noopener noreferrer' target='_blank'>
                  <Button color='outline' icon={PhGithubLogo} size='sm' text='GitHub'/>
                </a>
              )}
            </div>
          </div>
        </SidebarDetailLayout>
      )
    }
  },
})
