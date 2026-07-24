# Get-Hired — React Website (Company Standard Structure)

Homepage for Get-Hired ("Master the US Career Arena"), built with the exact same
folder structure and code format as the Kadders React project.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

## Folder structure (same as Kadders)

```
gethired_react/
├── App.jsx                ← Routes live here (root, Kadders standard)
├── i18n.jsx               ← i18next setup (root, Kadders standard)
├── index.html
├── .env                   ← VITE_IMAGES / VITE_API_URL etc.
├── tailwind.config.js / postcss.config.js / vite.config.js
├── public/
│   ├── logo.svg / logo-white.svg / favicon.svg
│   └── images/            ← ALL images (demo files included, replace freely)
│       ├── brands/        ← marquee logos (png)
│       ├── capabilities/  ← accordion panel images (jpg)
│       ├── stories/       ← success story images (jpg)
│       ├── blog/          ← insight card covers (jpg)
│       └── why/           ← dark section background (jpg)
└── src/
    ├── main.jsx           ← entry (HelmetProvider + BrowserRouter + Toast)
    ├── locales/en.json    ← ALL website text + image paths (edit content here)
    ├── services/api.js    ← axios instance (for future backend/forms)
    ├── styles/index.css   ← Tailwind theme tokens + global CSS
    ├── pages/             ← Home.jsx, NotFound.jsx (1 file = 1 URL)
    └── components/
        ├── layouts/       ← MainLayout (Navbar + <Outlet/> + Footer)
        ├── common/        ← Navbar, Footer, SEO + hooks/useArrayTranslation
        ├── sections/home/ ← HeroSection, BrandsSection, CapabilitiesSection,
        │                    WhyGetHiredSection, SuccessStoriesSection,
        │                    ConsultingEcosystemSection, InsightsSection,
        │                    GetStartedSection
        └── ui/            ← Button, OutlineButton, TextLink, SectionBadge,
                             SectionHeading, LogoMarquee, JobCard, StoryCard,
                             BlogCard, EcosystemCard, Icons
```

## How content works (Kadders pattern)

Every section reads its text from `src/locales/en.json` through the
`useArrayTranslation` hook:

```jsx
const heroSection = useArrayTranslation("hero_section");
// heroSection.title_line1, heroSection.description ...
```

To change ANY text on the website → edit `en.json` only. No JSX changes needed.

## How images work (fully dynamic)

Image paths are stored **inside en.json**, and components build the URL with the
`VITE_IMAGES` base from `.env` (same as Kadders):

```jsx
const assetBaseUrl = import.meta.env.VITE_IMAGES;
<img src={`${assetBaseUrl}${story.image}`} />
```

Two ways to swap an image:

1. **Same name** — overwrite the demo file, e.g. put your real photo at
   `public/images/stories/microsoft.jpg`. Done, nothing else to change.
2. **New name** — drop `public/images/stories/anything.jpg` and update the
   path in `en.json` (`"image": "/images/stories/anything.jpg"`).

Later, if images move to a CDN, just set `VITE_IMAGES="https://cdn.gethired.com"`
in `.env` — zero code changes.

All demo images are generated placeholders labeled "replace me".

## Animation status (step-by-step plan)

Current build is the SIMPLE version — clean CSS-only motion:

- Logo marquee auto-scroll with hover pause (Kadders' own LogoMarquee component)
- Accordion open/close via CSS grid-rows transition (`.accordion-body` in index.css)
- Navbar scroll blur + shadow
- Hover transitions on cards, buttons, blog image zoom

Next steps we can add one by one (framer-motion):
1. Scroll-reveal fade-up for every section (a small `<Reveal />` wrapper)
2. Hero staggered entrance + floating phone/cards
3. Count-up animation for the 1000+ / 05+ / 500+ stats
4. Drag carousel for the Why Get-Hired cards
5. AnimatePresence mobile menu

## Adding a new page (the standard workflow)

1. Create sections in `src/components/sections/<pagename>/`
2. Create `src/pages/<PageName>.jsx` that stacks those sections + `<SEO />`
3. Register the route in root `App.jsx`
4. Add the link to `nav_links` in `en.json`
