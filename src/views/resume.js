
import { div, h1, h2, h3, li, p, text, ul } from '../lib/vnodes/html'

import main from './_main'

const Text = (h, data) => h([text(data)])

const Header = () => {
  return div({ class: 'header' }, [
    Text(h1, 'Dustin Dowell'),
    div([
      Text(h2, 'Frontend Developer'),
      Text(h2, 'Des Moines, Iowa 50309'),
      Text(h2, 'dustindowell22@gmail.com'),
      Text(h2, '515-689-5648')
    ])
  ])
}

const Design = () => {
  return div({ class: 'tile' }, [
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

    Text(h1, 'Technical'),
    Text(h2, 'Software'),
    ul([
      Text(li, 'Experienced with all kinds of creative software like Blender, Autodesk 3ds Max, Photoshop, Illustrator, After Effects, Procreate, ArtStudio Pro, Medibang, and more.')
    ]),

    Text(h2, 'Languages'),
    ul([
      Text(li, 'Extensive knowledge of JavaScript and JS frameworks.'),
      Text(li, 'Some experience using TypeScript.'),
      Text(li, 'Hello world\'s completed in Ruby, Python, Elm, and Rust'),
      Text(li, 'Tons of experience with CSS preprocessors like Sass, Less, Stylus, and PostCSS')
    ]),

    Text(h2, 'Content Management Systems'),
    ul([
      Text(li, 'Extensive experience with WordPress, Drupal, Sitefinity, and Joomla.'),
      Text(li, 'Some experience with Netlify CMS, Grav CMS, Pico, Kirby, and Craft.')
    ]),

    Text(h1, 'Education'),
    Text(h2, 'Associate of Arts and Sciences'),
    Text(h3, '2012 - 2014'),
    Text(h3, 'DMACC Ankeny Campus'),
    ul([
      Text(li, 'Graphic Design with Web Emphasis')
    ]),
    Text(h2, 'High School Diploma'),
    Text(h3, '2008 - 2012'),
    Text(h3, 'Southeast Warren Jr. / Sr. High School')
  ])
}

const Experience = () => {
  return div({ class: 'tile' }, [
    Text(h1, 'Experience'),

    Text(h2, 'Frontend Developer'),
    Text(h3, 'SevenVerbs - Urbandale, Iowa'),
    Text(h3, 'April - August 2014'),
    ul([
      Text(li, 'Converted existing static web designs into WordPress, Drupal, Sitefinity, and Joomla.'),
      Text(li, 'Designed and developed original websites, business cards, logos, infographics, and other printed and digital documents.'),
      Text(li, 'Added features, tweaked designs, and updated content on existing apps.')
    ]),

    Text(h2, 'Frontend Developer and Designer'),
    Text(h3, 'Self-employed - Indianola, Iowa'),
    Text(h3, 'August 2014 - February 2016'),
    ul([
      Text(li, 'Various freelance design.')
    ]),

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
      Text(li, 'Implemented fine-grained conversion tracking with Google Analytics\' event system.'),
      Text(li, 'Implemented an email notification system using Sparkpost.')
    ]),

    Text(h2, 'Frontend Developer'),
    Text(h3, 'Self-employed - Des Moines, Iowa'),
    Text(h3, 'November 2019 - Current'),
    ul([
      Text(li, 'Learning and creating new apps, libraries, and frameworks.'),
      Text(li, 'Various freelance design.')
    ])
  ])
}

const Resume = (state, dispatch) => {
  return div({ class: 'resume' }, [
    Header(),
    div({ class: 'grid' }, [
      Experience(),
      Design()
    ])
  ])
}

export default {
  view: main(Resume),
  init: () => {
    console.log('resume')
  }
}
