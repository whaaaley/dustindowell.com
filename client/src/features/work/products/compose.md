---
title: "Compose"
category: "Platforms"
dates: "Sep 2022 - Jun 2025"
tagline: "A/B testing platform with no-code tools and deep Shopify integration."
order: 2
images:
  - src: /screenshots/compose/33_experiment_report_calendar.png
    alt: "Experiment report calendar"
  - src: /screenshots/compose/16_project_experiment_list.png
    alt: "Project experiment list"
  - src: /screenshots/compose/20_experiment_variants.png
    alt: "Experiment variants"
  - src: /screenshots/compose/22_experiment_targeting.png
    alt: "Experiment targeting"
  - src: /screenshots/compose/24_experiment_traffic.png
    alt: "Experiment traffic"
  - src: /screenshots/compose/32_experiment_report_chart.png
    alt: "Experiment report chart"
  - src: /screenshots/compose/35_experiment_report_winner.png
    alt: "Experiment report winner"
  - src: /screenshots/compose/06_org_billing.png
    alt: "Organization billing"
  - src: /screenshots/compose/12_project_snippets.png
    alt: "Project snippets"
---

## ABOUT

Compose.co is an innovative A/B testing platform featuring the industry's only pay-as-you-go pricing model at $0.0012 per monthly tested user, with no contracts or base fees. The platform enables no-code split testing of websites, themes, and user experiences while automatically tracking key metrics like revenue, engagement, and conversion rates with built-in statistical significance calculations.

::slider

## TECHNICAL LEADERSHIP & DEVELOPMENT

I led the development of Compose, an A/B testing platform that Shopify stores use to optimize their conversions. I handled everything from the frontend dashboard (Vue3, Pinia, Tailwind) to the backend infrastructure (Node.js, AWS Lambda, Apollo, PostgreSQL, MongoDB) that processes over 5 million daily requests.

The platform needed to be fast and reliable since businesses depend on accurate test results to make decisions. I set up the AWS infrastructure using serverless functions and databases that could scale automatically, plus built CI/CD pipelines so we could ship updates quickly without breaking things.

I helped build our GDPR-compliant data collection system in Go, with Node.js for batch processing. We used AWS Kinesis for scalable data ingestion to track geolocation events and revenue data while maintaining user privacy.

I also rescued some half-finished projects - some Shopify integrations and internal dashboards. Along the way, I experimented with AI features using OpenAI's APIs for content generation.

The whole system had to work seamlessly with Shopify's ecosystem while being simple enough that non-technical store owners could run sophisticated A/B tests without needing a developer.

## KEY FEATURES

- **Real-Time Analytics:** Automatic tracking with statistical significance calculations and conversion rate optimization insights
- **Revenue Tracking:** Measure direct impact on sales and conversion value with automatic attribution to test variants
- **Advanced JavaScript:** Create custom JavaScript variants and triggers for sophisticated tests beyond basic visual changes
- **Pay-As-You-Go:** Only pay $0.0012 per monthly tested user, no contracts or base fees - the industry's only true usage-based pricing

## ADDITIONAL FEATURES

- **No-Code Testing:** Create and run split tests without any coding skills
- **Preview Mode:** Test your variants before publishing to live users
- **Flicker-Free:** Client-side code prevents visual flashing during page loads
- **Shopify App:** Seamless integration with your Shopify store
- **Geolocation Filtering:** Target specific regions or countries for your tests
- **Device Metrics:** Analyze performance across mobile, tablet, and desktop

## STACK

- Vue 3, Pinia, Node, PostgreSQL, MongoDB, Go, AWS Lambda, Kinesis

## LINKS

- [Visit Compose App](https://app.compose.co/)
- [Visit Compose Website](https://compose.co/)
