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

const AccessPdp = (state, dispatch) => {
  // Initialize state for tracking the selected image index if it doesn't exist
  if (state.selectedImageIndex === undefined) {
    dispatch(state => ({ ...state, selectedImageIndex: 0 }))
  }

  // The main screenshots to use as primary images and thumbnails
  const mainScreenshots = [
    { src: '/screenshots/access/01_accesspublishing_thumbnail.png', alt: 'Access Publishing Vehicle Marketplaces' },
    { src: '/screenshots/access/02_accesstrucks_products.png', alt: 'AccessTrucks products page' },
    { src: '/screenshots/access/03_accesstrucks_filters.png', alt: 'AccessTrucks filters' },
    { src: '/screenshots/access/04_accesstrucks_pdp.png', alt: 'AccessTrucks product listing' },
    { src: '/screenshots/access/05_machineryaccess_products.png', alt: 'MachineryAccess products page' },
    { src: '/screenshots/access/06_machineryaccess_pdp.png', alt: 'MachineryAccess equipment listing' },
    { src: '/screenshots/access/07_sleepertrader_products.png', alt: 'SleeperTrader products page' },
    { src: '/screenshots/access/08_sleepertrader_filters.png', alt: 'SleeperTrader filters' },
    { src: '/screenshots/access/09_sleepertrader_pdp.png', alt: 'SleeperTrader product listing' }
  ]

  // Description and features content
  const descriptionText = 'Access Publishing is a digital marketing company that transitioned from print magazines to specialized vehicle and equipment listing platforms. The company runs three major online marketplaces: AccessTrucks for box trucks, SleeperTrader for semi trucks with sleepers, and MachineryAccess for heavy machinery, aggregating inventory from hundreds of dealerships to provide a platform for commercial vehicle and equipment buyers.'
  const additionalTextContent = 'Each platform was designed with specialized features for its specific market segment, including advanced filtering options, dealer portals, and auction event tracking. The sites collectively serve thousands of dealers and buyers, streamlining the process of finding and listing specialized vehicles and equipment.'

  // Main key features (most impressive and complex)
  const keyFeaturesContent = [
    {
      title: 'Multi-Source Aggregation',
      description: 'Custom-built scrapers and API integrations to collect and normalize inventory data from hundreds of dealerships across the country'
    },
    {
      title: 'Financing Prequalification',
      description: 'Integrated application system for SleeperTrader allowing potential buyers to get prequalified for financing directly through the platform'
    },
    {
      title: 'Dealer Management Portal',
      description: 'Comprehensive backend system for dealers to manage listings, track performance metrics, and optimize their online presence'
    },
    {
      title: 'Conversion Tracking',
      description: 'Advanced analytics system to track user interactions, lead generation, and conversion rates across all platforms'
    }
  ]

  // Additional features (simpler list format)
  const additionalFeaturesContent = [
    {
      title: 'Advanced Filtering',
      description: 'Detailed filtering by specifications unique to each vehicle type'
    },
    {
      title: 'Lead Generation',
      description: 'Integrated inquiry forms with dealer notification systems'
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first interfaces optimized for on-the-go shopping'
    },
    {
      title: 'SEO Optimization',
      description: 'Structured data and performance tuning for maximum visibility'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive metrics for site owners and participating dealers'
    },
    {
      title: 'Inventory Management',
      description: 'Tools for dealers to manage and update their vehicle listings'
    }
  ]

  // Role narrative in more natural paragraph form
  const myRoleNarratives = [
    'I led development at Access Publishing, building three vehicle and equipment marketplaces from scratch. I designed systems to pull inventory data from hundreds of dealerships nationwide, clean it up, and display hundreds of thousands of listings through search interfaces for buyers.',

    'One of the biggest challenges was getting consistent data from inconsistent sources. I built web scrapers and API integrations to collect listings from dealer websites, third-party services, and industry databases. The data processing pipelines used Node.js and MongoDB to handle messy formats, duplicate listings, and constant updates without breaking, plus image processing pipelines to optimize and standardize vehicle photos.',

    'I built the frontend with Vue 2, focusing on rotating relevant product listings so users didn\'t have to search, driving traffic from social network ads. Each marketplace had specialized filters - truck specs for AccessTrucks and SleeperTrader, equipment details for MachineryAccess.',

    'I managed developers who built a dealer portal in Angular so sellers could manage their listings, respond to inquiries, and track performance. I also managed the team that wrote the PHP financing application and handled the frontend integration to provide buyers financing options.'
  ]

  // Organize content to be passed as children to ProductComponent
  const productPageChildren = [
    div({ class: 'pdp-description-section' }, [
      p({ class: 'pdp-description' }, [text(descriptionText)]),

      div({ class: 'pdp-links' }, [
        ExternalLink({
          href: 'https://accesstrucks.com/',
          linkText: 'View AccessTrucks Website'
        }),
        ExternalLink({
          href: 'https://sleepertrader.com/',
          linkText: 'View SleeperTrader Website'
        }),
        ExternalLink({
          href: 'https://machineryaccess.com/',
          linkText: 'View MachineryAccess Website'
        })
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

  // Create a product object similar to composeProduct in compose-pdp.js
  const accessProduct = {
    title: 'Access Publishing - Vehicle & Equipment Marketplaces',
    images: mainScreenshots,
    currentImageIndex: state.selectedImageIndex,
    onImageSelect: index => {
      createImageTransition(dispatch, state.selectedImageIndex, index, mainScreenshots)
    }
  }

  return div({ class: 'pdp' }, [
    div({ class: 'head' }, [
      Text(h1, 'Access Publishing: Vehicle & Equipment Marketplaces'),
      div({ class: 'pdp-current-status' }, [
        text('Lead Developer • Access Publishing • Feb 2016 - Nov 2019')
      ])
    ]),

    // Render the product with all the necessary props for transitions
    ProductComponent({
      ...accessProduct,
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
  view: main(AccessPdp),
  onroute: () => {}
}
