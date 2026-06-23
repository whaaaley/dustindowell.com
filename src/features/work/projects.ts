// Project data for the work page. Each project gets a sidebar entry and a presentation view.
// Grouped by category so the sidebar can organize them.
// Ordered most-recent-first so categories and projects within them appear newest-first in the sidebar.

export type ProjectImage = {
  src: string
  alt: string
}

export type ProjectLink = {
  label: string
  href: string
}

export type ProjectFeature = {
  title: string
  description: string
}

// Detail content ported from the original PDP pages.
// Present only on projects that had a dedicated detail page; the rest render body + stack only.
export type ProjectDetail = {
  description: string
  links: ProjectLink[]
  roleHeading: string
  roleNarrative: string[]
  keyFeatures: ProjectFeature[]
  additionalFeatures: ProjectFeature[]
}

export type Project = {
  slug: string
  title: string
  category: string
  dates: string
  tagline: string
  body: string[]
  stack: string[]
  images?: ProjectImage[]
  detail?: ProjectDetail
}

export const projects: Project[] = [{
  slug: 'symetra',
  title: 'Symetra',
  category: 'Cloud / Backend',
  dates: 'Jul 2025 - Current',
  tagline: 'Fraud detection integrations for a national insurance carrier.',
  body: [
    'Building fraud detection product integrations on the Integration Services team at Symetra, a leading life insurance and financial services company.',
    'Developed serverless fraud prevention solutions in Python on AWS Lambda, provisioned with CloudFormation and instrumented with DataDog monitoring.',
    'Worked within Azure DevOps pipelines to ship and observe integrations safely across environments.',
  ],
  stack: ['Python', 'AWS Lambda', 'CloudFormation', 'DataDog', 'Azure DevOps'],
}, {
  slug: 'compose',
  title: 'Compose',
  category: 'Platforms',
  dates: 'Sep 2022 - Jun 2025',
  tagline: 'A/B testing platform with no-code tools and deep Shopify integration.',
  body: [
    'Led development of Compose.co, an A/B testing and analytics platform for Shopify stores. Built a scalable system processing over 5 million daily requests.',
    'Architected the full-stack platform on Vue3, Pinia, Tailwind, Node, PostgreSQL, and MongoDB, deployed on AWS serverless infrastructure (Lambda, S3, API Gateway).',
    'Implemented real-time analytics with statistical significance calculations and revenue tracking, plus a GDPR-compliant data collection pipeline in Go feeding AWS Kinesis.',
  ],
  stack: ['Vue 3', 'Pinia', 'Node', 'PostgreSQL', 'MongoDB', 'Go', 'AWS Lambda', 'Kinesis'],
  images: [
    { src: '/screenshots/compose/33_experiment_report_calendar.png', alt: 'Experiment report calendar' },
    { src: '/screenshots/compose/16_project_experiment_list.png', alt: 'Project experiment list' },
    { src: '/screenshots/compose/20_experiment_variants.png', alt: 'Experiment variants' },
    { src: '/screenshots/compose/22_experiment_targeting.png', alt: 'Experiment targeting' },
    { src: '/screenshots/compose/24_experiment_traffic.png', alt: 'Experiment traffic' },
    { src: '/screenshots/compose/32_experiment_report_chart.png', alt: 'Experiment report chart' },
    { src: '/screenshots/compose/35_experiment_report_winner.png', alt: 'Experiment report winner' },
    { src: '/screenshots/compose/06_org_billing.png', alt: 'Organization billing' },
    { src: '/screenshots/compose/12_project_snippets.png', alt: 'Project snippets' },
  ],
  detail: {
    description: 'Compose.co is an innovative A/B testing platform featuring the industry\'s only pay-as-you-go pricing model at $0.0012 per monthly tested user, with no contracts or base fees. The platform enables no-code split testing of websites, themes, and user experiences while automatically tracking key metrics like revenue, engagement, and conversion rates with built-in statistical significance calculations.',
    links: [
      { label: 'Visit Compose App', href: 'https://app.compose.co/' },
      { label: 'Visit Compose Website', href: 'https://compose.co/' },
    ],
    roleHeading: 'Technical Leadership & Development',
    roleNarrative: [
      'I led the development of Compose, an A/B testing platform that Shopify stores use to optimize their conversions. I handled everything from the frontend dashboard (Vue3, Pinia, Tailwind) to the backend infrastructure (Node.js, AWS Lambda, Apollo, PostgreSQL, MongoDB) that processes over 5 million daily requests.',
      'The platform needed to be fast and reliable since businesses depend on accurate test results to make decisions. I set up the AWS infrastructure using serverless functions and databases that could scale automatically, plus built CI/CD pipelines so we could ship updates quickly without breaking things.',
      'I helped build our GDPR-compliant data collection system in Go, with Node.js for batch processing. We used AWS Kinesis for scalable data ingestion to track geolocation events and revenue data while maintaining user privacy.',
      'I also rescued some half-finished projects - some Shopify integrations and internal dashboards. Along the way, I experimented with AI features using OpenAI\'s APIs for content generation.',
      'The whole system had to work seamlessly with Shopify\'s ecosystem while being simple enough that non-technical store owners could run sophisticated A/B tests without needing a developer.',
    ],
    keyFeatures: [
      { title: 'Real-Time Analytics', description: 'Automatic tracking with statistical significance calculations and conversion rate optimization insights' },
      { title: 'Revenue Tracking', description: 'Measure direct impact on sales and conversion value with automatic attribution to test variants' },
      { title: 'Advanced JavaScript', description: 'Create custom JavaScript variants and triggers for sophisticated tests beyond basic visual changes' },
      { title: 'Pay-As-You-Go', description: 'Only pay $0.0012 per monthly tested user, no contracts or base fees - the industry\'s only true usage-based pricing' },
    ],
    additionalFeatures: [
      { title: 'No-Code Testing', description: 'Create and run split tests without any coding skills' },
      { title: 'Preview Mode', description: 'Test your variants before publishing to live users' },
      { title: 'Flicker-Free', description: 'Client-side code prevents visual flashing during page loads' },
      { title: 'Shopify App', description: 'Seamless integration with your Shopify store' },
      { title: 'Geolocation Filtering', description: 'Target specific regions or countries for your tests' },
      { title: 'Device Metrics', description: 'Analyze performance across mobile, tablet, and desktop' },
    ],
  },
}, {
  slug: 'alqen',
  title: 'Alqen',
  category: 'Platforms',
  dates: 'Jun 2021 - Jun 2022',
  tagline: 'E-commerce automation for Amazon and Walmart sellers.',
  body: [
    'Led frontend development of an e-commerce automation platform handling inventory management, bulk uploads, and order fulfillment across multiple channels.',
    'Built dashboards in Vue2/Vue3 over a serverless AWS/Node/MongoDB backend, using an incremental migration strategy to Vue3 without breaking existing functionality.',
    'Created a user impersonation system with signed, short-lived JWTs for customer support, plus Walmart and Stripe integrations for order sync and payments.',
  ],
  stack: ['Vue 2', 'Vue 3', 'Node', 'MongoDB', 'AWS', 'Stripe API'],
  images: [
    { src: '/screenshots/alqen/02_statistics_overview.png', alt: 'Statistics overview' },
    { src: '/screenshots/alqen/12_manual_fulfillment_with_impersonation.png', alt: 'Manual fulfillment with impersonation' },
    { src: '/screenshots/alqen/06_frequency_chart.png', alt: 'Frequency chart' },
    { src: '/screenshots/alqen/09_realtime_orders.png', alt: 'Realtime orders' },
    { src: '/screenshots/alqen/01_listings.png', alt: 'Product listings' },
    { src: '/screenshots/alqen/13_billing.png', alt: 'Billing' },
    { src: '/screenshots/alqen/11_bulk_upload.png', alt: 'Bulk product uploader' },
    { src: '/screenshots/alqen/10_sales_tracker.png', alt: 'Sales tracker' },
    { src: '/screenshots/alqen/08_integrations.png', alt: 'Integrations' },
  ],
  detail: {
    description: 'Alqen is an e-commerce automation platform for Amazon and Walmart sellers that handles inventory management, bulk product uploads, order fulfillment, payment processing, and real-time marketplace synchronization. The platform helps sellers find profitable products and efficiently process orders across multiple channels while reducing manual intervention to optimize their operations.',
    links: [
      { label: 'View Alqen Website', href: 'https://alqen.com/' },
    ],
    roleHeading: 'Frontend Development',
    roleNarrative: [
      'I led the frontend development of Alqen, an e-commerce automation platform for Walmart Marketplace sellers. I built the dashboard with Vue2/Vue3 that interfaced with a serverless AWS/Node.js/MongoDB backend to display thousands of daily orders and real-time inventory updates.',
      'The platform needed reliable integration with Walmart\'s API for order syncing and payment processing. I built the frontend interfaces for Walmart and Stripe API integrations and implemented real-time order tracking so sellers could monitor orders and inventory without refreshing.',
      'I created analytics views that displayed performance metrics, profit margins, and inventory levels from the backend systems, plus product listing management tools for editing and updating listings. The dashboard helped sellers spot trends and optimize their operations across multiple channels.',
      'I also built the frontend for an impersonation system that let customer support troubleshoot issues by temporarily accessing seller accounts with proper permission controls.',
      'I modernized the platform by porting Vue2 components to Vue3 and designed strategies for incremental adoption without breaking the existing system.',
    ],
    keyFeatures: [
      { title: 'Automated Order Processing', description: 'Instant order synchronization between Walmart Marketplace and supplier systems with automatic payment processing and fulfillment' },
      { title: 'Real-Time Analytics', description: 'Comprehensive dashboard with performance metrics, revenue tracking, and inventory insights for data-driven decision making' },
      { title: 'Inventory Management', description: 'Automated stock level synchronization across platforms to prevent overselling and maintain accurate listings' },
      { title: 'Impersonation System', description: 'Advanced customer service tools allowing support staff to impersonate sellers for troubleshooting and order management' },
    ],
    additionalFeatures: [
      { title: 'Bulk Product Listing', description: 'Upload and manage multiple products simultaneously' },
      { title: 'Automated Repricing', description: 'Dynamic price adjustments based on market conditions' },
      { title: 'Performance Metrics', description: 'Track seller rating, feedback, and account health' },
      { title: 'Multi-Account Management', description: 'Control multiple Walmart seller accounts from one interface' },
      { title: 'Order Filtering', description: 'Customizable filters to organize and prioritize orders' },
      { title: 'Error Handling', description: 'Automated detection and resolution of common issues' },
    ],
  },
}, {
  slug: 'udundi',
  title: 'Udundi',
  category: 'Agency / Web',
  dates: 'May 2022 - Sep 2022',
  tagline: 'Shopify-focused web agency: shipping stalled products and marketing sites.',
  body: [
    'Led engineering across multiple Udundi initiatives, focused on bringing unfinished products to a launchable state and establishing development infrastructure.',
    'Inherited Vue2/Node projects and drove them to completion by reducing scope while preserving the original design, including Shopify extensions launched to production.',
    'Built Vue3 marketing sites for the Compose.co product and the Udundi agency, and established CI/CD on GitHub Actions and AWS.',
  ],
  stack: ['Vue 2', 'Vue 3', 'Node', 'Shopify', 'GitHub Actions', 'AWS'],
}, {
  slug: 'sevenverbs',
  title: 'SevenVerbs',
  category: 'Agency / Web',
  dates: 'Apr 2014 - Aug 2014',
  tagline: 'CMS theming and design work at a web development agency.',
  body: [
    'Converted static designs into working themes across WordPress, Drupal, Sitefinity, and Joomla.',
    'Designed and developed websites alongside business cards, logos, infographics, and digital documents.',
    'Enhanced existing client applications with new features and design improvements.',
  ],
  stack: ['WordPress', 'Drupal', 'Sitefinity', 'Joomla', 'HTML', 'CSS'],
}, {
  slug: 'access-publishing',
  title: 'Access Publishing',
  category: 'Marketplaces',
  dates: 'Feb 2016 - Nov 2019',
  tagline: 'Specialized vehicle and equipment marketplaces.',
  body: [
    'Led development of three marketplaces (AccessTrucks, SleeperTrader, MachineryAccess) serving buyers and hundreds of dealerships nationwide.',
    'Built data pipelines in Node and MongoDB aggregating inventory from hundreds of dealers via scrapers and API integrations, handling inconsistent formats and constant updates.',
    'Created Vue frontends with specialized filtering, image-processing systems, and an integrated financing prequalification flow spanning PHP, MySQL, MongoDB, and Node.',
  ],
  stack: ['Vue', 'Node', 'MongoDB', 'MySQL', 'PHP', 'Angular'],
  images: [
    { src: '/screenshots/access/01_accesspublishing_thumbnail.png', alt: 'Access Publishing Vehicle Marketplaces' },
    { src: '/screenshots/access/02_accesstrucks_products.png', alt: 'AccessTrucks products page' },
    { src: '/screenshots/access/03_accesstrucks_filters.png', alt: 'AccessTrucks filters' },
    { src: '/screenshots/access/04_accesstrucks_pdp.png', alt: 'AccessTrucks product listing' },
    { src: '/screenshots/access/05_machineryaccess_products.png', alt: 'MachineryAccess products page' },
    { src: '/screenshots/access/06_machineryaccess_pdp.png', alt: 'MachineryAccess equipment listing' },
    { src: '/screenshots/access/07_sleepertrader_products.png', alt: 'SleeperTrader products page' },
    { src: '/screenshots/access/08_sleepertrader_filters.png', alt: 'SleeperTrader filters' },
    { src: '/screenshots/access/09_sleepertrader_pdp.png', alt: 'SleeperTrader product listing' },
  ],
  detail: {
    description: 'Access Publishing is a digital marketing company that transitioned from print magazines to specialized vehicle and equipment listing platforms. The company runs three major online marketplaces: AccessTrucks for box trucks, SleeperTrader for semi trucks with sleepers, and MachineryAccess for heavy machinery, aggregating inventory from hundreds of dealerships to provide a platform for commercial vehicle and equipment buyers.',
    links: [
      { label: 'View AccessTrucks Website', href: 'https://accesstrucks.com/' },
      { label: 'View SleeperTrader Website', href: 'https://sleepertrader.com/' },
      { label: 'View MachineryAccess Website', href: 'https://machineryaccess.com/' },
    ],
    roleHeading: 'Technical Leadership & Development',
    roleNarrative: [
      'I led development at Access Publishing, building three vehicle and equipment marketplaces from scratch. I designed systems to pull inventory data from hundreds of dealerships nationwide, clean it up, and display hundreds of thousands of listings through search interfaces for buyers.',
      'One of the biggest challenges was getting consistent data from inconsistent sources. I built web scrapers and API integrations to collect listings from dealer websites, third-party services, and industry databases. The data processing pipelines used Node.js and MongoDB to handle messy formats, duplicate listings, and constant updates without breaking, plus image processing pipelines to optimize and standardize vehicle photos.',
      'I built the frontend with Vue 2, focusing on rotating relevant product listings so users didn\'t have to search, driving traffic from social network ads. Each marketplace had specialized filters - truck specs for AccessTrucks and SleeperTrader, equipment details for MachineryAccess.',
      'I managed developers who built a dealer portal in Angular so sellers could manage their listings, respond to inquiries, and track performance. I also managed the team that wrote the PHP financing application and handled the frontend integration to provide buyers financing options.',
    ],
    keyFeatures: [
      { title: 'Multi-Source Aggregation', description: 'Custom-built scrapers and API integrations to collect and normalize inventory data from hundreds of dealerships across the country' },
      { title: 'Financing Prequalification', description: 'Integrated application system for SleeperTrader allowing potential buyers to get prequalified for financing directly through the platform' },
      { title: 'Dealer Management Portal', description: 'Comprehensive backend system for dealers to manage listings, track performance metrics, and optimize their online presence' },
      { title: 'Conversion Tracking', description: 'Advanced analytics system to track user interactions, lead generation, and conversion rates across all platforms' },
    ],
    additionalFeatures: [
      { title: 'Advanced Filtering', description: 'Detailed filtering by specifications unique to each vehicle type' },
      { title: 'Lead Generation', description: 'Integrated inquiry forms with dealer notification systems' },
      { title: 'Responsive Design', description: 'Mobile-first interfaces optimized for on-the-go shopping' },
      { title: 'SEO Optimization', description: 'Structured data and performance tuning for maximum visibility' },
      { title: 'Analytics Dashboard', description: 'Comprehensive metrics for site owners and participating dealers' },
      { title: 'Inventory Management', description: 'Tools for dealers to manage and update their vehicle listings' },
    ],
  },
}]
