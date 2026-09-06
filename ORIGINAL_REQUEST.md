# Original User Request

## Initial Request — 2026-09-06T13:48:58Z

Build a complete, responsive Next.js web application for "Expert Tech" that replicates the visual design, animations, color palette, layout, and structure from https://elvarixtech.co.uk/, customized with Expert Tech's company branding, telephone number, and registered Scottish office address.

Working directory: e:\Expert Tech
Integrity mode: development

Reference material:
- Target reference site: https://elvarixtech.co.uk/
- Scraped reference HTML & assets: C:\Users\ghula\.gemini\antigravity\brain\d2917400-66d6-43e7-b1c4-f4f4a040f0da\scratch\site_pages\
- Extracted JSON data & blocks: C:\Users\ghula\.gemini\antigravity\brain\d2917400-66d6-43e7-b1c4-f4f4a040f0da\scratch\unwrapped_site_data.json

## Requirements

### R1. Multi-Page Next.js Web Application
Implement a clean, performant Next.js application containing all 7 pages from the reference site:
1. Home (`/`)
2. Services (`/services`)
3. A Note from Founder (`/a-note-from-founder`)
4. Reviews (`/reviews`)
5. Careers (`/careers`)
6. Contact (`/contact`)
7. Refund Policy (`/refund-policy`)

### R2. Expert Tech Corporate Identity & Content Adaptation
Adapt all page copy, branding, and details for Expert Tech:
- Company Name: Expert Tech
- Contact Number: `+447565322806` (wired into clickable phone links, header, footer, mobile floating buttons)
- Registered Office Address: `175-179 High Street Cowdeanbeath High Street, Cowdenbeath, Scotland, KY4 9QE`
- Support Email: `info@experttech.co.uk`
- Preserve the professional IT services tone, value proposition, and structured content.

### R3. Visual Aesthetics, Styling & Animations
Match the reference site's exact visual feel:
- Color palette: Deep Navy `#0b1c3d`, Royal Blue `#2f80ed`, Soft Slate `#ebecef`, Card backgrounds, Dark contrast sections.
- Clean modern typography with proper heading scales and font hierarchy (Sora / IBM Plex Sans / clean sans-serif).
- Sticky navigation header with mobile hamburger drawer and CTA button.
- Smooth CSS/Framer Motion animations (fade-ins, slide-ins on scroll, interactive card hovers, floating contact button).

### R4. Interactive Elements & Forms
- Functional contact form with client-side validation and feedback state.
- Careers application form with validation.
- Working discovery call and phone action buttons.

## Acceptance Criteria

### Build & Code Quality
- [ ] The application compiles cleanly with `npm run build` without any build, syntax, or TypeScript errors.
- [ ] No broken imports, missing assets, or runtime errors during page navigation.

### Page Coverage & Routing
- [ ] An automated route check script verifies HTTP 200 responses on all 7 routes: `/`, `/services`, `/a-note-from-founder`, `/reviews`, `/careers`, `/contact`, and `/refund-policy`.

### Brand & Contact Accuracy
- [ ] The string `+447565322806` is present in the header, footer, and contact section with active `tel:` links.
- [ ] The address `175-179 High Street Cowdeanbeath High Street, Cowdenbeath, Scotland, KY4 9QE` appears in the footer and contact page.
- [ ] No leftover "Elvarix" references remain in user-facing views or metadata.

### Responsive Design & Aesthetics
- [ ] Viewports from mobile (375px) to desktop (1440px) render without horizontal overflow or clipped components.
- [ ] Navigation header sticks on scroll, with a functional mobile menu drawer.
