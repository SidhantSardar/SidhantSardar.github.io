---
title: Two Webflow sites, merged into one site built with Claude Code
eyebrow: Aligne AI · Responsible AI consultancy
type: code
stack: Webflow → Claude Code + Astro
summary: Altrum AI and Aligne AI started as two separate websites I designed and built in Webflow. When Altrum became part of Aligne, I merged them into one site, built completely in code with Claude Code. The sales team now publishes blogs, events and case studies themselves through a Git-based CMS.
tags: [Astro, Cloudflare, Pages CMS]
cover: /sites/aligne.jpg
skills: [astro, git-cms, migration]
order: 2
size: wide
thumb: { kind: cms, labels: [Blogs, Events, Case studies, Authors], tone: blue }
url: https://www.aligne.ai/
snapshot:
  - { label: Role, value: Design + build }
  - { label: Before, value: Two Webflow sites }
  - { label: Now, value: One site · Claude Code + Astro }
  - { label: CMS, value: Pages CMS (Git-based) }
  - { label: Sector, value: Responsible AI }
structureTitle: CMS structure
structure:
  - { name: Blogs, detail: title · author · category · body }
  - { name: Events, detail: date · time · format · venue }
  - { name: Case studies, detail: client · category · body }
  - { name: Authors, detail: name · photo }
structureNote: Each collection is a folder of Markdown files in GitHub. Saving in the CMS makes a commit, and Cloudflare rebuilds the site.
---

## Problem

Altrum AI and Aligne AI began as two separate websites, both designed and built by me in Webflow, each with its own CMS. ([How I built the original Altrum site](/work/altrum-website/).) When Altrum became part of Aligne, the company needed one site for the consultancy and its Altrum product pages, with one shared design. The sales team also needed to publish blogs, events and case studies every week without waiting on a designer or a developer.

## Process

I merged the two Webflow sites into one and rebuilt it completely in code with Claude Code, moving page by page to Astro. First came a shared design system (tokens, header, footer, sections and buttons) used by both the Aligne and Altrum pages. Then each content type became a folder of Markdown files in GitHub, edited through Pages CMS, a simple editor that sits on top of the repository.

## Key decisions

1. **Static-first on Cloudflare.** Pages are built ahead of time and served from Cloudflare's network, so they load fast.
2. **A private staging site.** Changes go to staging first. Going live is a separate, approved step.
3. **Forms, not code, for the sales team.** Pages CMS gives them a form for each blog, event, case study and author. They never touch Git or code.
4. **One design system for two brands.** Aligne and Altrum share tokens and components, so one change updates both.

## Outcome

The site is live at aligne.ai. The sales team adds blogs, events and case studies themselves, and new pages are built from the same components.
