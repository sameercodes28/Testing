# Karin Gunnerek - Architect Portfolio Website

## Overview

A professional, bilingual (Swedish/English), single-page portfolio website showcasing the architectural work of Karin Gunnerek. The site features a data-driven project gallery, advanced UX features including smooth animations and modal interactions, multi-language support with Swedish as the default, load more pagination, cross-device modal system, and an integrated Calendly booking system. Built with modern web standards and optimized for performance, accessibility, and mobile devices.

**Live Site:** [karingunnerek.se](https://karingunnerek.se) *(when deployed)*

## Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with CSS Variables, Flexbox, and Grid
- **JavaScript (ES6+)** - Vanilla JavaScript with modern features and ES modules
- **JSON** - Data-driven content management
- **Calendly** - Integrated booking system
- **GitHub Pages** - Hosting and deployment

## Key Features

✅ **Multi-Language Support** - Swedish (default) and English with localStorage persistence  
✅ **Load More Pagination** - Progressive project loading for better performance  
✅ **Cross-Device Modal System** - Centered on desktop, full-screen on mobile  
✅ **Image Carousel** - Gallery navigation with keyboard support  
✅ **Scroll Animations** - Intersection Observer-based fade-in effects  
✅ **Mobile-First Design** - Optimized for all device sizes  
✅ **Accessibility Compliant** - WCAG 2.1 AA standards with full keyboard navigation  
✅ **Performance Optimized** - Lazy loading, minified assets, and efficient DOM manipulation  

## Content Management Guide

### How to Add a New Project

All projects are managed in the `projects.json` file. To add a new project:

1. Open the `projects.json` file in your text editor
2. Add a new JSON object to the main array (after the last project, before the closing `]`)
3. Use this template and fill in your project details:

```json
{
  "id": "your-project-id",
  "title": {
    "en": "Your Project Title in English",
    "sv": "Ditt Projekttitel på Svenska"
  },
  "year": "2024",
  "description": {
    "en": "Detailed description of your project in English. Explain the concept, materials, and architectural approach.",
    "sv": "Detaljerad beskrivning av ditt projekt på svenska. Förklara konceptet, materialen och det arkitektoniska tillvägagångssättet."
  },
  "mainImage": "path/to/your/main-image.jpg",
  "altText": {
    "en": "Descriptive alt text for the main image in English",
    "sv": "Beskrivande alt-text för huvudbilden på svenska"
  },
  "tags": ["Tag1", "Tag2", "Tag3"],
  "gallery": [
    "path/to/image1.jpg",
    "path/to/image2.jpg",
    "path/to/image3.jpg",
    "path/to/image4.jpg"
  ]
}
```

**Important Notes:**
- Use a unique, lowercase `id` with hyphens (e.g., "modern-office-complex")
- Include both English (`en`) and Swedish (`sv`) translations for title, description, and altText
- The `mainImage` is the thumbnail shown in the project grid
- The `gallery` array contains all images shown in the project modal
- Add a comma after the previous project's closing `}` when adding a new project

### How to Update UI Text and Translations

All interface text is managed in the `ui-strings.json` file:

1. Open `ui-strings.json`
2. Find the section you want to modify (navigation, sections, modal, footer, etc.)
3. Update the English and Swedish text for the desired keys

```json
{
  "navigation": {
    "projects": {
      "en": "Projects",
      "sv": "Projekt"
    }
  }
}
```

### How to Change Images

#### Hero Image
The hero background image is controlled in the `style.css` file:
1. Open `style.css`
2. Find the `.hero__background` class (around line 282)
3. Change the `background-image: url('...')` property to your new image path

```css
.hero__background {
  background-image: url('path/to/your/new/hero-image.jpg');
}
```

#### About Me Photo
The profile photo is in the `index.html` file:
1. Open `index.html`
2. Find the "About" section (around line 154)
3. Change the `src` attribute of the `<img>` tag with class `about__headshot`

```html
<img src="path/to/your/new/profile-photo.jpg" 
     alt="Professional headshot of Karin Gunnerek, architect" 
     class="about__headshot">
```

#### Project Images
All project images are defined in `projects.json`:
- **Main thumbnail:** Update the `mainImage` field for each project
- **Gallery images:** Update the `gallery` array with paths to all project images

### Image Best Practices

#### Compression
- **Always compress images** before uploading using tools like:
  - [TinyPNG](https://tinypng.com/) - Free online compression
  - [ImageOptim](https://imageoptim.com/) - Mac app
  - [Squoosh](https://squoosh.app/) - Google's web app

#### Recommended Dimensions
- **Hero image:** 1920×1080px (landscape)
- **Project images:** 1600×1200px (landscape) or 1200×1600px (portrait)
- **Profile photo:** 400×500px (portrait)

#### File Formats
- **First choice:** WebP format for best performance
- **Fallback:** JPEG with 80-85% quality
- **Avoid:** PNG for photos (much larger file sizes)

#### File Naming
- Use descriptive, lowercase names with hyphens
- Example: `modern-office-exterior-view.webp`

## Site Maintenance

### Updating the Booking Calendar

The booking system is powered by Calendly and embedded in the website:

1. **To change the calendar settings:** Log into your Calendly account at [calendly.com](https://calendly.com)
2. **If the event URL changes:** Update the embed code in `index.html`
   - Find the `calendly-widget` div (around line 180)
   - Replace the `data-url` attribute with your new Calendly event URL

```html
<div class="calendly-inline-widget" data-url="https://calendly.com/your-new-url/30min" style="min-width:320px;height:700px;"></div>
```

### Updating Legal Text

Legal pages can be edited directly:

- **Privacy Policy:** Edit content in `privacy.html`
- **Terms of Service:** Edit content in `terms.html`

These are simple HTML files with standard text content that can be modified with any text editor.

### Multi-Language Content

To update UI text and translations:

1. **Static text:** Edit `ui-strings.json` to modify navigation, buttons, and interface text
2. **Project content:** Edit `projects.json` to update project titles and descriptions
3. **Both files use the format:**
   ```json
   {
     "textKey": {
       "en": "English text",
       "sv": "Svensk text"
     }
   }
   ```

## Deployment

The website is hosted on GitHub Pages and deploys automatically when changes are pushed to the main branch.

### Standard Deployment Workflow

1. **Stage your changes:**
   ```bash
   git add .
   ```

2. **Commit with a descriptive message:**
   ```bash
   git commit -m "Add new project: Modern Office Complex"
   ```

3. **Deploy to live site:**
   ```bash
   git push
   ```

The changes will be live on the website within 2-5 minutes after pushing.

### Quick Deployment Commands

```bash
# Add new project
git add .
git commit -m "Add new project with gallery images"
git push

# Update existing content
git add .
git commit -m "Update project descriptions and hero image"
git push

# Fix bugs or styling
git add .
git commit -m "Fix mobile navigation spacing issue"
git push
```

## Performance Features

### Load More Pagination
- **Desktop:** Shows 9 projects initially, loads 9 more each time
- **Mobile:** Shows 4 projects initially, loads 4 more each time
- **Auto-hide:** Button disappears when all projects are loaded
- **Progressive enhancement:** Works without JavaScript (shows all projects)

### Image Optimization
- **Lazy loading:** Images load only when entering viewport
- **Responsive images:** Optimized sizing for different screen sizes
- **Format optimization:** WebP preferred, JPEG fallback

### Cross-Device Modal System
- **Desktop:** Centered modal with backdrop blur (900px max-width)
- **Mobile:** Full-screen modal with app-like interface
- **Accessibility:** Focus trapping, keyboard navigation, screen reader support
- **Performance:** Scroll lock prevents body scrolling

## Accessibility Features

### Keyboard Navigation
- **Tab navigation:** All interactive elements accessible via keyboard
- **Modal focus trapping:** Focus stays within modal when open
- **Skip links:** Jump to main content for screen readers
- **Arrow key navigation:** Carousel images can be navigated with left/right arrows

### Screen Reader Support
- **Semantic HTML:** Proper heading structure and landmark roles
- **ARIA labels:** Descriptive labels for interactive elements
- **Alt text:** All images have descriptive alternative text
- **Language attributes:** Proper language switching support

### Visual Accessibility
- **High contrast:** Colors meet WCAG AA standards
- **Scalable text:** Layout adapts to user font size preferences
- **Focus indicators:** Clear visual focus states for all interactive elements
- **Reduced motion:** Respects user's motion preferences

## Browser Compatibility

- **Modern browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile browsers:** iOS Safari 14+, Chrome Mobile 90+
- **Graceful degradation:** Core functionality works in older browsers
- **Progressive enhancement:** Advanced features enhance experience in modern browsers

## Core Architectural Principles

*This section serves as a "Project Constitution" for future development and AI assistance.*

### Architecture (Data-Driven)
- **Single source of truth:** All content managed through JSON files (`projects.json`, `ui-strings.json`)
- **Separation of concerns:** Content (JSON), structure (HTML), presentation (CSS), behavior (JavaScript)
- **Scalability:** Easy to add unlimited projects without code changes
- **Maintainability:** Non-technical users can update content without touching code

### User Experience (Minimalist, Complete Features, Animations)
- **Minimalist design:** Clean, professional aesthetic focusing on architectural work
- **Complete feature set:** Project gallery, modal details, carousel, smooth scrolling, back-to-top
- **Smooth animations:** CSS transitions, scroll-triggered animations, hover effects
- **Intuitive navigation:** Single-page flow with smooth scrolling between sections
- **Professional interactions:** Modal overlays, image carousels, keyboard navigation
- **Mobile-first approach:** Optimized mobile experience with progressive enhancement

### Performance (Lighthouse >95, Lazy Loading)
- **Target:** Lighthouse scores >95 in all categories (Performance, Accessibility, Best Practices, SEO)
- **Optimization techniques:**
  - Image lazy loading with `loading="lazy"`
  - Load more pagination system for large project collections
  - Efficient DOM manipulation and event delegation
  - Progressive enhancement approach
  - Minified CSS and JavaScript assets
  - Compressed images and optimized file formats

### Accessibility (WCAG 2.1 AA)
- **Keyboard navigation:** Full keyboard support for all interactive elements
- **Screen reader support:** Semantic HTML, ARIA labels, focus management
- **Visual accessibility:** High contrast ratios, scalable text, focus indicators
- **Motor accessibility:** Large touch targets (44px minimum), reduced motion support
- **Mobile accessibility:** Optimized touch interfaces and readable text sizes

### Security (Strict CSP)
- **Content Security Policy:** Prevents XSS attacks and unauthorized script execution
- **Input sanitization:** All user-facing content properly escaped
- **External dependencies:** Minimal third-party scripts, all from trusted sources
- **HTTPS enforcement:** Secure connections for all resources

### Legal & Privacy (GDPR/Cookies)
- **Cookie consent:** Compliant banner with user choice
- **Privacy policy:** Clear data handling disclosure
- **GDPR compliance:** User rights respected, minimal data collection
- **Terms of service:** Usage terms and liability limitations

### Code Quality (Commenting, Readability)
- **Comprehensive comments:** All functions documented with purpose and parameters
- **Readable structure:** Logical organization, consistent naming conventions
- **Error handling:** Graceful degradation for missing content or failed requests
- **Browser compatibility:** Modern standards with progressive enhancement
- **Mobile-first responsive design:** Optimized for all device sizes
- **Event delegation:** Efficient event handling for dynamic content

### Multi-Language Support
- **Swedish default:** Primary language for target audience
- **English support:** Full translation capability
- **Language persistence:** User preference stored in localStorage
- **Seamless switching:** No page reload required for language changes
- **Professional translations:** Native-level Swedish architectural terminology
- **Cross-device consistency:** Language preferences maintained across all screen sizes

### Modal System Architecture
- **Responsive design:** Desktop-centered vs mobile full-screen approach
- **Scroll lock:** Robust body scroll prevention system
- **Focus management:** Proper keyboard navigation and focus trapping
- **Sticky headers:** Mobile modal headers remain visible during scrolling
- **Image galleries:** Smooth carousel navigation with keyboard support
- **Cross-device optimization:** Different interaction patterns for desktop and mobile

---

**Last Updated:** January 2025  
**Version:** 2.0 - Production Ready  
**Maintained by:** Karin Gunnerek Architecture

## Changelog

### Version 2.0 (January 2025) - Production Ready
- ✅ Complete HTML validation and accessibility improvements
- ✅ Modern ES6+ JavaScript with event delegation and optional chaining
- ✅ Updated comprehensive documentation and code comments
- ✅ Minified production assets for optimal performance
- ✅ Cross-browser compatibility improvements
- ✅ Final production-ready optimization pass

### Version 1.1 (January 2025) - Mobile & Modal Enhancements
- ✅ Comprehensive mobile navigation optimizations
- ✅ Cross-device modal system with desktop centering and mobile full-screen
- ✅ Load More pagination for better performance
- ✅ Hero section height optimization (65vh desktop, 60vh mobile)
- ✅ Circular profile photo on mobile devices
- ✅ Smart back-to-top button positioning
- ✅ Active navigation state improvements
- ✅ Enhanced accessibility and keyboard navigation
- ✅ Robust scroll lock system for modals

### Version 1.0 (December 2024) - Initial Release
- ✅ Initial bilingual portfolio website
- ✅ Data-driven project management system
- ✅ Multi-language support (Swedish/English)
- ✅ Integrated Calendly booking system
- ✅ Core accessibility features (WCAG 2.1 AA)
- ✅ Performance optimizations (Lighthouse >95)
- ✅ GDPR-compliant cookie system

## Support

For technical support or questions about this website:
- **Documentation:** This README file contains comprehensive guidance
- **Issues:** Contact the developer for any technical problems
- **Content Updates:** Follow the Content Management Guide above
- **Legal Pages:** Consult with legal professionals for privacy policy and terms of service updates