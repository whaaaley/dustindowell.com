import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import ProjectsTabs from './ProjectsTabs'

// Parent layout for the Work, Open Source, and Demos tabs.
// Renders the shared tab bar above the active child view.
// Each tab is a child route, so the Work nav link stays highlighted across all three.

export default defineComponent({
  name: 'ProjectsLayout',
  setup () {
    return () => (
      <>
        <div class='mx-auto w-full max-w-7xl px-t6 pt-t12'>
          <ProjectsTabs/>
        </div>
        <RouterView/>
      </>
    )
  },
})
