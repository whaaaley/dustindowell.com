
import { div, h1, h2, h3, li, text, ul } from '../lib/vnodes/html'
// import { div, h1, h2, text } from '../lib/vnodes/html'
import main from './_main'

import * as resume from '../actions/resume'

const Text = (h, data) => h([text(data)])

const Header = () => {
  return div({ class: 'header' }, [
    Text(h1, 'Dustin Dowell'),
    div([
      Text(h2, 'Frontend Engineer'),
      Text(h2, 'Des Moines, Iowa 50309'),
      Text(h2, 'dustindowell22@gmail.com'),
      Text(h2, '515-689-5648')
    ])
  ])
}

/*
const Grid = () => {
  return div({ class: 'grid' }, [
    div({ class: 'grid-item' }, [
      Text(h1, 'Experience'),

      Text(h2, 'Lead Frontend Engineer'),
      Text(h3, 'Alqen - Des Moines, Iowa'),
      Text(h3, 'June 2021 - Present'),
      ul([
        Text(li, 'Maintained an existing Vue 2 application fixing bugs and adding features.'),
        Text(li, 'Designed and implimented a completely new Vue 3 application that wraps the pieces of the legacy dashboard as part of an incremental adoption strategy.'),
        Text(li, 'Ported legacy Vue 2 code to the new Vue 3 application.'),
        Text(li, 'Implimented onboarding and payment flows for new users and subscriptions.'),
        Text(li, 'Wrote a SSE (Server Sent Events) server in Node that receives miscellaneous events from our API service and forwared them to the frontend.'),
        Text(li, 'Created a user impersonation system using JWTs for administrators.'),
        Text(li, 'Took a leadership role and helped the team with strategizing and organizing our application at all levels.')
      ]),

      Text(h2, 'Frontend Developer & Designer'),
      Text(h3, 'Self-employed - Des Moines, Iowa'),
      Text(h3, 'November 2019 - June 2021'),
      ul([
        Text(li, 'Learning and creating new apps, libraries, and frameworks.'),
        Text(li, 'Various freelance development and design.')
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
      ])
    ]),
    div({ class: 'grid-item' }, [
      Text(h1, 'Technical'),

      Text(h2, 'Languages & Frameworks'),
      ul([
        Text(li, 'Extensive knowledge of JavaScript and JS frameworks like Vue, React, Hyperapp, and Mithril as well as their ecosystems.'),
        Text(li, 'Experience with Node.js and some of it\'s popular frameworks like Express, Koa, Micro.'),
        Text(li, 'Experience using platforms like Netlify, Vercel, Heroku, Serverless, Hasura, Supabase, and many more.'),
        Text(li, 'Experience writing GraphQL APIs on Hasura.'),
        Text(li, 'Lots of recent experience writing file servers and SSE servers using Deno!'),
        Text(li, 'Some experience using TypeScript.'),
        Text(li, 'Hello world\'s completed in Ruby, Python, Elm, and Rust.'),
        Text(li, 'Tons of experience with CSS and CSS preprocessors.')
      ]),
      Text(h2, 'Creative Software'),
      ul([
        Text(li, 'Experienced with all kinds of creative software like Blender, Autodesk 3ds Max, Photoshop, Illustrator, After Effects, Procreate, ArtStudio Pro, Medibang, and more.')
      ]),
      Text(h2, 'Content Management'),
      ul([
        Text(li, 'Lots of experience with database as a service systems like Hasura, MongoDB, Supabase, and some experience with Firebase.'),
        Text(li, 'Experience with all the classic systems like WordPress, Drupal, Sitefinity, and Joomla.'),
        Text(li, 'Some experience with less popular miscellaneous systems like Netlify CMS, Grav CMS, Pico, Kirby, and Craft.')
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

console.log(JSON.stringify(Grid()))
*/

const Resume = (state, dispatch) => {
  return div({ class: 'resume' }, [
    Header(),
    // Grid()
    (() => {
      if (state.resume.success === null) {
        return div({ class: 'spinner-box' }, [
          div({ class: '_spinner' })
        ])
      }
      return state.resume.data
    })()
  ])
}

export default {
  view: main(Resume),
  onroute: (state, dispatch) => {
    dispatch(resume.fetchResume)
  }
}
