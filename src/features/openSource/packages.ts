// Open-source package data for the open source page. Each package gets a sidebar entry and a presentation view.
// Grouped by category so the sidebar can organize them.
// Ordered most-substantial-first so categories and packages within them appear in priority order in the sidebar.

export type OssProject = {
  slug: string
  title: string
  category: string
  tagline: string
  body: string[]
  tags: string[]
  stars?: number
  npm?: string
  jsr?: string
  github?: string
}

export const packages: OssProject[] = [{
  slug: 'opencode-search',
  title: 'opencode-search',
  category: 'OpenCode Plugins',
  tagline: 'Web search for OpenCode agents via DuckDuckGo, Wikipedia, and Bluesky.',
  body: [
    'An OpenCode plugin that gives agents live web search, pulling results from DuckDuckGo, Wikipedia, and Bluesky.',
    'It lets a coding agent reach for current information without leaving the session.',
  ],
  tags: ['TypeScript', 'OpenCode', 'DuckDuckGo', 'Wikipedia', 'Bluesky'],
  stars: 11,
  npm: 'https://www.npmjs.com/package/opencode-search',
  github: 'https://github.com/whaaaley/opencode-search',
}, {
  slug: 'opencode-relay',
  title: 'opencode-relay',
  category: 'OpenCode Plugins',
  tagline: 'Relays messages between multiple AI agent instances.',
  body: [
    'An OpenCode plugin that relays messages between multiple AI agent instances so they can coordinate.',
    'It opens a channel for agents to hand work off and share context across separate sessions.',
  ],
  tags: ['TypeScript', 'OpenCode', 'Multi-agent'],
  stars: 3,
  npm: 'https://www.npmjs.com/package/opencode-relay',
  github: 'https://github.com/whaaaley/opencode-relay',
}, {
  slug: 'opencode-speech-act-theory',
  title: 'opencode-speech-act-theory',
  category: 'OpenCode Plugins',
  tagline: 'Converts unstructured text into structured formats via speech act theory.',
  body: [
    'An OpenCode plugin that turns unstructured text into structured formats using speech act theory.',
    'It classifies intent in prose so agents can act on it as structured data.',
  ],
  tags: ['TypeScript', 'OpenCode', 'NLP'],
  stars: 8,
  npm: 'https://www.npmjs.com/package/opencode-speech-act-theory',
  github: 'https://github.com/whaaaley/opencode-speech-act-theory',
}, {
  slug: 'opencode-conventional-commits',
  title: 'opencode-conventional-commits',
  category: 'OpenCode Plugins',
  tagline: 'Enforces the Conventional Commits format.',
  body: [
    'An OpenCode plugin that enforces the Conventional Commits specification on commit messages.',
    'It keeps an agent-driven git history consistent and machine-parseable.',
  ],
  tags: ['TypeScript', 'OpenCode', 'Git'],
  stars: 4,
  npm: 'https://www.npmjs.com/package/opencode-conventional-commits',
  github: 'https://github.com/whaaaley/opencode-conventional-commits',
}, {
  slug: 'esbuild-plugin-glob-import',
  title: 'esbuild-plugin-glob-import',
  category: 'Build Tools',
  tagline: 'Use globs to import multiple files in esbuild.',
  body: [
    'An esbuild plugin that lets you import multiple files at once using glob patterns.',
    'It collapses repetitive per-file imports into a single declarative pattern.',
  ],
  tags: ['TypeScript', 'esbuild', 'Bundler'],
  stars: 4,
  npm: 'https://www.npmjs.com/package/esbuild-plugin-glob-import',
  github: 'https://github.com/whaaaley/esbuild-plugin-glob-import',
}, {
  slug: 'esbuild-plugin-tailwind',
  title: 'esbuild-plugin-tailwind',
  category: 'Build Tools',
  tagline: 'Unofficial Tailwind CSS plugin for esbuild.',
  body: [
    'An unofficial esbuild plugin that wires Tailwind CSS into the esbuild pipeline.',
    'It brings utility-first styling to projects that bundle with esbuild instead of PostCSS tooling.',
  ],
  tags: ['TypeScript', 'esbuild', 'Tailwind CSS'],
  stars: 1,
  npm: 'https://www.npmjs.com/package/esbuild-plugin-tailwind',
  github: 'https://github.com/whaaaley/esbuild-plugin-tailwind',
}, {
  slug: 'material-icons-scss',
  title: '@whaaaley/material-icons-scss',
  category: 'Libraries',
  tagline: 'Material Design icon functions for SCSS.',
  body: [
    'A SCSS library exposing Material Design icons as functions you can call directly in stylesheets.',
    'It lets you drop named Material icons into styles without managing icon font markup by hand.',
  ],
  tags: ['SCSS', 'Material Design', 'Icons'],
  stars: 5,
  npm: 'https://www.npmjs.com/package/@whaaaley/material-icons-scss',
  github: 'https://github.com/whaaaley/material-icons-scss',
}]
