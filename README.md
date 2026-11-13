# Williams & Williams LLC – Chicago Zoning Solutions Mobile App

A premium, production-ready mobile web application UI for **Williams & Williams LLC – Zoning Solutions**, a leading zoning and land-use consultancy in Chicago, IL.

---

## 🏛️ Business Overview
- **Firm**: Williams & Williams LLC – Zoning Solutions
- **Location**: Chicago, IL (City Hall, Cook County & Ward Advisory)
- **Tagline**: *"Navigating complex zoning with ease."*
- **Sub-line**: *"Tailored zoning solutions in Chicago."*
- **Positioning**: *"Experienced. Knowledgeable. Dedicated."*
- **Direct Phone**: `630-635-7688`
- **Official Email**: `dubbs.mgmt@gmail.com`
- **Core Purpose**: Drive client conversions (Free Quote, Call, Consultation Bookings) while empowering existing clients with real-time case proceedings, permit milestones, and document vaults.

---

## 🎨 Color Tokens & Design System

| Token | Hex Value | Application |
|---|---|---|
| `primary` | `#3D4D7C` | Primary buttons, active tab indicators, key badges, icons |
| `ink / heading` | `#1F2A44` | Oswald headings, deep text, dynamic island frame |
| `background` | `#F2F3F5` | Global body and page canvas background |
| `surface / card` | `#F8F9FB` | Surface cards, list elements, form containers |
| `border` | `#DDE2EA` | Subtle divider lines and card borders |
| `muted text` | `#8A93A6` | Secondary body text, timestamps, captions |
| `gradient-start`| `#B7C3DA` | Brand soft atmospheric gradient top |
| `gradient-end`  | `#7D90B5` | Brand soft atmospheric gradient bottom |
| `success` | `#3FA66B` | Approved cases, verified documents, active statuses |
| `danger` | `#E5484D` | Stop-work notifications, denials, alert dots |

- **Brand Gradient**: `linear-gradient(180deg, #B7C3DA 0%, #7D90B5 100%)`
- **Typography**: `Oswald` (uppercase, condensed) for architectural headings; `Inter` and `Montserrat` for body text.
- **Glass Effect**: Translucent cards (`backdrop-blur-xl`, `bg-white/80`, `border border-white/90`), subtle layered shadows (`shadow-[0_8px_30px_rgba(31,42,68,0.08)]`), pill buttons with top-light highlight and Framer Motion scale feedback (`0.97`).

---

## 📱 App Navigation & Screen Structure

1. **Splash & Onboarding** (`/onboarding`): 3-slide visual walkthrough with progress pill ("1/3"), skip button, and brand monograms.
2. **Home Screen** (`/` or `/home`): Greeting header ("Hi, Alex"), global zoning search bar, category chips, hero carousel with "Free Quote" & "Call Us" CTAs, circular quick actions (Lookup, Book, Upload, Checklist), horizontal services slider, "Why Choose Us" glass cards, latest news, and popular Chicago area cards.
3. **Services Catalog & Detail Screen** (`/services` and `/services/:slug`): All 10 services with hero banner, 4-icon stats row (Who it's for, Typical timeline, Documents needed, Support level), "About this service", "What's included", interactive date/time chips for booking, FAQ accordion, and sticky bottom action bar.
4. **Free Quote / Request Service** (`/quote`): 4-step wizard (Service & Property Type &rarr; Contact info &rarr; Project details with file upload &rarr; Review & submit with invisible verification and confetti celebration).
5. **Chicago Zoning Lookup** (`/zoning-lookup`): Address and PIN search, official Chicago GIS zoning map link, allowable & restricted uses, FAR & height metrics, setback summaries, and TOD parking waiver eligibility.
6. **Book Consultation** (`/book-consultation`): Format selector (Video / Phone / In-Office), Mon–Fri date chips, time chips, sticky booking bar, and Add to Calendar confirmation.
7. **My Cases & Bookings** (`/cases`): Active and completed case tracking, status badges (Hearing Scheduled, Under Review, Approved), next hearing event reminders, upcoming consultations, and "Need Help?" support card.
8. **Case Detail Screen** (`/cases/:id`): Vertical timeline of stages and dates, assigned expert contact, hearing reminder toggle, document repository, and updates feed.
9. **Documents Vault** (`/vault`): 4 folders (Surveys & Plats, Architectural Plans, Permits & Approvals, Hearing Notices) with upload capabilities and verified file lists.
10. **In-App Chat** (`/chat`): Direct secure channel with the firm, attachment preview, and "Ask AI" quick municipal question chips.
11. **Chicago Zoning News** (`/news` and `/news/:slug`): Editorial policy updates, City Council ordinance tracking, and push notification toggle.
12. **Project Portfolio** (`/portfolio`): Segmented control for Current vs. Past projects, image grid, and detail modal with metrics.
13. **About Williams & Williams** (`/about`): Firm story, founder executive bio, core positioning, and 3-point community engagement commitment.
14. **FAQ** (`/faq`): Category-filtered accordion with search.
15. **Contact** (`/contact`): One-tap call, email, WhatsApp button, office hours, and contact form.
16. **Profile & Settings** (`/profile`): User details editing, notification switches, saved services bookmarks, language selector, and onboarding tour reset.
17. **Project Readiness & Permit Checklist** (`/checklist`): Interactive self-assessment with live weighted readiness score calculation.

---

## 🛠️ Project Structure
```text
williamLLC/
├── docs/
│   └── image-prompts.md         # Full image prompts and generation specifications
├── public/
│   ├── favicon.svg              # SVG brand monogram icon
│   └── manifest.json            # PWA installation manifest
├── src/
│   ├── assets/
│   │   └── images/              # HD photography and SVG architectural vector assets
│   ├── components/
│   │   ├── layout/              # AppShell, TopBar, BottomNav
│   │   └── ui/                  # Button, Badge, ImageWithFallback
│   ├── data/
│   │   ├── businessInfo.ts      # Phone, email, address, legal disclaimer
│   │   ├── cases.ts             # Active and past case records & appointments
│   │   ├── documentsVault.ts    # Vault folders & mock files
│   │   ├── faqs.ts              # FAQ questions and answers
│   │   ├── images.ts            # Central image path and alt-text registry
│   │   ├── news.ts              # Chicago zoning editorial articles
│   │   ├── popularAreas.ts      # Chicago neighborhood zoning profiles
│   │   ├── portfolio.ts         # Current & past construction projects
│   │   ├── services.ts          # 10 core zoning solutions with stats & FAQs
│   │   ├── testimonials.ts      # Marked client testimonial placeholders
│   │   ├── zoningCategories.ts  # Residential, Commercial, Industrial, Mixed, Ag
│   │   └── zoningLookup.ts      # Chicago address lookup dataset
│   ├── pages/                   # All 18 application screen views
│   ├── store/
│   │   └── useAppStore.ts       # Zustand store for quotes, cases, chat & settings
│   ├── App.tsx                  # React Router configuration & code-splitting
│   ├── index.css                # Tailwind v4 theme, fonts, and glass utilities
│   └── main.jsx                 # Application entry point
├── tailwind.config.js           # Design tokens, color system, fonts, radii & shadows
└── vite.config.js               # Vite bundler configuration
```

---

## 🚀 Setup & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local dev server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🔄 How to Replace Mock Data & Images

### Replacing Images
All images are centrally routed through `/src/data/images.ts`. To change any image:
1. Place your new WebP/JPG/SVG file in `/src/assets/images/`.
2. Update the single corresponding line in `/src/data/images.ts`.
3. Every screen in the app will update automatically without changing component code.

### Replacing Mock Data
To hook up real data or CMS endpoints:
- Business info (phone, email, disclaimer): edit `/src/data/businessInfo.ts`.
- Services and pricing notes: edit `/src/data/services.ts`.
- Case records & client data: edit `/src/data/cases.ts` or wire API calls in `src/store/useAppStore.ts`.

---

## 📋 Client Placeholders Checklist

As required, no stats, prices, reviews, or private addresses have been fabricated. The client should provide real values for these clearly marked placeholders:

1. **Office Address**: `[OFFICE ADDRESS]` in `src/data/businessInfo.ts` (currently shows placeholder Chicago Loop location).
2. **Consultation Hours**: `[HOURS]` in `src/data/businessInfo.ts` (currently set to standard 8:00 AM – 5:30 PM CST).
3. **Direct Contact Phone**: `630-635-7688` (live wire; verify or replace with secondary Chicago office lines).
4. **Founder Portrait Photo**: `about-founder.svg` / `[FOUNDER PHOTO PLACEHOLDER]` in `/src/assets/images/about-founder.svg` and `src/pages/AboutScreen.tsx`.
5. **Real Project Photography**: Replace `portfolio-current-*.svg` and `portfolio-past-*.svg` with high-resolution photography of finished builds.
6. **Client Testimonials**: Replace `[TESTIMONIAL: "..."]` in `src/data/testimonials.ts` with signed client quotes and names.
7. **Service Timelines**: Specific turnaround times are marked with `[TIMELINE: ...]` in `src/data/services.ts`.
