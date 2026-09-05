---
title: "Symetra"
category: "Cloud / Backend"
dates: "Jul 2025 - Current"
tagline: "Fraud detection integrations for a national insurance carrier."
order: 1
---

## ABOUT

Initial member of a new Fraud Detection team at Symetra, a life insurance and financial services company, building its first fraud integration platform: internal events routed to third-party vendors through Step Functions workflows and Python Lambdas.

Built webhook receivers that publish vendor events to EventBridge, an SSN tokenization service that keeps PII out of the rules engine with one-way HMAC tokens, PII redaction for the shared logging library, and an OAuth token provider for the shared HTTP client that stopped per-call token requests from overloading the proxy.

Migrated an inherited service and its production Postgres database between AWS accounts entirely inside ADO pipelines, with no data leaving production accounts. Deployed through ADO and monitored releases in Datadog.

::slider

## STACK

- Python, AWS Lambda, Step Functions, EventBridge, SQS, CloudFormation, Postgres, Datadog, ADO
