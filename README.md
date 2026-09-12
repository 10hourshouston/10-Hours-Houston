# 10 Hours Houston

Official website for **10 Hours Houston**, a Christ-centered gathering of prayer, worship, consecration, and conversations at the intersection of faith, science, technology, and media.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 4
- GSAP and ScrollTrigger

## Getting started

### Prerequisites

Install a current LTS version of [Node.js](https://nodejs.org/), which includes npm.

### Local development

```bash
git clone https://github.com/10hourshouston/10-Hours-Houston.git
cd 10-Hours-Houston
npm install
npm run dev
```

Open the local address shown by Vite in your browser.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Site routes

| Route | Page |
| --- | --- |
| `/` | Event landing page |
| `/schedule` | Event schedule |
| `/speakers` | Speakers and panelists |
| `/sponsors` | Sponsorship information and inquiry form |

## Project structure

```text
public/                  Static images, video, logos, and social assets
server/                  Static-host SPA fallback handler
src/
  components/            Shared and page-level UI sections
  config/                Site URLs and feature flags
  data/                  Schedule, panelist, and testimonial content
  features/              Feature-specific components
  pages/                 Top-level site pages
  utils/                 Shared helpers and form validation
  App.jsx                Route selection
  index.css              Global styles
  main.jsx               React entry point
```

## Deployment

The project builds to `dist/` and includes single-page application fallbacks for direct navigation to inner routes. `vercel.json` provides the Vercel rewrite, while `server/index.js` supplies the equivalent static-host fallback used by the build.

Before deploying, run:

```bash
npm run build
```

## Contributing

1. Create a branch for your change.
2. Make and test the update locally.
3. Run `npm run build`.
4. Open a pull request against `main`.
