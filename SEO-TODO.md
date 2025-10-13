# SEO Setup TODO List for karingunnerek.se

## Critical Tasks - Do These First!

### 1. Google Analytics Setup (REQUIRED)
**Status:** ⏳ Pending
**Priority:** HIGH
**Location:** `index.html` lines 116 and 121

**Instructions:**
1. Go to https://analytics.google.com
2. Create a Google Analytics 4 (GA4) property
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Replace `GA_MEASUREMENT_ID` in index.html with your actual ID:
   - Line 116: `<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>`
   - Line 121: `gtag('config', 'YOUR_GA_ID');`

---

### 2. Google Search Console Setup
**Status:** ⏳ Pending
**Priority:** HIGH

**Instructions:**
1. Go to https://search.google.com/search-console
2. Add property: https://karingunnerek.se
3. Verify ownership (use HTML tag method or DNS)
4. Submit sitemap: https://karingunnerek.se/sitemap.xml
5. Check for indexing errors
6. Monitor search performance weekly

---

### 3. Google Business Profile (MOST IMPORTANT FOR LOCAL SEO!)
**Status:** ⏳ Pending
**Priority:** CRITICAL

**Instructions:**
1. Go to https://business.google.com
2. Create new business profile
3. Fill out all information:
   - Business name: "Karin Gunnerek Architecture" or "Karin Gunnerek Arkitektur"
   - Category: "Architect"
   - Address: Your business address in Skövde
   - Phone number
   - Website: https://karingunnerek.se
   - Service areas: Skövde, Skaraborg, Västra Götaland
   - Business hours
   - Description (use keywords: arkitekt Skövde, villaritningar, bygglovsritningar)
4. Add high-quality photos:
   - Logo
   - Headshot
   - Project photos (at least 10)
   - Office photos
5. Get verified (Google will send postcard to your address)
6. Ask clients for Google reviews!

**Why this matters:** Google Business Profile is the #1 factor for local search rankings. This will help you appear in:
- Google Maps searches
- "Arkitekt Skövde" searches
- Local pack results (the map box at top of search results)

---

## Medium Priority Tasks

### 4. Create Local Directory Listings
**Status:** ⏳ Pending
**Priority:** MEDIUM

**Directories to list on:**
- [ ] Eniro.se (https://www.eniro.se)
- [ ] Hitta.se (https://www.hitta.se)
- [ ] Ratsit.se
- [ ] Merinfo.se
- [ ] Swedish Architects Association directory
- [ ] Local Skövde business directories

**Ensure consistent NAP (Name, Address, Phone) across all listings!**

---

### 5. Add Contact Information to Website
**Status:** ⏳ Pending
**Priority:** MEDIUM

**Add to footer:**
- Physical address in Skövde
- Phone number
- Email address
- Opening hours (if applicable)

---

### 6. Create Additional Content Pages
**Status:** ⏳ Pending
**Priority:** MEDIUM

**Pages to create:**
- [ ] `/tjanster/` (Services page) - Detail each service:
  - Villaritningar
  - Bygglovsritningar
  - Nybyggnad
  - Renovering
  - Tillbyggnad
  - Projektledning
- [ ] `/om-oss/` (About page) - Expanded about content
- [ ] `/kontakt/` (Contact page) - Form + contact details
- [ ] `/projekt/` (Individual project pages with case studies)

---

### 7. Start Content Marketing / Blog
**Status:** ⏳ Pending
**Priority:** MEDIUM

**Blog post ideas:**
1. "Guide: Så får du bygglov i Skövde 2025"
2. "10 tips för villaritning i Västra Götaland"
3. "Hållbar arkitektur i Skövde - vad du behöver veta"
4. "Vad kostar en arkitekt i Skövde?"
5. "Renovering vs nybyggnad - vad passar dig?"
6. "Arkitektens roll i byggprocessen"

**Target:** 1 blog post per month, minimum

---

## Low Priority Tasks

### 8. Social Media Setup
**Status:** ⏳ Pending
**Priority:** LOW

- [ ] Instagram business account (@karingunnerekarkitektur)
- [ ] Facebook business page
- [ ] LinkedIn company page
- [ ] Post project photos regularly
- [ ] Use hashtags: #arkitektskövde #villaritning #hållbararkitektur

---

### 9. Get Backlinks
**Status:** ⏳ Pending
**Priority:** LOW

**Strategies:**
- Partner with local Skövde businesses (builders, real estate agents)
- Get featured in local Skövde news/media
- Join local business associations
- Guest post on architecture/design blogs
- Create shareable content (design guides, case studies)

---

### 10. Monitor & Improve
**Status:** Ongoing
**Priority:** ONGOING

**Monthly tasks:**
- [ ] Check Google Search Console for errors
- [ ] Review Google Analytics traffic data
- [ ] Update sitemap.xml lastmod dates when content changes
- [ ] Request reviews from satisfied clients
- [ ] Add new project photos
- [ ] Update content with new keywords

---

## Technical Files Created

✅ **robots.txt** - Created and configured
✅ **sitemap.xml** - Created with all pages
✅ **Hreflang tags** - Added for bilingual support
✅ **Schema markup** - Already properly configured
✅ **Meta tags** - Optimized with Swedish keywords

---

## Target Keywords (Current Focus)

### Primary Keywords:
- arkitekt skövde
- villaritning skövde
- arkitekt västra götaland

### Secondary Keywords:
- bygglovsritningar västra götaland
- arkitekt skaraborg
- hållbar arkitektur skövde
- nybyggnad skövde
- renovering arkitekt
- tillbyggnad ritningar

---

## Competitive Analysis - Local Skövde Competitors

### Competitors Analyzed:
1. **AGE Arkitekter** (age-arkitekter.se) - Established Skövde firm
2. **Ritningen Arkitektbyrå** (ritningen.se) - Regional competitor
3. **Cedhag Villaritning** (villaritning.se/arkitekt-skovde) - Strong SEO presence

### Your Current Advantages Over Competitors:
✅ Better meta tag optimization (title, description)
✅ Bilingual Swedish/English support
✅ Modern, clean design
✅ Online booking system (Calendly)
✅ Superior structured data (Schema.org)
✅ Better mobile experience

### What Competitors Do Better:
❌ More project pages (20+ vs your portfolio)
❌ Individual project case study pages
❌ Project categorization (Nybyggnad, Renovering, Tillbyggnad)
❌ Detailed service pages for each offering
❌ Physical address prominently displayed
❌ Content marketing (blog posts)

### Action Items to Gain Competitive Edge:

#### 1. Add Physical Presence (CRITICAL)
**Why:** Both AGE and Ritningen show their Skövde address prominently
**Action:** Add to footer:
```
Karin Gunnerek Arkitektur
[Your Address]
541 XX Skövde
Tel: [Your Phone]
Email: kontakt@karingunnerek.se
```

#### 2. Create Individual Project Pages (HIGH PRIORITY)
**Why:** Competitors have 15-20+ project pages, each is a new SEO opportunity
**Action:**
- Create dedicated page for each project: `/projekt/[project-name]/`
- Each page should include:
  - Project name + location (e.g., "Villa i Skövde")
  - Year completed
  - Project type (Nybyggnad, Renovering, Tillbyggnad)
  - Detailed description (300+ words)
  - 5-10 high-quality images
  - Client testimonial (if possible)
  - Related projects links
- **Target:** Minimum 10 project pages to start

#### 3. Add Project Categories/Filters
**Why:** Ritningen.se has this, makes site more navigable
**Action:** Add categories:
- Nybyggnad (New Construction)
- Renovering (Renovation)
- Tillbyggnad (Extension)
- Villaritningar (Villa Drawings)
- Kommersiella Projekt (Commercial)

#### 4. Create Dedicated Service Pages (HIGH PRIORITY)
**Why:** More pages = more SEO opportunities
**Action:** Create pages for:
- `/tjanster/villaritningar/` - "Villaritningar i Skövde"
- `/tjanster/bygglovsritningar/` - "Bygglovsritningar Västra Götaland"
- `/tjanster/nybyggnad/` - "Nybyggnad Arkitekt Skövde"
- `/tjanster/renovering/` - "Renovering Arkitekt"
- `/tjanster/tillbyggnad/` - "Tillbyggnad Ritningar"

Each page should have:
- 500+ words of unique content
- Process description
- Pricing guide (if possible)
- FAQ section
- CTA to book consultation
- Example projects

#### 5. Build Authority with Content
**Why:** Ritningen has a book publication, AGE has LinkedIn presence
**Action:**
- Write guide: "Komplett guide till bygglov i Skövde 2025"
- Create downloadable PDF: "Checklista för villaritning"
- Case studies: "Hur vi hjälpte [Client] med [Project] i Skövde"
- Before/after renovation galleries

#### 6. Enhance Local SEO Beyond Competitors
**Why:** None of the competitors are fully optimizing local SEO
**Action:**
- Add Google Business Profile (they might not have optimized ones)
- Get listed on more directories than them
- Create location-specific pages:
  - `/arkitekt-skovde/`
  - `/arkitekt-skaraborg/`
  - `/arkitekt-vastra-gotaland/`
- Add FAQ section: "Frågor om arkitekt i Skövde"

#### 7. Add Social Proof
**Why:** Builds trust and authority
**Action:**
- Client testimonials section on homepage
- Google reviews (display on site)
- Before/after project showcase
- Awards/certifications (KTH, Bartlett credentials)
- Press mentions

#### 8. Technical SEO Improvements
**Action:**
- Add breadcrumb navigation
- Implement lazy loading for images
- Optimize image file names: `villa-skovde-2024.jpg` instead of `IMG001.jpg`
- Add image alt text with keywords: "Villaritning Skövde modern arkitektur"
- Create URL structure: `karingunnerek.se/projekt/villa-skovde-2024/`

#### 9. Content Marketing Strategy
**Why:** None of competitors have blogs - big opportunity!
**Action:** Monthly blog posts:
- "Arkitekt vs Byggdesigner - Vad är skillnaden?"
- "Så mycket kostar en arkitekt i Skövde [2025]"
- "Bygglov i Västra Götaland - Kompletta guiden"
- "10 vanligaste misstag vid villaritning"
- "Hållbar arkitektur i Skövde - Trender 2025"

#### 10. Outreach & Partnerships
**Why:** Build local authority and backlinks
**Action:**
- Partner with local builders in Skövde
- Get featured in Skaraborgs Allehanda (local newspaper)
- Join Skövde Business Association
- Collaborate with real estate agents
- Guest post on Swedish architecture blogs
- Offer free consultation to get first projects/testimonials

---

## Quick Wins (Do These This Month!)

### Week 1:
- [ ] Add physical address and phone to footer
- [ ] Create 5 individual project pages
- [ ] Add contact form to website
- [ ] Set up Google Business Profile

### Week 2:
- [ ] Write and publish first blog post
- [ ] Create service pages (at least 3)
- [ ] Optimize all image file names and alt text
- [ ] Add client testimonials section

### Week 3:
- [ ] Submit to Swedish architect directories
- [ ] Create downloadable "Bygglov Guide" PDF
- [ ] Add FAQ section to homepage
- [ ] Reach out to 3 local businesses for partnerships

### Week 4:
- [ ] Publish second blog post
- [ ] Create 5 more project pages
- [ ] Start requesting Google reviews from anyone you've helped
- [ ] Set up email newsletter signup

---

## Target: Outrank Competitors in 6 Months

**Your advantages:** Better technical SEO, modern design, online booking
**Their advantages:** More content, established presence

**Winning strategy:**
1. Leverage your technical advantages
2. Match their content volume (20+ project pages)
3. Exceed their content quality (detailed case studies)
4. Dominate local SEO (Google Business Profile + reviews)
5. Add content marketing they don't have (blog)

**Expected timeline:**
- Month 1-2: Setup and foundation (Google Business, basic content)
- Month 3-4: Content expansion (projects, blog, services)
- Month 5-6: Should start seeing ranking improvements
- Month 6-12: Establish dominance with consistent content

---

## Notes

- SEO is a long-term strategy - expect results in 3-6 months
- Google Business Profile is the quickest win for local rankings
- Consistency is key - keep NAP information identical everywhere
- Get reviews! They're critical for local SEO
- Update content regularly (Google likes fresh content)
- Focus on Swedish language content primarily
- Mobile-friendliness is already good ✅
- **You have technical advantages - leverage them!**
- **Competitors have weak SEO - this is your opportunity!**

---

**Last Updated:** 2025-01-15
**Next Review Date:** 2025-02-15
**Competitive Review:** 2025-01-15
