
import { div, h1, h2, h3, li, text, ul } from '../lib/vnodes/html'
// import { div, h1, h2, text } from '../lib/vnodes/html'
import main from './_main'

import * as resume from '../actions/resume'

const Text = (h, data) => h([text(data)])

const Header = () => {
  return div({ class: 'header' }, [
    Text(h1, 'Dustin Dowell'),
    div([
      Text(h2, 'Full-Stack Developer'),
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

      Text(h2, 'Lead Engineer (Remote)'),
      Text(h3, 'Udundi - Austin, Texas'),
      Text(h3, 'May 2022 - Current'),
      ul([
        Text(li, 'Developed the frontend for an A/B testing and analytics dashboard for Shopify store owners using Vue3, Pinia, Apollo, Tailwind, and Vite.'),
        Text(li, 'Setup automatic deployment processes for all of our projects using Github Actions and AWS.'),
        Text(li, 'Worked extensively on our backend services using Node, Mongo, Apollo, and GraphQL to add functionality.'),
        Text(li, 'Worked on bringing previously unfinished projects using Vue2, Node, and MongoDB across the finish line.'),
        Text(li, 'Developed previously unfinished Shopify extensions across the finish line.'),
        Text(li, 'Developed multiple landing pages for previously unfinished projects and products in Vue3.'),
        Text(li, 'Developed the frontend for a shipping protection dashboard targeted at Shopify store owners.'),
        Text(li, 'Configured a large portion of AWS to run our applications. Including Elastic beanstalk, Serverless Functions with Lambda, S3, Cognito, API Gateway, etc')
      ]),

      Text(h2, 'Lead Frontend Engineer (Remote)'),
      Text(h3, 'Alqen - Las Vegas, Nevada'),
      Text(h3, 'June 2021 - June 2022'),
      ul([
        Text(li, 'Developed multiple internal dashboards in both Vue2 and Vue3 for a variety of automated dropshipping products.'),
        Text(li, 'Developed realtime events services (backend) that integrated into our existing backend and wrote frontend features to display those realtime events.'),
        Text(li, 'Modernized and ported old Vue2 dashboards to Vue3.'),
        Text(li, 'Designed strategies to incrementally adopt Vue3 while maintaining the existing Vue2 project.'),
        Text(li, 'Developed custom integrations for payment methods using Walmart and Stripe APIs.'),
        Text(li, 'Created robust impersonation features for product admins to act on behalf of individual users to offer technical support.')
      ]),

      Text(h2, 'Frontend Developer & Designer'),
      Text(h3, 'Self-employed - Des Moines, Iowa'),
      Text(h3, 'November 2019 - June 2021'),
      ul([
        Text(li, 'Learning and creating new apps, libraries, and frameworks.'),
        Text(li, 'Various freelance development and design.')
      ]),






      Text(h1, 'Design'),
      Text(h2, 'Web Design'),
      ul([
        Text(li, 'Deep understanding of how to design responsive and adaptive mobile-first web apps.'),
        Text(li, 'Knowledge of how to create and organize UI kits and implement style guidelines.'),
        Text(li, 'Love for minimal CSS.')
      ]),
      Text(h2, 'Graphic Design'),
      ul([
        Text(li, 'Great sense of design and acute attention to detail.'),
        Text(li, 'Lots of experience designing for both print and digital.')
      ]),



    ]),
    div({ class: 'grid-item' }, [





      Text(h2, 'Senior Software Developer'),
      Text(h3, 'Access Publishing Inc. - Johnston, Iowa'),
      Text(h3, 'February 2016 - November 2019'),
      ul([
        Text(li, 'Designed unique aesthetic mobile-first web apps.'),
        Text(li, 'Implemented a variety of responsive web apps from the ground up for aggregating and leasing/financing semi-trucks, semi-trailers, and heavy machinery.'),
        Text(li, 'Worked on Node.js microservices to automate data uploads of hundreds of thousands of site listings and images daily from each client\'s unique data structures.'),
        Text(li, 'Heavily optimized web apps for SEO, mobile devices, and slow 3g connections, using micro-frameworks and a custom static rendering solution.'),
        Text(li, 'Designed and implemented inventory management and leasing/financing dashboards for large semi-truck and heavy machinery dealerships and lessors.'),
        Text(li, 'Worked with many frameworks and platforms like Vue.js, Hyperapp, Angular, Node.js, Express, Koa, Micro, Netlify, Heroku, AWS, and MongoDB.'),
        Text(li, 'Managed targeted social media marketing campaigns across popular platforms.'),
        Text(li, 'Implemented fine-grained conversion tracking with Google Analytics event system.'),
        Text(li, 'Implemented an email notification system using Sparkpost.')
      ]),

      Text(h2, 'Frontend Developer & Designer'),
      Text(h3, 'Self-employed - Indianola, Iowa'),
      Text(h3, 'August 2014 - February 2016'),
      ul([
        Text(li, 'Various freelance design.')
      ]),

      Text(h2, 'Frontend Developer'),
      Text(h3, 'SevenVerbs - Urbandale, Iowa'),
      Text(h3, 'April - August 2014'),
      ul([
        Text(li, 'Converted existing static web designs into WordPress, Drupal, Sitefinity, and Joomla.'),
        Text(li, 'Designed and developed original websites, business cards, logos, infographics, and other printed and digital documents.'),
        Text(li, 'Added features, tweaked designs, and updated content on existing apps.')
      ]),







      Text(h1, 'Technical'),

      Text(h2, 'Software'),
      ul([
        Text(li, 'Experienced with all kinds of creative software like Blender, Autodesk 3ds Max, Photoshop, Illustrator, After Effects, Procreate, ArtStudio Pro, Medibang, and more.')
      ]),
      Text(h2, 'Languages'),
      ul([
        Text(li, 'Extensive knowledge of JavaScript and JS frameworks.'),
        Text(li, 'Some experience using TypeScript.'),
        Text(li, 'Hello world\'s completed in SBCL Lisp, Go, Ruby, Python, Elm, and Rust.'),
        Text(li, 'Tons of experience with CSS preprocessors like Sass, Less, Stylus, and PostCSS.')
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
      Text(h3, 'Southeast Warren Jr. / Sr. High School')


    ])
  ])
}

const Resume = (state, dispatch) => {
  return div({ class: 'resume' }, [
    Header(),
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
