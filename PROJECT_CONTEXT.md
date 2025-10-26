# 🚀 PROJECT_CONTEXT.MD
# This is the "System of Record" and living memory for our project.
# You MUST read this file before starting any new task.
# You MUST append to the <changelog> at the end of every task.

<constitution>
  ## The Five Pillars of Quality
  This project is built on five equal pillars. All code must satisfy all five.

  **1. DESIGN & UX EXCELLENCE (The "Maestro")**
  * **Goal:** The site must be beautiful, modern, intuitive, and visually stunning.
  * **Action:** Propose modern layouts, clean typography, and purposeful animations. CSS must be mobile-first, responsive, and elegant.
  * **Context:** Adhere to the design language in `style.css` (CSS Vars for color, font, spacing).

  **2. PEAK PERFORMANCE (The "Engineer")**
  * **Goal:** Blazing fast (Lighthouse 95+).
  * **Action:** Proactively optimize all assets and code.
  * **Context:** Follow `MEDIA_OPTIMIZATION_GUIDE.md`. All media uses `<picture>`, `webp`/`avif`, `srcset`, and `loading="lazy"`. All JS is efficient and non-blocking.

  **3. STRATEGIC SEO (The "Marketer")**
  * **Goal:** Built from the ground up to rank on search engines.
  * **Action:** Proactively implement all SEO best practices.
  * **Context:** Follow `SEO-TODO.md`. All pages get `<link rel="canonical">`, `sitemap.xml` is updated, Schema.org markup is used, and all elements have `alt`/`aria-` attributes.

  **4. DATA-DRIVEN ARCHITECTURE (The "Architect")**
  * **Goal:** A clean, scalable, and maintainable codebase.
  * **Action:** **NEVER** hard-code content (text, project data).
  * **Context:**
      * **Project Data:** All portfolio content MUST come from `projects.json`.
      * **UI Text:** All user-facing text (buttons, labels) MUST come from `ui-strings.json` to support our bilingual (SV/EN) requirement.
      * **Structure:** Follow the hybrid model: a dynamic `index.html` and static individual `/projekt/*.html` pages.

  **5. PRODUCTION-GRADE ENGINEERING (The "QA Expert")**
  * **Goal:** Bug-free, testable, and robust code.
  * **Action:** All new JS logic must be accompanied by unit tests. All code must adhere to linting and formatting rules. All features must have robust error handling.
  * **Context:** We will use **Vitest** for unit testing, **ESLint** for linting, and **Prettier** for formatting. Config files to be generated.
</constitution>

<current_state>
  ## Project Current State (2025-10-26)

  ### Version
  * **Current Version:** 2.1.0
  * **Status:** Production-Ready
  * **Architecture:** Static site with JSON-driven content
  * **Hosting:** GitHub Pages
  * **Domain:** https://karingunnerek.se

  ### Active Features
  * ✅ Bilingual support (Swedish/English) via `ui-strings.json`
  * ✅ 13 portfolio projects loaded from `projects.json`
  * ✅ Individual SEO-optimized project pages in `/projekt/`
  * ✅ Load More pagination (9 desktop / 4 mobile initial load)
  * ✅ Calendly integration for booking consultations
  * ✅ Smooth scroll navigation with active state
  * ✅ Back-to-top button with smart positioning
  * ✅ Cookie consent banner (GDPR compliant)
  * ✅ Responsive design (mobile-first approach)
  * ✅ Hero video with audio toggle
  * ✅ Intersection Observer scroll animations
  * ✅ Language switcher in footer

  ### Recent Optimizations (October 2025)
  * ✅ Removed 150+ lines of unused modal/carousel JavaScript (~5KB reduction)
  * ✅ Added canonical tags to all pages
  * ✅ Created media optimization scripts (not yet executed)
  * ✅ Updated sitemap with current dates
  * ✅ Added resource preloading for critical assets
  * ✅ Removed .DS_Store and added .gitignore

  ### Performance Metrics
  * **JavaScript Bundle:** ~11KB (reduced from ~16KB)
  * **Current Page Size:** ~2.9MB (unoptimized media)
  * **Target Page Size:** ~600KB-1.2MB (after media optimization)
  * **Lighthouse Target:** >95 all categories
</current_state>

<architecture_guide>
  ## How to Implement New Features

  This section teaches you *how* to contribute to this project.

  **To Add a New Static UI Element (e.g., a new "Services" section):**
  1. **Add Text:** Add new keys to `ui-strings.json` for all new text (e.g., `"sections.servicesTitle"`).
  2. **Add HTML:** Add the semantic HTML to `index.html`. Use the `data-i18n-key` attribute (e.g., `data-i18n-key="sections.servicesTitle"`).
  3. **Add CSS:** Add new, mobile-first CSS rules to `style.css`. You MUST use existing CSS variables (e.g., `var(--color-primary)`, `var(--space-lg)`).

  **To Add New Dynamic Data (e.g., a new "Project"):**
  1. **Add Data:** Add a new JSON object to the array in `projects.json`.
  2. **Verify JS:** Check `script.js` to ensure the `loadProjects()` or relevant function will render the new data correctly.
  3. **Create Detail Page:** Create a *new static HTML file* in `/projekt/` (e.g., `/projekt/new-project.html`). This page will *hard-code* the project's details (for SEO) and should be updated in `sitemap.xml`.

  **To Add New JavaScript Functionality:**
  1. **Add Function:** Add your new function to `script.js`, following the existing IIFE pattern.
  2. **Add Test:** Create a new `*.test.js` file (or update an existing one) with Vitest unit tests for your new function.
  3. **Add Error Handling:** Ensure all `fetch` or complex logic is wrapped in `try/catch` blocks with user-friendly error messages (sourced from `ui-strings.json`).

  **To Optimize Media:**
  1. **Run Optimization:** Execute `./optimize-media.sh` to compress images and video.
  2. **Update HTML:** Run `./update-html-with-optimized-media.sh` to update image references.
  3. **Test:** Verify all images load correctly with proper srcset and formats.
</architecture_guide>

<file_structure>
  ## Project File Structure

  ```
  /
  ├── index.html              # Main landing page (bilingual)
  ├── privacy.html            # Privacy policy page
  ├── terms.html              # Terms of service page
  ├── style.css               # All styles (CSS variables, mobile-first)
  ├── script.js               # All JavaScript (IIFE pattern, ES6+)
  ├── projects.json           # Project data (bilingual)
  ├── ui-strings.json         # UI text translations (SV/EN)
  ├── sitemap.xml            # SEO sitemap
  ├── robots.txt             # SEO crawler instructions
  ├── favicon.ico            # Site favicon
  ├── favicon.png            # Site favicon (PNG)
  ├── PROJECT_CONTEXT.md     # THIS FILE - System of Record
  ├── README.md              # User documentation
  ├── SEO-TODO.md            # SEO implementation checklist
  ├── MEDIA_OPTIMIZATION_GUIDE.md  # Media optimization docs
  ├── PR_DESCRIPTION.md      # Recent changes documentation
  ├── optimize-media.sh      # Media compression script
  ├── update-html-with-optimized-media.sh  # HTML update script
  ├── .gitignore            # Git ignore rules
  └── projekt/              # Individual project pages
      ├── modern-villa-skovde.html
      ├── kanalparken-mariestad.html
      ├── sustainable-farmhouse-renovation.html
      ├── gothenburg-office-interior.html
      ├── scandinavian-timber-cottage.html
      ├── urban-townhouse-boras.html
      ├── gothenburg-compact-loft.html
      ├── lake-house-vanern.html
      ├── hjo-house-extension.html
      ├── heritage-restoration-project.html
      ├── skovde-community-pavilion.html
      ├── eco-friendly-cohousing.html
      └── minimalist-garden-studio.html
  ```
</file_structure>

<pending_tasks>
  ## Pending Tasks & Tech Debt

  ### High Priority
  - [ ] Remove ~500 lines of dead modal/carousel CSS from style.css
  - [ ] Execute media optimization scripts (reduce 2.9MB to <1.2MB)
  - [ ] Replace GA_MEASUREMENT_ID placeholder in all project pages
  - [ ] Increment CSS version from v=110 to v=120 after cleanup

  ### Medium Priority
  - [ ] Create package.json with build scripts
  - [ ] Add ESLint and Prettier configs
  - [ ] Set up Vitest for unit testing
  - [ ] Update all date references in SEO-TODO.md
  - [ ] Remove duplicate handlePageLoadScroll function in script.js

  ### Low Priority
  - [ ] Move Calendly inline styles to CSS
  - [ ] Standardize meta descriptions across project pages
  - [ ] Add missing structured data to some projects
  - [ ] Consider implementing build process with bundling

  ### Future Enhancements
  - [ ] Implement Progressive Web App features
  - [ ] Add dark mode support
  - [ ] Create admin panel for content management
  - [ ] Add blog section for SEO content
  - [ ] Implement automated image optimization pipeline
</pending_tasks>

<conventions>
  ## Core Project Conventions (Reference)

  ### JavaScript
  * **Pattern:** Vanilla ES6+ with IIFE for encapsulation
  * **Features:** IntersectionObserver for animations, fetch for JSON
  * **Testing:** Vitest (to be implemented)
  * **Linting:** ESLint (to be configured)
  * **Formatting:** Prettier (to be configured)

  ### CSS
  * **Variables:** All from style.css (e.g., `var(--color-primary)`)
  * **Approach:** Mobile-first responsive design
  * **Organization:** Sections clearly commented

  ### HTML
  * **Structure:** Semantic HTML5
  * **Accessibility:** WCAG 2.1 AA compliant
  * **SEO:** Proper meta tags, structured data

  ### Content Management
  * **Projects:** Driven by `projects.json`
  * **UI Text:** Driven by `ui-strings.json`
  * **Languages:** Swedish (primary) and English

  ### Performance Targets
  * **Lighthouse:** >95 all categories
  * **Page Size:** <1.5MB total
  * **Load Time:** <3s on 3G
  * **First Paint:** <1.5s
</conventions>

<changelog>
  ## Project Changelog
  *This log is appended to by the AI after every completed task.*

  **2025-10-26 (Comprehensive Codebase Audit & Cleanup):**
  * **Created:** PROJECT_CONTEXT.md as central System of Record
  * **Identified:** ~500 lines of dead CSS to remove (modal/carousel)
  * **Found:** Missing configuration files (package.json, eslint, prettier)
  * **Documented:** Complete file structure and pending tasks
  * **Established:** Five Pillars of Quality framework
  * **Status:** Ready for systematic cleanup phase

  **2025-10-25 (Performance Optimization):**
  * **Removed:** 150+ lines of unused modal/carousel JavaScript
  * **Added:** Canonical tags, resource preloading
  * **Created:** Media optimization scripts
  * **Updated:** Sitemap dates
  * **Result:** ~30% smaller JavaScript bundle

  **2025-01 (Mobile & UX Enhancements):**
  * **Implemented:** Load More pagination system
  * **Optimized:** Mobile navigation and hero sizing
  * **Enhanced:** Accessibility features
  * **Added:** Cross-device responsive improvements

  **2024-12 (Initial Release):**
  * **Launched:** Bilingual portfolio website
  * **Implemented:** JSON-driven architecture
  * **Integrated:** Calendly booking system
  * **Achieved:** WCAG 2.1 AA compliance
</changelog>
