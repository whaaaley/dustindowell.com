import { div, h1, h2, h3, p, text, a } from '../lib/vnodes/html'
import main from './_main'
import { Text, createImageTransition, ProductComponent } from './pdp-components'

// Helper function for additional features list item
const AdditionalFeatureItem = ({ title, description }) => {
  return div({ class: 'pdp-additional-feature-item' }, [
    div({ class: 'pdp-additional-feature-title' }, [text(title)]),
    div({ class: 'pdp-additional-feature-description' }, [text(description)])
  ])
}

// Helper function to create formatted entries similar to apps.js
const FeatureItem = ({ title, description }) => {
  return div({ class: 'pdp-feature-item' }, [
    Text(h3, title),
    Text(p, description)
  ])
}

// External link component
const ExternalLink = ({ href, linkText }) => {
  return a({ href, target: '_blank', rel: 'noreferrer noopener', class: 'pdp-external-link' }, [
    text(linkText)
  ])
}

// Internal navigation link component with button styling
const NavButton = ({ to, linkText }) => {
  const onclick = event => {
    event.preventDefault()
    history.pushState({}, '', to)
    window.dispatchEvent(new CustomEvent('popstate'))
  }

  return a({ href: to, class: 'pdp-nav-button', onclick }, [
    text(linkText)
  ])
}

const ComposePdp = (state, dispatch) => {
  // Initialize state for tracking the selected image index if it doesn't exist
  if (state.selectedImageIndex === undefined) {
    dispatch(state => {
      state.selectedImageIndex = 0
      return { state }
    })
  }

  // The main screenshots to use as primary images and thumbnails
  const mainScreenshots = [
    { src: '/screenshots/compose/33_experiment_report_calendar.png', alt: 'Experiment report calendar' },
    { src: '/screenshots/compose/16_project_experiment_list.png', alt: 'Project experiment list' },
    { src: '/screenshots/compose/20_experiment_variants.png', alt: 'Experiment variants' },
    { src: '/screenshots/compose/22_experiment_targeting.png', alt: 'Experiment targeting' },
    { src: '/screenshots/compose/24_experiment_traffic.png', alt: 'Experiment traffic' },
    { src: '/screenshots/compose/32_experiment_report_chart.png', alt: 'Experiment report chart' },
    { src: '/screenshots/compose/35_experiment_report_winner.png', alt: 'Experiment report winner' },
    { src: '/screenshots/compose/06_org_billing.png', alt: 'Organization billing' },
    { src: '/screenshots/compose/12_project_snippets.png', alt: 'Project snippets' }
  ]

  // Description and features content
  const descriptionText = 'Compose.co is an innovative A/B testing platform featuring the industry\'s only pay-as-you-go pricing model at $0.0012 per monthly tested user, with no contracts or base fees. The platform enables no-code split testing of websites, themes, and user experiences while automatically tracking key metrics like revenue, engagement, and conversion rates with built-in statistical significance calculations.'
  const additionalTextContent = 'Built with agency needs in mind, Compose offers flicker-free, high-performance testing via AWS Lambda@Edge, client management dashboards, and strategic CRO planning tools. Positioned as an affordable alternative to enterprise solutions like Optimizely and VWO, it gained significant traction as businesses migrated from Google Optimize, offering comparable functionality at substantially lower costs with transparent pricing.'

  // Main key features (most impressive and complex)
  const keyFeaturesContent = [
    {
      title: 'Real-Time Analytics',
      description: 'Automatic tracking with statistical significance calculations and conversion rate optimization insights'
    },
    {
      title: 'Revenue Tracking',
      description: 'Measure direct impact on sales and conversion value with automatic attribution to test variants'
    },
    {
      title: 'Advanced JavaScript',
      description: 'Create custom JavaScript variants and triggers for sophisticated tests beyond basic visual changes'
    },
    {
      title: 'Pay-As-You-Go',
      description: 'Only pay $0.0012 per monthly tested user, no contracts or base fees - the industry\'s only true usage-based pricing'
    }
  ]

  // Additional features (simpler list format)
  const additionalFeaturesContent = [
    {
      title: 'No-Code Testing',
      description: 'Create and run split tests without any coding skills'
    },
    {
      title: 'Preview Mode',
      description: 'Test your variants before publishing to live users'
    },
    {
      title: 'Flicker-Free',
      description: 'Client-side code prevents visual flashing during page loads'
    },
    {
      title: 'Shopify App',
      description: 'Seamless integration with your Shopify store'
    },
    {
      title: 'Geolocation Filtering',
      description: 'Target specific regions or countries for your tests'
    },
    {
      title: 'Device Metrics',
      description: 'Analyze performance across mobile, tablet, and desktop'
    }
  ]

  // Role narrative in more natural paragraph form
  const myRoleNarratives = [
    'I led the development of Compose, an A/B testing platform that Shopify stores use to optimize their conversions. I handled everything from the frontend dashboard (Vue3, Pinia, Tailwind) to the backend infrastructure (Node.js, AWS Lambda, Apollo, PostgreSQL, MongoDB) that processes over 5 million daily requests.',

    'The platform needed to be fast and reliable since businesses depend on accurate test results to make decisions. I set up the AWS infrastructure using serverless functions and databases that could scale automatically, plus built CI/CD pipelines so we could ship updates quickly without breaking things.',

    'I helped build our GDPR-compliant data collection system in Go, with Node.js for batch processing. We used AWS Kinesis for scalable data ingestion to track geolocation events and revenue data while maintaining user privacy.',

    'I also rescued some half-finished projects - some Shopify integrations and internal dashboards. Along the way, I experimented with AI features using OpenAI\'s APIs for content generation.',

    'The whole system had to work seamlessly with Shopify\'s ecosystem while being simple enough that non-technical store owners could run sophisticated A/B tests without needing a developer.'
  ]

  // Organize content to be passed as children to ProductComponent
  const productPageChildren = [
    div({ class: 'pdp-description-section' }, [
      p({ class: 'pdp-description' }, [text(descriptionText)]),

      div({ class: 'pdp-links' }, [
        ExternalLink({ href: 'https://app.compose.co/', linkText: 'Visit Compose App' }),
        ExternalLink({ href: 'https://compose.co/', linkText: 'Visit Compose Website' })
      ])
    ]),

    div({ class: 'pdp-separator' }),

    Text(h2, 'Technical Leadership & Development'),
    ...myRoleNarratives.map(paragraph =>
      p({ class: 'pdp-role-paragraph' }, [text(paragraph)])
    ),

    div({ class: 'pdp-separator' }),

    Text(h2, 'Key Features'),
    div({ class: 'pdp-features-grid' },
      keyFeaturesContent.map(feature => FeatureItem(feature))
    ),

    div({ class: 'pdp-separator' }),

    Text(h2, 'Additional Features'),
    div({ class: 'pdp-additional-features-list' },
      additionalFeaturesContent.map(feature => AdditionalFeatureItem(feature))
    )
  ]

  // Create a product object similar to sampleProduct in pdp.js
  const composeProduct = {
    title: 'Compose - A/B Testing Platform',
    images: mainScreenshots,
    currentImageIndex: state.selectedImageIndex,
    onImageSelect: index => {
      createImageTransition(dispatch, state.selectedImageIndex, index, mainScreenshots)
    }
  }

  return div({ class: 'pdp' }, [
    div({ class: 'head' }, [
      Text(h1, 'Compose: A/B Testing Platform'),
      div({ class: 'pdp-current-status' }, [
        text('Lead Engineer (Remote) • Udundi • May 2022 - Current')
      ])
    ]),

    // Render the product with all the necessary props for transitions
    ProductComponent({
      ...composeProduct,
      children: productPageChildren,
      baseImage: state.baseImage,
      fadeIn: state.fadeIn,
      isTransitioning: state.isTransitioning
    }),

    // Last updated date
    div({ class: 'pdp-last-updated' }, [
      text(`Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`)
    ]),

    // View All Projects button outside the product component
    div({ class: 'pdp-view-all-projects-container' }, [
      NavButton({ to: '/apps', linkText: 'View All Projects' })
    ])
  ])
}

export default {
  view: main(ComposePdp),
  onroute: () => {}
}
