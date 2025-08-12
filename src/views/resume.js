import { div, h1, h2, h3, li, p, text, ul } from '../lib/vnodes/html'
// import { div, h1, h2, text } from '../lib/vnodes/html'
import main from './_main'

import * as resume from '../actions/resume'

const Text = (h, data) => h([text(data)])

const Header = () => {
  return div({ class: 'header' }, [
    div({ class: 'name-title-container' }, [
      Text(h1, 'Dustin Dowell'),
      Text(h2, 'Full-Stack Engineer')
    ]),
    div([
      Text(h2, 'Des Moines, Iowa 50311'),
      Text(h2, 'dustindowell22@gmail.com'),
      Text(h2, '515-689-5648')
    ])
  ])
}

const Grid = () => {
  return div({ class: 'grid' }, [
    div({ class: 'grid-item' }, [
      Text(h1, 'Experience'),

      Text(h2, 'Senior Software Engineer II'),
      Text(h3, 'Symetra - Bellevue, Washington (Remote Contract)'),
      Text(h3, 'July 2025 - Current'),
      Text(p, 'Contributed to fraud detection product integrations on the Integration Services team at a leading life insurance and financial services company.'),
      ul([
        Text(li, 'Developed fraud detection integrations using Python, AWS Lambda, CloudFormation, JFrog, DataDog, and Lucid for system design'),
        Text(li, 'Worked with Azure DevOps for development workflows and CI/CD pipelines'),
        Text(li, 'Built serverless solutions on AWS for fraud prevention in insurance operations')
      ]),

      Text(h2, 'Founding Lead Engineer'),
      Text(h3, 'Udundi / Compose - Austin, Texas (Remote Full-time)'),
      Text(h3, 'September 2022 - June 2025'),
      Text(p, 'Led development of Compose.co, an A/B testing platform with no-code tools and deep Shopify integration. Built a scalable system processing over 5 million daily requests.'),
      ul([
        Text(li, 'Architected and developed full-stack platform using Vue3, Pinia, Tailwind, Node, PostgreSQL, and MongoDB with AWS serverless infrastructure (Lambda, S3, API Gateway)'),
        Text(li, 'Contributed to GDPR-compliant data collection system in Go, developed Node batch processing and AWS Kinesis integration for scalable data ingestion'),
        Text(li, 'Implemented real-time analytics with statistical significance calculations and revenue tracking for conversion optimization'),
        Text(li, 'Established CI/CD pipelines using GitHub Actions for rapid deployment without interruption'),
        Text(li, 'Worked extensively on backend services using Node, MongoDB, Apollo, and GraphQL for core functionality'),
        Text(li, 'Led technical decision-making while mentoring team members and incorporating their input'),
        Text(li, 'Experimented with AI-powered content generation using OpenAI in early proof-of-concept work')
      ]),

      Text(h2, 'Lead Engineer'),
      Text(h3, 'Udundi - Austin, Texas (Remote Full-time)'),
      Text(h3, 'May 2022 - September 2022'),
      Text(p, 'Contributed to multiple Udundi projects and initiatives, focusing on completing unfinished products and establishing development infrastructure.'),
      ul([
        Text(li, 'Completed stalled Vue2/Node projects by reducing scope and maintaining original design'),
        Text(li, 'Developed and launched previously stalled Shopify extensions to production'),
        Text(li, 'Created multiple landing pages for unfinished projects and products using Vue3'),
        Text(li, 'Built frontend for shipping protection dashboard targeted at Shopify store owners'),
        Text(li, 'Developed frontend for Compose.co marketing website and Udundi agency website'),
        Text(li, 'Established CI/CD processes for company projects using GitHub Actions and AWS')
      ]),

      Text(h2, 'Lead Frontend Engineer'),
      Text(h3, 'Alqen - Las Vegas, Nevada (Remote Contract)'),
      Text(h3, 'June 2021 - June 2022'),
      Text(p, 'Led frontend development of Alqen, an e-commerce automation platform for Amazon and Walmart sellers, handling inventory management, bulk uploads, and order fulfillment across multiple channels.'),
      ul([
        Text(li, 'Built robust dashboards in Vue2/Vue3 using serverless AWS/Node/MongoDB backend for real-time order and inventory management'),
        Text(li, 'Developed real-time analytics interfaces displaying performance metrics, profit margins, and inventory levels from backend systems'),
        Text(li, 'Built frontend interfaces for Walmart and Stripe API integrations for automated order synchronization and payment processing'),
        Text(li, 'Created a user impersonation system using signed JWTs with specific permissions and short-lived expirations for customer support troubleshooting'),
        Text(li, 'Designed an incremental Vue2 to Vue3 adoption strategy, for gradual migration without breaking existing functionality'),
        Text(li, 'Helped build product listing management tools and automated repricing systems based on market conditions')
      ]),

      Text(h2, 'Frontend Developer & Designer'),
      Text(h3, 'Self-employed - Indianola, Iowa'),
      Text(h3, 'August 2014 - February 2016'),
      ul([
        Text(li, 'Various freelance design projects')
      ]),

      Text(h2, 'Frontend Developer'),
      Text(h3, 'SevenVerbs - Urbandale, Iowa (Full-time)'),
      Text(h3, 'April - August 2014'),
      ul([
        Text(li, 'Converted static designs into WordPress, Drupal, Sitefinity, and Joomla'),
        Text(li, 'Designed and developed websites, business cards, logos, infographics, and digital documents'),
        Text(li, 'Enhanced existing applications with new features and design improvements')
      ])
    ]),
    div({ class: 'grid-item' }, [
      Text(h1, 'Technical'),

      Text(h2, 'Languages & Technologies'),
      ul([
        Text(li, 'Extensive knowledge of JavaScript/TypeScript ecosystems and frameworks'),
        Text(li, 'Node, Deno, Express, Koa, Oak, Apollo GraphQL, MongoDB, PostgreSQL, Drizzle'),
        Text(li, 'AWS (Lambda, S3, API Gateway, Kinesis), GitHub Actions, CI/CD, Docker, Fly, Supabase'),
        Text(li, 'Vue2/Vue3, Pinia, Vue Router, TanStack/Query, tRPC/Zod, RxJS'),
        Text(li, 'Sass, Less, Stylus, PostCSS, Tailwind CSS'),
        Text(li, 'Some experience with Go for backend services and data processing'),
        Text(li, 'Python, Ruby, Rust, Elm, Elixir, SBCL Lisp (exposure and experimentation)')
      ]),

      Text(h2, 'Favorite Stack'),
      ul([
        Text(li, 'Vue + TSX, TypeScript + tRPC/Zod, TanStack/Query, Supabase, Deno + Oak, RxJS, Drizzle')
      ]),

      Text(h2, 'Development Philosophy'),
      ul([
        Text(li, 'Building minimal, user-focused web applications for over 10 years with an emphasis on platforms and dashboards'),
        Text(li, 'Expertise in functional programming patterns and designing optimal user experiences through iterative improvement and data-driven decisions'),
        Text(li, 'Focus on tiny app bundles, minimal UI design, and efficient architectures for maximum performance and usability'),
        Text(li, 'Preference for incremental adoption strategies and maintainable code that can evolve with changing requirements')
      ]),

      Text(h1, 'Design'),
      Text(h2, 'Web Design'),
      ul([
        Text(li, 'Deep understanding of responsive and adaptive mobile-first web application design'),
        Text(li, 'Expertise in creating and organizing UI kits and implementing comprehensive style guidelines')
      ]),
      Text(h2, 'Graphic Design'),
      ul([
        Text(li, 'Strong design sense with acute attention to detail'),
        Text(li, 'Extensive experience designing for both print and digital media'),
        Text(li, 'Proficient in design tools including Figma, Adobe Illustrator, Photoshop, and other creative design software')
      ]),

      Text(h1, 'Education'),
      Text(h2, 'Associate of Arts & Sciences'),
      Text(h3, '2012 - 2014'),
      Text(h3, 'DMACC Ankeny Campus'),
      ul([
        Text(li, 'Graphic Design with Web Emphasis')
      ]),
      Text(h2, 'High School Diploma'),
      Text(h3, '2008 - 2012'),
      Text(h3, 'Southeast Warren Jr. / Sr. High School'),
      ul([]),

      Text(h1, 'Experience'),
      Text(h2, 'Lead Developer'),
      Text(h3, 'Access Publishing Inc. - Johnston, Iowa (Full-time)'),
      Text(h3, 'February 2016 - November 2019'),
      Text(p, 'Led development of three specialized vehicle and equipment marketplaces (AccessTrucks, SleeperTrader, MachineryAccess) serving buyers and hundreds of dealerships nationwide.'),
      ul([
        Text(li, 'Developed systems to aggregate inventory from hundreds of dealerships using web scrapers and API integrations'),
        Text(li, 'Built data processing pipelines in Node and MongoDB handling inconsistent formats, duplicates, and constant updates'),
        Text(li, 'Developed image processing systems to optimize and standardize vehicle photos across platforms'),
        Text(li, 'Created Vue frontends with specialized filtering for truck specifications and heavy machinery details'),
        Text(li, 'Implemented integrated financing prequalification system for SleeperTrader buyers, managing complex API integrations across PHP, MySQL, MongoDB, and Node systems'),
        Text(li, 'Helped build dealer management portal in Angular for listing management, inquiry responses, and performance tracking'),
        Text(li, 'Designed conversion tracking system with Google Analytics integration and fine-grained event monitoring'),
        Text(li, 'Managed targeted social media marketing campaigns and implemented email notification system using Sparkpost'),
        Text(li, 'Optimized applications for SEO, mobile devices, and slow 3G connections using micro-frameworks and static rendering')
      ])
    ])
  ])
}

const Resume = (state, dispatch) => {
  return div({ class: 'resume' }, [
    Header(),
    div({ class: 'grid' }, [
      div({ class: 'grid-item', style: 'width: 100%' }, [
        Text(h1, 'The Gist'),
        Text(p, 'Full-Stack engineer with 10+ years building web applications and dashboards. Currently working on fraud detection integrations at Symetra, a leading insurance company. Previously led development of A/B testing platform processing 5M+ daily requests, e-commerce automation platform for Walmart/Amazon sellers, and vehicle marketplace systems serving hundreds of dealerships. Expertise in full-stack development with Vue, Node, Deno, PostgreSQL, MongoDB, and AWS infrastructure.')
      ])
    ]),
    Grid()
    // (() => {
    //   if (state.resume.success === null) {
    //     return div({ class: 'spinner-box' }, [
    //       div({ class: '_spinner' })
    //     ])
    //   }
    //   return state.resume.data
    // })()
  ])
}

export default {
  view: main(Resume),
  onroute: (state, dispatch) => {
    dispatch(resume.fetchResume)
  }
}
