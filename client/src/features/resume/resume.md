## PREAMBLE

Software Engineer with 12+ years building web applications, dashboards, and cloud infrastructure. Most recently integrated enterprise fraud-detection vendors at Symetra using event-driven AWS serverless architecture in Python. Before that, led development of three products: an A/B testing platform processing 5M+ daily requests, an e-commerce automation platform for Walmart/Amazon sellers, and commercial vehicle marketplaces serving hundreds of truck and heavy equipment dealerships.

## EXPERIENCE

### [SENIOR SOFTWARE ENGINEER II](/work/symetra)

Symetra - Bellevue, Washington (Remote Contract) ✦ July 2025 - December 2026

Initial member of a new Fraud Detection team that built Symetra's first fraud integration platform, routing internal events to third-party vendors.

- Wrote Step Functions state machines and their Python Lambdas for the platform's EventBridge-driven workflows
- Enhanced workflows to support analyst-created fraud detection rules in the rules engine, adding client libraries for internal services, wiring data through Lambdas into vendor payloads, writing unit and integration tests for edge cases, routing failures to DLQs, and deploying through ADO with Datadog monitoring
- Built webhook receivers for third-party vendors publishing incoming events to EventBridge, starting a workflow for each event
- Designed a data masking system to protect sensitive values, replacing PII with one-way HMAC tokens before records reach downstream systems; authorized callers exchange a token for the original value, stored in a protected database, through a secured endpoint
- Migrated a service and its Postgres database with production data to a new AWS account through ADO pipelines without data leaving production accounts; wrote the export, transfer, and import stages as pipeline steps and restored service to production using the new account
- Stopped per-call token requests from overloading the proxy by adding a token provider class to the shared HTTP request library that reads expiry from the token response, reuses the token for its lifetime, and refreshes it before expiry per the OAuth 2.0 spec, then adopted platform-wide
- Added PII redaction to the shared logger with an off-the-shelf library, stripping away heavy models and datasets and filling the gaps with alternative packages until the package fit inside Lambda limits, keeping sensitive values out of logs

### [FOUNDING SOFTWARE ENGINEER](/work/compose)

Compose - Austin, Texas (Remote Full-time) ✦ September 2022 - June 2025

Lead engineer for nearly three years on Compose.co, an A/B testing platform with code and no-code tools and Shopify integration.

- Built the frontend solo in Vue 3, Pinia, composables, and Tailwind, including drag-and-drop builders for composing audience and device targeting rules without code, real-time activity charts, Bayesian and frequentist results charts, and reports with statistical significance, revenue per visitor, bounce, and engagement
- Architected the primary application backend in Node with Express and Apollo GraphQL, running on Lambda through two adapters and carrying per-request state in async context, deployed with S3 and API Gateway using the Serverless Framework
- Built an ingestion service on Kinesis and Lambda aggregating events into layered summary tables, and made collection GDPR-compliant with an edge-deployed collector written in Go with an embedded GeoIP database to anonymize information in the country of origin before forwarding it to US servers
- Wrote the client script bundler service, which bundles every experiment, variant, and targeting condition for an organization into one minified script, then publishes it to S3 with CloudFront caching, clearing the cache after new builds
- Helped build the client script that applies a variant per the audience and device rules, collects metrics and goals, and sends events to the ingestion stream using sendBeacon, and built its preview mode for reviewing experiments on a live page before launch
- Designed stateless authentication for the backend, encoding permission roles into JWTs at issue and authorizing each request straight from the token
- Established CI/CD on GitHub Actions for deploys without interruption, and built a static marketing site and blog with content from Contentful through a webhook-driven pipeline that rebuilds on each content change, giving writers self-service publishing and strong SEO

### [FULL-STACK DEVELOPER](/work/udundi)

Udundi - Austin, Texas (Remote Contract) ✦ May 2022 - September 2022

Contributed to multiple Udundi projects, focusing on completing unfinished products and creating new development infrastructure.

- Completed an unfinished Shopify theme extension that places product hotspots on images, cutting the planned larger version down to the existing build, rebuilding the product picker, finishing the half-built Node backend, and launching it to the Shopify App Store
- Launched the Udundi agency website and blog as a static Vue 3 site with content from Contentful, building it in GitHub Actions on each content change and publishing it to S3 with CloudFront caching
- Created client case study pages in Vue 3 with parallax scrolling, image galleries, and slides

### [LEAD FRONTEND ENGINEER](/work/alqen)

Alqen - Las Vegas, Nevada (Remote Contract) ✦ June 2021 - June 2022

Led the frontend on Alqen, a dropshipping dashboard for Amazon and Walmart sellers covering billing, orders, and inventory.

- Built the seller dashboard frontend, covering billing, order management, real-time order events, and inventory, integrating with the team's serverless AWS API
- Migrated the product from Vue 2 to Vue 3 with a new application wrapping the legacy interface, porting screens one at a time
- Wrote an SSE server in Node relaying order events from the API service to connected clients, updating orders in real time
- Created a system for support staff to act as a user, issuing signed JWTs with specific permissions and short-lived expirations for troubleshooting an account
- Designed the real-time analytics screens for profit margins, performance metrics, and inventory levels, reading from the team's reporting service
- Implemented the frontend for order synchronization with Walmart, payment processing with Stripe, an interface for receipts printed automatically from orders, product listing management, and automated repricing tools adjusting prices to market conditions

### [FULL-STACK DEVELOPER](/work/access-publishing)

Access Publishing Inc. - Johnston, Iowa (Full-time) ✦ February 2016 - November 2019

Led development of the AccessTrucks, SleeperTrader, and MachineryAccess dealer marketplaces, and coordinated a team of three developers.

- Ingested 100k+ listings and images a day from hundreds of dealerships through scrapers and dealer APIs with an inventory system built in Node with MongoDB, normalizing each dealer's data format, deduplicating, and standardizing vehicle photos
- Designed and built the marketplace frontends in Vue, with filters on truck specifications and heavy machinery details, static rendering for SEO, and optimization for mobile devices and slow 3G connections
- Added the financing prequalification form for SleeperTrader, returning a result to the buyer and forwarding the lead to the listing dealership
- Helped direct an internal inventory management tool in Angular for staff and the sales team
- Set up the email system on Sparkpost for notifications and marketing campaigns, designing and hand-coding the HTML emails as Pug templates

### [WEB DEVELOPER](/work/sevenverbs)

SevenVerbs - Urbandale, Iowa (Full-time) ✦ April - August 2014

Updated and maintained client sites in WordPress, Drupal, Sitefinity, and Joomla.

- Added features, adjusted designs, and updated content on client sites, and rebuilt one static Bootstrap site into a CMS site
- Designed logos, business cards, infographics, and digital documents for clients

## TECHNICAL

### LANGUAGES & TECHNOLOGIES

- **Languages:** TypeScript, JavaScript, Python, Go
- **Python:** FastAPI, Pydantic, boto3, AWS Lambda Powertools, pytest, moto, Ruff, BasedPyright, uv
- **Frontend:** Vue 2 and 3, Pinia, Vue Router, TanStack Query, Apollo Client and RxJS, tRPC/Zod, Tailwind, Sass, PostCSS
- **Backend:** Node and Deno, Shopify, Stripe, Express, Koa, Apollo GraphQL, SendGrid, Oak, OpenAPI/Swagger, Twilio
- **Data:** Postgres, Drizzle, MongoDB, Mongoose, Deno KV, Cloudflare KV, Redis, NATS
- **AWS:** EventBridge, the Serverless Framework, SQS, CloudFormation, Step Functions, API Gateway, CloudFront, Kinesis, CDK, Lambda and Lambda@Edge, S3
- **Cloudflare:** Workers, Containers, R2, D1, KV, Workers AI
- **Tooling:** Vite, Vitest, Playwright, ESLint, GitHub Actions, ADO, Docker, Fly, Supabase, Datadog, Grafana and CloudWatch

### FAVORITE STACK

- Vue + TSX, TypeScript + tRPC/Zod, TanStack Query, Postgres + Drizzle, Deno + Oak

## DESIGN

### WEB DESIGN

- Design responsive, mobile-first interfaces for web applications and dashboards, optimized for small screens and slow connections
- Build design systems covering palettes, fluid type and spacing, motion, and paired light and dark themes
- Design component libraries with primitives, composed patterns, interaction states, and page-level layouts

### GRAPHIC DESIGN

- Design for print and digital with formal graphic design training, including logos, business cards, posters, and documents
- Draw logos, marks, and icon sets from thumbnails and sketches to final vector art in Illustrator
- Apply color theory, typography, grid and layout systems, and visual hierarchy to interface and print work

## EDUCATION

### ASSOCIATE OF ARTS & SCIENCES

DMACC Ankeny Campus ✦ 2012 - 2014

- Graphic Design with Web Emphasis

### HIGH SCHOOL DIPLOMA

Southeast Warren Jr. / Sr. High School ✦ 2008 - 2012
