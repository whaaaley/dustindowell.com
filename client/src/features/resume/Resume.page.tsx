import { PhDownloadSimple } from '@phosphor-icons/vue'
import { useHead } from '@unhead/vue'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import PageSection from '~/components/PageSection'
import Button from '~/components/form/Button'

// Verbatim port of the original dustindowell.com resume (_scratch-old/src/views/resume.js + resume.scss).
// Each column is a flat flow of headings, meta lines, and bullet lists; spacing mirrors the original tag-level CSS,
// snapped to the t grid: section h1 36px, entry h2 20px, meta h3 14px/0.5, p { pt 10px }, ul { pb/pl 24px }, li { pt 12px }.

// .grid-item h1 -> italic 900 36px uppercase, margin-left -2px.
const SectionTitle = (text: string) => (
  <h1 class='-ml-px font-inter text-[36px] font-black uppercase italic leading-[1.3333333333] text-zinc-300'>{text}</h1>
)

// .grid-item h2 -> italic 900 20px uppercase, margin-left -1px.
const EntryTitle = (text: string) => (
  <h2 class='-ml-px font-inter text-[20px] font-black uppercase italic leading-[1.8] text-zinc-300'>{text}</h2>
)

// .grid-item h3 -> sans-serif 14px/1.714 at opacity 0.5 (org, date, school).
const MetaLine = (text: string) => (
  <p class='text-[14px] leading-[1.7142857143] text-zinc-300 opacity-50'>{text}</p>
)

// .grid-item ul -> padding 0 0 24px 24px; li -> padding-top 12px.
// The original always renders the ul (even empty, as ul([])) so its bottom padding spaces the next section.
const Bullets = (bullets: string[]) => (
  <ul class='list-disc pb-t8 pl-t8 text-[14px] leading-[1.7142857143] text-zinc-300'>
    {bullets.map(bullet => <li key={bullet} class='pt-t4'>{bullet}</li>)}
  </ul>
)

// The org line links to the work detail page when the job has a matching project, otherwise renders as a muted meta line.
const OrgLine = (org: string, workSlug?: string) => {
  if (workSlug) {
    return (
      <RouterLink class='block text-[14px] leading-[1.7142857143] text-zinc-300 opacity-50 transition-opacity hover:opacity-100' to={{ name: 'work-project', params: { slug: workSlug } }}>
        {org}
      </RouterLink>
    )
  }

  return MetaLine(org)
}

// .grid-item p -> padding-top 10px (rounded to the 9px t3 step).
const JobSummary = (summary?: string) => {
  if (!summary) {
    return null
  }

  return <p class='pt-t3 text-[14px] leading-[1.7142857143] text-zinc-300'>{summary}</p>
}

type Job = {
  heading: string
  org: string
  dates: string
  summary?: string
  bullets: string[]
  workSlug?: string
}

const JobEntry = (job: Job) => (
  <div class='contents'>
    {EntryTitle(job.heading)}
    {OrgLine(job.org, job.workSlug)}
    {MetaLine(job.dates)}
    {JobSummary(job.summary)}
    {Bullets(job.bullets)}
  </div>
)

type EduEntry = {
  heading: string
  dates: string
  school: string
  bullets: string[]
}

const EducationEntry = (entry: EduEntry) => (
  <div class='contents'>
    {EntryTitle(entry.heading)}
    {MetaLine(entry.dates)}
    {MetaLine(entry.school)}
    {Bullets(entry.bullets)}
  </div>
)

type SkillGroup = {
  heading: string
  bullets: string[]
}

const SkillEntry = (group: SkillGroup) => (
  <div class='contents'>
    {EntryTitle(group.heading)}
    {Bullets(group.bullets)}
  </div>
)

const gist = 'Full-Stack engineer with 12+ years building web applications and dashboards. Currently working on fraud detection integrations at Symetra, a leading insurance company. Previously led development of an A/B testing platform processing 5M+ daily requests, an e-commerce automation platform for Walmart/Amazon sellers, and vehicle marketplace systems serving hundreds of dealerships. Expertise in full-stack development with Vue, Node, Deno, PostgreSQL, MongoDB, and AWS infrastructure.'

const leftJobs: Job[] = [{
  heading: 'Senior Software Engineer II',
  org: 'Symetra - Bellevue, Washington (Remote Contract)',
  dates: 'July 2025 - Current',
  workSlug: 'symetra',
  summary: 'Contributed to fraud detection product integrations on the Integration Services team at a leading life insurance and financial services company.',
  bullets: [
    'Developed fraud detection integrations using Python, AWS Lambda, and CloudFormation with DataDog monitoring',
    'Worked with Azure DevOps workflows and built serverless AWS solutions for fraud prevention',
  ],
}, {
  heading: 'Lead Engineer',
  org: 'Udundi - Austin, Texas (Remote Full-time)',
  dates: 'May 2022 - September 2022',
  summary: 'Contributed to multiple Udundi projects and initiatives, focusing on completing unfinished products and establishing development infrastructure.',
  bullets: [
    'Inherited and brought Vue2/Node projects to completion by reducing scope and maintaining original design, including Shopify extensions launched to production',
    'Created multiple landing pages for products using Vue3, including Compose.co marketing website and Udundi agency website',
    'Established CI/CD processes for company projects using GitHub Actions and AWS',
  ],
}, {
  heading: 'Lead Developer',
  org: 'Access Publishing Inc. - Johnston, Iowa (Full-time)',
  dates: 'February 2016 - November 2019',
  workSlug: 'access-publishing',
  summary: 'Led development of three specialized vehicle and equipment marketplaces (AccessTrucks, SleeperTrader, MachineryAccess) serving buyers and hundreds of dealerships nationwide.',
  bullets: [
    'Developed systems to aggregate inventory from hundreds of dealerships using web scrapers and API integrations',
    'Built data processing pipelines in Node and MongoDB handling inconsistent formats, duplicates, and constant updates',
    'Developed image processing systems to optimize and standardize vehicle photos across platforms',
    'Created Vue frontends with specialized filtering for truck specifications and heavy machinery details',
    'Implemented integrated financing prequalification system for SleeperTrader buyers, managing complex API integrations across PHP, MySQL, MongoDB, and Node systems',
    'Helped build dealer management portal in Angular for listing management, inquiry responses, and performance tracking',
    'Designed conversion tracking system with Google Analytics integration and fine-grained event monitoring',
    'Managed targeted social media marketing campaigns and implemented email notification system using Sparkpost',
    'Optimized applications for SEO, mobile devices, and slow 3G connections using micro-frameworks and static rendering',
  ],
}]

const education: EduEntry[] = [{
  heading: 'Associate of Arts & Sciences',
  dates: '2012 - 2014',
  school: 'DMACC Ankeny Campus',
  bullets: ['Graphic Design with Web Emphasis'],
}, {
  heading: 'High School Diploma',
  dates: '2008 - 2012',
  school: 'Southeast Warren Jr. / Sr. High School',
  bullets: [],
}]

const designSkills: SkillGroup[] = [{
  heading: 'Web Design',
  bullets: [
    'Deep understanding of responsive and adaptive mobile-first web application design',
    'Expertise in creating and organizing UI kits and implementing comprehensive style guidelines',
  ],
}, {
  heading: 'Graphic Design',
  bullets: [
    'Strong design sense with acute attention to detail and extensive experience designing for both print and digital',
    'Proficient in design tools including Figma, Adobe Illustrator, Photoshop, and other creative design software',
  ],
}]

const rightJobs: Job[] = [{
  heading: 'Founding Lead Engineer',
  org: 'Udundi / Compose - Austin, Texas (Remote Full-time)',
  dates: 'September 2022 - June 2025',
  workSlug: 'compose',
  summary: 'Led development of Compose.co, an A/B testing platform with no-code tools and deep Shopify integration. Built a scalable system processing over 5 million daily requests.',
  bullets: [
    'Architected and developed full-stack platform using Vue3, Pinia, Tailwind, Node, PostgreSQL, and MongoDB with AWS serverless infrastructure (Lambda, S3, API Gateway)',
    'Contributed to GDPR-compliant data collection system in Go, developed Node batch processing and AWS Kinesis integration for scalable data ingestion',
    'Implemented real-time analytics with statistical significance calculations and revenue tracking for conversion optimization',
    'Established CI/CD pipelines using GitHub Actions for rapid deployment without interruption',
  ],
}, {
  heading: 'Lead Frontend Engineer',
  org: 'Alqen - Las Vegas, Nevada (Remote Contract)',
  dates: 'June 2021 - June 2022',
  workSlug: 'alqen',
  summary: 'Led frontend development of Alqen, an e-commerce automation platform for Amazon and Walmart sellers, handling inventory management, bulk uploads, and order fulfillment across multiple channels.',
  bullets: [
    'Built dashboards in Vue2/Vue3 using serverless AWS/Node/MongoDB backend for real-time order and inventory management, using an incremental migration strategy to Vue3 without breaking existing functionality',
    'Developed real-time analytics interfaces displaying performance metrics, profit margins, and inventory levels from backend systems',
    'Built frontend interfaces for Walmart and Stripe API integrations for automated order synchronization and payment processing',
    'Created a user impersonation system using signed JWTs with specific permissions and short-lived expirations for customer support troubleshooting',
    'Helped build product listing management tools and automated repricing systems based on market conditions',
  ],
}, {
  heading: 'Frontend Developer',
  org: 'SevenVerbs - Urbandale, Iowa (Full-time)',
  dates: 'April - August 2014',
  bullets: [
    'Converted static designs into WordPress, Drupal, Sitefinity, and Joomla',
    'Designed and developed websites, business cards, logos, infographics, and digital documents',
    'Enhanced existing applications with new features and design improvements',
  ],
}]

const technicalSkills: SkillGroup[] = [{
  heading: 'Languages & Technologies',
  bullets: [
    'Extensive knowledge and professional experience using JavaScript/TypeScript ecosystems and frameworks',
    'Professional experience with Python and Go',
    'Vue2/Vue3, Pinia, Vue Router, TanStack/Query, tRPC/Zod, RxJS, Sass, Less, Stylus, PostCSS, Tailwind CSS',
    'Node, Deno, Express, Koa, Oak, Apollo GraphQL, MongoDB, PostgreSQL, Drizzle',
    'AWS (Lambda, S3, API Gateway, Kinesis), GitHub Actions, CI/CD, Docker, Fly, Supabase',
  ],
}, {
  heading: 'Favorite Stack',
  bullets: ['Vue + TSX, TypeScript + tRPC/Zod, TanStack/Query, Supabase, Deno + Oak, RxJS, Drizzle'],
}, {
  heading: 'Development Philosophy',
  bullets: [
    'Building minimal, user-focused web applications for over 12 years with an emphasis on platforms and dashboards',
    'Expertise in functional programming patterns and designing optimal user experiences through iterative improvement and data-driven decisions',
    'Focus on tiny app bundles, minimal UI design, and efficient architectures for maximum performance and usability',
    'Preference for incremental adoption strategies and maintainable code that can evolve with changing requirements',
  ],
}]

export default defineComponent({
  name: 'ResumePage',
  setup () {
    useHead({ title: 'Resume | Dustin Dowell' })

    return () => (
      <PageSection>
        <div class='grid'>
          <header class='flex flex-wrap items-center justify-between gap-t8 rounded-xl bg-brand-gradient py-t12 pl-t16 pr-t12 text-dark-500'>
            <div class='grid'>
              <h1 class='-ml-t1 font-inter text-[48px] font-black uppercase leading-none'>Dustin Dowell</h1>
              <h2 class='font-inter text-[20px] font-black italic leading-normal'>Full-Stack Engineer</h2>
            </div>
            <div class='grid gap-t6'>
              <div class='grid font-inter text-[14px] font-extrabold leading-[1.7142857143]'>
                <span>Des Moines, Iowa 50309</span>
                <span>dustindowell22@gmail.com</span>
                <span>515-689-5648</span>
              </div>
              <a class='justify-self-start' download='dustin-dowell-resume.pdf' href='/dustin-dowell-resume.pdf'>
                <Button color='outline' icon={PhDownloadSimple} size='sm' text='Download PDF'/>
              </a>
            </div>
          </header>
          <div class='px-t8 pb-t8 pt-t12'>
            {SectionTitle('The Gist')}
            <p class='pt-t3 text-[14px] leading-[1.7142857143] text-zinc-300'>{gist}</p>
          </div>
          <div class='flex flex-col md:flex-row'>
            <div class='px-t8 pb-t8 pt-t4 md:w-1/2'>
              {SectionTitle('Experience')}
              {leftJobs.map(JobEntry)}
              {SectionTitle('Education')}
              {education.map(EducationEntry)}
              {SectionTitle('Design')}
              {designSkills.map(SkillEntry)}
            </div>
            <div class='px-t8 pb-t8 pt-t4 md:w-1/2'>
              <h1 aria-hidden='true' class='font-inter text-[36px] leading-[1.3333333333]'>&nbsp;</h1>
              {rightJobs.map(JobEntry)}
              {SectionTitle('Technical')}
              {technicalSkills.map(SkillEntry)}
            </div>
          </div>
        </div>
      </PageSection>
    )
  },
})
