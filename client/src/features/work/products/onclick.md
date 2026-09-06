---
title: "Onclick Governance"
category: "Platforms"
dates: "Jan 2025 - Current"
tagline: "Meeting governance for cooperatives: agendas, proposals, minutes, and tasks."
order: 2
images:
  - src: /screenshots/onclick/01_overview.webp
    alt: "Overview with a live meeting transcription"
  - src: /screenshots/onclick/05_calendar.webp
    alt: "Meeting calendar"
  - src: /screenshots/onclick/02_proposals.webp
    alt: "Proposals"
  - src: /screenshots/onclick/03_ballot.webp
    alt: "Proposal ballot with a recorded vote"
  - src: /screenshots/onclick/04_events.webp
    alt: "Upcoming meetings"
  - src: /screenshots/onclick/12_minutes-view.webp
    alt: "Meeting minutes with the transcript"
  - src: /screenshots/onclick/08_documents.webp
    alt: "Documents"
  - src: /screenshots/onclick/02_get-started.webp
    alt: "Get started checklist"
---

## ABOUT

Onclick is a worker-owned web development cooperative. Governance is its meeting tool for cooperatives: schedule meetings, write agendas, vote on proposals, record minutes, assign tasks, and manage members from one place, with live audio transcription during meetings.

::slider

## TECHNICAL LEADERSHIP & DEVELOPMENT

I built the platform as a monorepo of independent single-page apps sharing one component library, with Governance as the product. The client is Vue 3 with TSX, Tailwind, and class-variance-authority, and it reaches a Deno server over tRPC so types flow end to end from the Postgres schema to the UI.

The server runs on Fly.io behind a Deno reverse proxy on a Cloudflare Tunnel, with Supabase for Postgres and auth, Drizzle for migrations, Stripe for billing, and RustFS for file storage. Meeting audio runs through a Python service that decodes Opus and normalizes it for transcription, and a Discord bot joins voice channels through the same event-driven adapters.

## KEY FEATURES

- **Meetings:** Schedule one-off and recurring meetings with a calendar view and meeting history
- **Agendas and Minutes:** Draft agendas ahead of a meeting, then record minutes and attendance against it
- **Proposals:** Members open proposals and vote, with status tracking from draft to closed
- **Tasks:** Assign follow-ups to members, link them to agendas, and track them to done
- **Live Transcription:** Transcribes meeting audio as it happens

## ADDITIONAL FEATURES

- **Documents:** Policies, bylaws, and templates with attachments
- **Members:** Invite codes that rotate nightly, roles, and removal proposals
- **Activity:** Attendance and participation history per member
- **Announcements:** Collective-wide notices from the workspace

## STACK

- Vue 3, TypeScript, Tailwind, tRPC, Deno, Postgres, Supabase, Drizzle, Stripe, Fly.io, Cloudflare

## LINKS

- [Visit Onclick](https://onclick.coop/)
