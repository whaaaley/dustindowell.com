import { div, h1, h2, h3, p, text, a, img } from '../lib/vnodes/html'
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

const AlqenPdp = (state, dispatch) => {
  // Initialize state for tracking the selected image index if it doesn't exist
  if (state.selectedImageIndex === undefined) {
    dispatch(state => ({ ...state, selectedImageIndex: 0 }))
  }

  // The main screenshots to use as primary images and thumbnails
  const mainScreenshots = [
    { src: '/screenshots/alqen/02_statistics_overview.png', alt: 'Statistics overview' },
    { src: '/screenshots/alqen/12_manual_fulfillment_with_impersonation.png', alt: 'Manual fulfillment with impersonation' },
    { src: '/screenshots/alqen/06_frequency_chart.png', alt: 'Frequency chart' },
    { src: '/screenshots/alqen/09_realtime_orders.png', alt: 'Realtime orders' },
    { src: '/screenshots/alqen/01_listings.png', alt: 'Product listings' },
    { src: '/screenshots/alqen/13_billing.png', alt: 'Billing' },
    { src: '/screenshots/alqen/11_bulk_upload.png', alt: 'Bulk product uploader' },
    { src: '/screenshots/alqen/10_sales_tracker.png', alt: 'Sales tracker' },
    { src: '/screenshots/alqen/08_integrations.png', alt: 'Integrations' }
  ]

  // Description and features content
  const descriptionText = 'Alqen.io is an e-commerce automation platform for Amazon and Walmart sellers that handles inventory management, bulk product uploads, order fulfillment, payment processing, and real-time marketplace synchronization. The platform helps sellers find profitable products and efficiently process orders across multiple channels while reducing manual intervention to optimize their operations.'
  const additionalTextContent = 'The platform bridges the gap between marketplaces and suppliers, enabling seamless product listing, order fulfillment, and inventory management. Alqen provides sellers with real-time analytics, automated repricing capabilities, and impersonation features for customer service, positioning it as an essential tool for scaling e-commerce businesses.'

  // Main key features (most impressive and complex)
  const keyFeaturesContent = [
    {
      title: 'Automated Order Processing',
      description: 'Instant order synchronization between Walmart Marketplace and supplier systems with automatic payment processing and fulfillment'
    },
    {
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboard with performance metrics, revenue tracking, and inventory insights for data-driven decision making'
    },
    {
      title: 'Inventory Management',
      description: 'Automated stock level synchronization across platforms to prevent overselling and maintain accurate listings'
    },
    {
      title: 'Impersonation System',
      description: 'Advanced customer service tools allowing support staff to impersonate sellers for troubleshooting and order management'
    }
  ]

  // Additional features (simpler list format)
  const additionalFeaturesContent = [
    {
      title: 'Bulk Product Listing',
      description: 'Upload and manage multiple products simultaneously'
    },
    {
      title: 'Automated Repricing',
      description: 'Dynamic price adjustments based on market conditions'
    },
    {
      title: 'Performance Metrics',
      description: 'Track seller rating, feedback, and account health'
    },
    {
      title: 'Multi-Account Management',
      description: 'Control multiple Walmart seller accounts from one interface'
    },
    {
      title: 'Order Filtering',
      description: 'Customizable filters to organize and prioritize orders'
    },
    {
      title: 'Error Handling',
      description: 'Automated detection and resolution of common issues'
    }
  ]

  // Role narrative in more natural paragraph form
  const myRoleNarratives = [
    'I led the frontend development of Alqen.io, an e-commerce automation platform for Walmart Marketplace sellers. I built the dashboard with Vue2/Vue3 that interfaced with a serverless AWS/Node.js/MongoDB backend to display thousands of daily orders and real-time inventory updates.',

    'The platform needed reliable integration with Walmart\'s API for order syncing and payment processing. I built the frontend interfaces for Walmart and Stripe API integrations and implemented real-time order tracking so sellers could monitor orders and inventory without refreshing.',

    'I created analytics views that displayed performance metrics, profit margins, and inventory levels from the backend systems, plus product listing management tools for editing and updating listings. The dashboard helped sellers spot trends and optimize their operations across multiple channels.',

    'I also built the frontend for an impersonation system that let customer support troubleshoot issues by temporarily accessing seller accounts with proper permission controls.',

    'I modernized the platform by porting Vue2 components to Vue3 and designed strategies for incremental adoption without breaking the existing system.'
  ]

  // Organize content to be passed as children to ProductComponent
  const productPageChildren = [
    div({ class: 'pdp-description-section' }, [
      p({ class: 'pdp-description' }, [text(descriptionText)]),

      div({ class: 'pdp-links' }, [
        ExternalLink({
          href: 'https://alqen.com/',
          linkText: 'View Alqen Website'
        })
      ])
    ]),

    div({ class: 'pdp-separator' }),

    Text(h2, 'Frontend Development'),
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

  // Create a product object similar to composeProduct in compose-pdp.js
  const alqenProduct = {
    title: 'Alqen - E-Comm Automation Platform',
    images: mainScreenshots,
    currentImageIndex: state.selectedImageIndex,
    onImageSelect: index => {
      createImageTransition(dispatch, state.selectedImageIndex, index, mainScreenshots)
    }
  }

  return div({ class: 'pdp' }, [
    div({ class: 'head' }, [
      Text(h1, 'Alqen: E-Comm Automation Platform'),
      div({ class: 'pdp-current-status' }, [
        text('Lead Frontend Engineer (Remote) • Alqen • June 2021 - June 2022')
      ])
    ]),

    // Render the product with all the necessary props for transitions
    ProductComponent({
      ...alqenProduct,
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
  view: main(AlqenPdp),
  onroute: () => {}
}
