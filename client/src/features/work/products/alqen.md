---
title: "Alqen"
category: "Platforms"
dates: "Jun 2021 - Jun 2022"
tagline: "Dropshipping dashboard for Amazon and Walmart sellers."
order: 4
images:
  - src: /screenshots/alqen/02_statistics_overview.webp
    alt: "Statistics overview"
  - src: /screenshots/alqen/12_manual_fulfillment_with_impersonation.webp
    alt: "Manual fulfillment with impersonation"
  - src: /screenshots/alqen/06_frequency_chart.webp
    alt: "Frequency chart"
  - src: /screenshots/alqen/09_realtime_orders.webp
    alt: "Realtime orders"
  - src: /screenshots/alqen/01_listings.webp
    alt: "Product listings"
  - src: /screenshots/alqen/13_billing.webp
    alt: "Billing"
  - src: /screenshots/alqen/11_bulk_upload.webp
    alt: "Bulk product uploader"
  - src: /screenshots/alqen/10_sales_tracker.webp
    alt: "Sales tracker"
  - src: /screenshots/alqen/08_integrations.webp
    alt: "Integrations"
---

## ABOUT

In 2021 and 2022 Alqen was an all-in-one dropshipping tool for Amazon and Walmart sellers: inventory management, bulk product uploads, order fulfillment, payment processing, and real-time marketplace synchronization from one dashboard. Alqen has since pivoted to product research and bulk UPC scanning for the same sellers; this page describes the product as it was when I worked on it.

::slider

## FRONTEND DEVELOPMENT

I led the frontend development of Alqen, a dropshipping dashboard for Amazon and Walmart sellers. I built the dashboard with Vue 2 and Vue 3 that interfaced with a serverless AWS/Node/MongoDB backend to display thousands of daily orders and real-time inventory updates.

I built the frontend interfaces for Walmart order synchronization and Stripe payment processing, a management table for receipts printed automatically from orders, and an SSE server in Node that relays order events from the API service to connected clients so sellers see orders and inventory update without refreshing.

I created analytics views that displayed performance metrics, profit margins, and inventory levels from the backend systems, plus product listing management tools for editing and updating listings. The dashboard helped sellers spot trends and optimize their operations across both marketplaces.

I also built an impersonation system for support staff to act as a user, issuing signed JWTs with specific permissions and short-lived expirations for troubleshooting an account.

I migrated the product from Vue 2 to Vue 3 with a new application wrapping the legacy interface, porting screens one at a time without breaking the existing system.

## KEY FEATURES

- **Automated Order Processing:** Instant order synchronization between Walmart Marketplace and supplier systems with automatic payment processing and fulfillment
- **Real-Time Analytics:** Dashboard with performance metrics, revenue tracking, and inventory levels
- **Inventory Management:** Automated stock level synchronization across platforms to prevent overselling and maintain accurate listings
- **Impersonation System:** Customer service tools allowing support staff to impersonate sellers for troubleshooting and order management

## ADDITIONAL FEATURES

- **Bulk Product Listing:** Upload and manage products in batches
- **Automated Repricing:** Price adjustments based on market conditions
- **Performance Metrics:** Track seller rating, feedback, and account health
- **Multi-Account Management:** Control several Walmart seller accounts from one interface
- **Order Filtering:** Customizable filters to organize and prioritize orders
- **Error Handling:** Automated detection and resolution of common issues

## STACK

- Vue 2, Vue 3, Node, MongoDB, AWS, Stripe API

## LINKS

- [View Alqen Website](https://alqen.com/)
