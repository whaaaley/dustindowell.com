// Personal project data, ported from the original apps.js "In Progress" section.
// These are personal/side projects, distinct from professional work.
// Grouped by category so the sidebar can organize them.

export type PersonalProject = {
  slug: string
  title: string
  category: string
  tagline: string
  body: string[]
}

export const personalProjects: PersonalProject[] = [{
  slug: 'governance',
  title: 'Governance',
  category: 'In Progress',
  tagline: 'A platform for small businesses to manage their agendas, events, voting processes, and documents.',
  body: [
    'A platform for small businesses to manage their agendas, events, voting processes, and documents.',
  ],
}, {
  slug: 'schema-harbor',
  title: 'Schema Harbor',
  category: 'In Progress',
  tagline: 'A tool for converting web pages into structured API endpoints using AI.',
  body: [
    'A tool for converting web pages into structured API endpoints using AI.',
  ],
}, {
  slug: 'perdition',
  title: 'Perdition',
  category: 'In Progress',
  tagline: 'A text-based RPG with a dark atmosphere and narrative-driven gameplay.',
  body: [
    'A text-based RPG with a dark atmosphere and narrative-driven gameplay.',
  ],
}, {
  slug: 'reasonable',
  title: 'Reasonable',
  category: 'In Progress',
  tagline: 'A visual interface for building logical reasoning processes using AI.',
  body: [
    'A visual interface for building logical reasoning processes using AI.',
  ],
}, {
  slug: 'paper-prism',
  title: 'Paper Prism',
  category: 'In Progress',
  tagline: 'A writing tool that suggests and validates sources for claims in documents.',
  body: [
    'A writing tool that suggests and validates sources for claims in documents.',
  ],
}, {
  slug: 'the-dark-times',
  title: 'The Dark Times',
  category: 'In Progress',
  tagline: 'A news aggregator that collects current events and presents them in article format.',
  body: [
    'A news aggregator that collects current events and presents them in article format.',
  ],
}]
