---
title: "Compose"
category: "Platforms"
dates: "Sep 2022 - Jun 2025"
tagline: "A/B testing platform with code and no-code tools and Shopify integration."
order: 2
images:
  - src: /screenshots/compose/33_experiment_report_calendar.webp
    alt: "Experiment report calendar"
  - src: /screenshots/compose/16_project_experiment_list.webp
    alt: "Project experiment list"
  - src: /screenshots/compose/20_experiment_variants.webp
    alt: "Experiment variants"
  - src: /screenshots/compose/22_experiment_targeting.webp
    alt: "Experiment targeting"
  - src: /screenshots/compose/24_experiment_traffic.webp
    alt: "Experiment traffic"
  - src: /screenshots/compose/32_experiment_report_chart.webp
    alt: "Experiment report chart"
  - src: /screenshots/compose/35_experiment_report_winner.webp
    alt: "Experiment report winner"
  - src: /screenshots/compose/06_org_billing.webp
    alt: "Organization billing"
  - src: /screenshots/compose/12_project_snippets.webp
    alt: "Project snippets"
---

## ABOUT

Compose.co is an A/B testing platform featuring the industry's only pay-as-you-go pricing model at $0.0012 per monthly tested user, with no contracts or base fees. The platform enables code and no-code split testing of websites, themes, and user experiences while automatically tracking key metrics like revenue, engagement, and conversion rates with built-in statistical significance calculations.

::slider

## TECHNICAL LEADERSHIP & DEVELOPMENT

I led the development of Compose, an A/B testing platform that Shopify stores use to optimize their conversions. I handled everything from the frontend dashboard (Vue3, Pinia, Tailwind) to the backend infrastructure (Node, AWS Lambda, Apollo GraphQL, Postgres, MongoDB) that ingests over 5 million events a day.

The platform needed to be fast and reliable since businesses depend on accurate test results to make decisions. I set up the AWS infrastructure using serverless functions and databases that could scale automatically, plus built CI/CD pipelines so we could ship updates without breaking things.

I helped build our GDPR-compliant data collection system in Go, with Node for batch processing. We used AWS Kinesis for data ingestion to track geolocation events and revenue data while maintaining user privacy.

The whole system had to work inside Shopify's ecosystem while being simple enough that non-technical store owners could run sophisticated A/B tests without needing a developer.

## KEY FEATURES

- **Real-Time Analytics:** Automatic tracking with statistical significance calculations and conversion rate optimization insights
- **Revenue Tracking:** Measure direct impact on sales and conversion value with automatic attribution to test variants
- **Custom JavaScript:** Create custom JavaScript variants and triggers for sophisticated tests beyond basic visual changes
- **Pay-As-You-Go:** Only pay $0.0012 per monthly tested user, no contracts or base fees - the industry's only true usage-based pricing

## ADDITIONAL FEATURES

- **No-Code Testing:** Create and run split tests without any coding skills
- **Preview Mode:** Test your variants before publishing to live users
- **Flicker-Free:** Client-side code prevents visual flashing during page loads
- **Shopify App:** Installs from the Shopify App Store and runs tests on your storefront without theme edits
- **Geolocation Filtering:** Target specific regions or countries for your tests
- **Device Metrics:** Analyze performance across mobile, tablet, and desktop

## STACK

- Vue 3, Pinia, Node, Postgres, MongoDB, Go, AWS Lambda, Kinesis

## LINKS

- [Visit Compose App](https://app.compose.co/)
- [Visit Compose Website](https://compose.co/)
