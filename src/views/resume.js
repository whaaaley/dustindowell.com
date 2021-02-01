
import { div, h1, h2, h3, li, p, text, ul } from '../lib/vnodes/html'

import main from './_main'

const Text = (h, data) => h([text(data)])

const Header = () => {
  return div({ class: 'header' }, [
    Text(h1, 'Dustin Dowell')
  ])
}

// const Education = () => {
//   return div({ class: 'tile' }, [
//     Text(h1, 'Education'),
//     Text(h2, 'AAS - 2014'),
//     Text(p, 'Graphic Design / Web Design Emphasis'),
//     Text(p, 'DMACC Ankeny Campus'),
//     Text(h2, 'HS Diploma - 2012'),
//     Text(p, 'Southeast Warren Jr. / Sr. High School')
//   ])
// }

// const Technical = () => {
//   return div({ class: 'tile' }, [
//     Text(h1, 'Technical'),
//     Text(h2, 'Software'),
//     Text(p, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
//     Text(h2, 'Languages'),
//     Text(p, '• Extensive knowledge of JavaScript and how to optimize it.'),
//     Text(p, '• Some experience using TypeScript.'),
//     Text(p, '• Lots of experience with CSS preprocessors like Sass, Less, Stylus, and PostCSS'),
//     Text(h2, 'Content Management Systems'),
//     Text(p, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
//   ])
// }

const Design = () => {
  return div({ class: 'title ' }, [
    Text(h1, 'Design'),

    Text(h2, 'Web Design'),
    ul([
      Text(li, 'Understands how to create responsive and adapative with new and old technlogoy.'),
      Text(li, 'Knowledge of how to create and organize UI kits and style guidelines.'),
      Text(li, 'Love for minimal, clean CSS.')
    ]),

    Text(h2, 'Graphic Design'),
    Text(p, 'Great sense of design and acute attention to detail.'),
    Text(p, 'Graphic design is my passion.'),

    Text(h1, 'Technical'),
    Text(h2, 'Software'),
    Text(p, ''),
    Text(h2, 'Languages'),
    Text(p, '• Extensive knowledge of JavaScript and how to optimize it.'),
    Text(p, '• Some experience using TypeScript.'),
    Text(p, '• Lots of experience with CSS preprocessors like Sass, Less, Stylus, and PostCSS'),
    Text(h2, 'Content Management Systems'),
    Text(p, ''),

    Text(h1, 'Education'),
    Text(h2, 'AAS - 2014'),
    Text(p, 'Graphic Design / Web Design Emphasis'),
    Text(p, 'DMACC Ankeny Campus'),
    Text(h2, 'HS Diploma - 2012'),
    Text(p, 'Southeast Warren Jr. / Sr. High School')
  ])
}

const Experience = () => {
  return div({ class: 'tile' }, [
    Text(h1, 'Experience'),

    Text(h2, 'Front-end Developer'),
    Text(h3, 'SevenVerbs - Urbandale, Iowa'),
    Text(h3, 'April - August 2014'),
    ul([
      Text(li, 'Converted existing static web designs into WordPress, Drupal, Sitefinity, and Joomla.'),
      Text(li, 'Designed and developed original websites, business cards, logos, infographics, and other printed and digital documents.'),
      Text(li, 'Added features, tweaked designs, and updated content on existing apps.')
    ]),

    Text(h2, 'Front-end Developer and Designer'),
    Text(h3, 'Self-employed - Indianola, Iowa'),
    Text(h3, 'August 2014 - February 2016'),
    ul([
      Text(li, 'Various freelance design work.')
    ]),

    Text(h2, 'Senior Software Developer'),
    Text(h3, 'Access Publishing Inc. - Johnston, Iowa'),
    Text(h3, 'February 2016 - November 2019'),
    ul([
      Text(li, 'Designed and implemented a variety of aesthetically pleasing mobile-focused web apps, from the ground up, for aggregating and leasing/financing semi-trucks, semi-trailers, and heavy machinery.'),
      Text(li, 'Worked on Node.js microservices to automate data uploads of hundreds of thousands of site listings and images daily from each client\'s uniquely formatted data.'),
      Text(li, 'Heavily optimized web apps for SEO, mobile devices, and slow 3g connections, using micro-frameworks and custom static rendering solutions.'),
      Text(li, 'Designed and implemented inventory management and leasing/financing dashboards for large semi-truck and heavy machinery dealerships and lessors.'),
      Text(li, 'Worked with many frameworks and platforms like Vue.js, Hyperapp, Angular, Node.js, Express, Koa, Micro, Netlify, Heroku, and MongoDB.'),
      Text(li, 'Managed targeted social media marketing campaigns across popular platforms.'),
      Text(li, 'Implemented fine-grained conversion tracking with Google Analytics\' event system.'),
      Text(li, 'Implemented an email notification system using Sparkpost.')
    ]),

    Text(h2, 'Front-end Developer'),
    Text(h3, 'Self-employeed - Des Moines, Iowa'),
    Text(h3, 'November 2019 - Current'),
    ul([
      Text(li, 'Learning and creating new apps, libraries, and frameworks.'),
      Text(li, 'Various freelance design work.')
    ])
  ])
}

const Resume = (state, dispatch) => {
  return div({ class: 'resume' }, [
    Header(),
    // hr(),
    div({ class: 'grid' }, [
      Experience(),
      Design()
      // Technical()
      // Education()
    ])
  ])
}

export default {
  view: main(Resume),
  init: () => {
    console.log('resume')
  }
}
