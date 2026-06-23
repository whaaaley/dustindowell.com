import { defineComponent } from 'vue'
import DemoContent from './DemoContent'

export default defineComponent({
  name: 'PythonTodoDemo',
  setup () {
    const info = {
      category: 'Web Apps',
      title: 'Python Todo',
      tagline: 'An end-to-end typesafe todo app, from a Python API to a TypeScript client.',
      liveUrl: 'https://python-todo.fly.dev',
      repoUrl: 'https://github.com/dustin-demos/python-todo',
      aspect: 'landscape' as const,
    }

    return () => (
      <DemoContent {...info}>
        <p class='text-zinc-300'>
          In June 2025 I was going through interviews at an insurance company for a role on a team that used Python, FastAPI, and AWS Lambda. I'd never used Python professionally before, so I built this during the process to get familiar with that stack. I got the job that summer.
        </p>
        <p class='text-zinc-300'>
          At the time I was using tRPC and wanted the same end-to-end type safety in Python. The way I solved that was OpenAPI plus openapi-typescript on the client, and that pipeline is what this project is. It was originally built on Postgres with Tortoise ORM and aerich migrations. For the demo I swapped to a SQLite file the ORM creates on startup, so the list resets if the server restarts.
        </p>
        <p class='text-zinc-300'>
          Because the types come from the API itself, you can see them directly: the{' '}
          <a class='text-brand-blurple underline' href='https://python-todo.fly.dev/openapi.json' rel='noopener noreferrer' target='_blank'>OpenAPI spec</a>{' '}
          is the raw JSON the client generates its TypeScript from, and{' '}
          <a class='text-brand-blurple underline' href='https://python-todo.fly.dev/docs' rel='noopener noreferrer' target='_blank'>the docs</a>{' '}
          render it as an interactive API reference.
        </p>

      </DemoContent>
    )
  },
})
