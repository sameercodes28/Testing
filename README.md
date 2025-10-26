# Karin Gunnerek Architecture Portfolio

A modern, bilingual (Swedish/English) portfolio website for architectural services in Skövde, Västra Götaland, and Skaraborg regions.

## Table of Contents

- [Overview](#overview)
- [Content Management Guide](#content-management-guide)
- [Site Maintenance](#site-maintenance)
- [Deployment](#deployment)
- [Performance Features](#performance-features)
- [Accessibility Features](#accessibility-features)
- [Browser Compatibility](#browser-compatibility)
- [Core Architectural Principles](#core-architectural-principles)
- [Changelog](#changelog)
- [Support](#support)

## Overview

This website is built with performance, accessibility, and SEO in mind. It features a JSON-driven architecture that separates content from presentation, making it easy to update without touching code.

### Key Features

- **Bilingual Support:** Swedish (primary) and English translations
- **JSON-Driven Content:** All projects and UI text managed through JSON files
- **Performance Optimized:** Lazy loading, pagination, optimized assets
- **SEO Ready:** Individual project pages, sitemap, structured data
- **Accessibility:** WCAG 2.1 AA compliant
- **Responsive Design:** Mobile-first approach with progressive enhancement

## Content Management Guide

### System of Record

**IMPORTANT:** Always consult `PROJECT_CONTEXT.md` before making changes. It is the central source of truth for this project.

### How to Add a New Project

1. Open `projects.json`
2. Add a new JSON object to the main array (after the last project, before the closing `]`)
3. Use this template and fill in your project details:

```json
{
  "id": "your-project-id",
  "title": {
    "en": "Your Project Title in English",
    "sv": "Ditt Projekttitel på Svenska"
  },
  "year": "2025",
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

4. Create a corresponding static HTML page in `/projekt/your-project-id.html`
5. Update `sitemap.xml` with the new project page

**Important Notes:**
- Use a unique, lowercase `id` with hyphens (e.g., "modern-office-complex")
- Include both English (`en`) and Swedish (`sv`) translations for title, description, and altText
- The `mainImage` is the thumbnail shown in the project grid
- The `gallery` array contains all images for the project detail page

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
2. Find the `.hero__background` class
3. Change the `background-image: url('...')` property to your new image path

#### About Me Photo
The profile photo is in the `index.html` file:
1. Open `index.html`
2. Find the "About" section
3. Change the `src` attribute of the `<img>` tag with class `about__headshot`

#### Project Images
All project images are defined in `projects.json`:
- **Main thumbnail:** Update the `mainImage` field for each project
- **Gallery images:** Update the `gallery` array with paths to all project images

### Image Optimization

The project includes automated image optimization scripts:

1. **Run optimization:**
   ```bash
   npm run optimize-media
   ```

2. **Update HTML with optimized images:**
   ```bash
   npm run update-html
   ```

See `MEDIA_OPTIMIZATION_GUIDE.md` for detailed instructions.

## Site Maintenance

### Updating the Booking Calendar

The booking system is powered by Calendly and embedded in the website:

1. **To change calendar settings:** Log into your Calendly account at [calendly.com](https://calendly.com)
2. **If the event URL changes:** Update the embed code in `index.html`
   - Find the `calendly-inline-widget` div
   - Replace the `data-url` attribute with your new Calendly event URL

### Updating Legal Text

Legal pages can be edited directly:
- **Privacy Policy:** Edit content in `privacy.html`
- **Terms of Service:** Edit content in `terms.html`

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
- **Compression:** Automated scripts for image and video optimization

### Performance Metrics
- **JavaScript Bundle:** ~11KB (optimized)
- **Target Page Size:** <1.5MB with optimized media
- **Lighthouse Target:** >95 in all categories
- **Load Time Target:** <3s on 3G connection

## Accessibility Features

### Keyboard Navigation
- **Tab navigation:** All interactive elements accessible via keyboard
- **Skip links:** Jump to main content for screen readers
- **Focus indicators:** Clear visual focus states for all interactive elements

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

### User Experience (Minimalist, Complete Features)
- **Minimalist design:** Clean, professional aesthetic focusing on architectural work
- **Complete feature set:** Project gallery with pagination, smooth scrolling, back-to-top
- **Smooth animations:** CSS transitions, scroll-triggered animations, hover effects
- **Intuitive navigation:** Single-page flow with smooth scrolling between sections
- **Mobile-first approach:** Optimized mobile experience with progressive enhancement

### Performance (Lighthouse >95, Lazy Loading)
- **Target:** Lighthouse scores >95 in all categories
- **Optimization techniques:**
  - Image lazy loading with `loading="lazy"`
  - Load more pagination system for large project collections
  - Efficient DOM manipulation and event delegation
  - Progressive enhancement approach
  - Optimized and minified assets
  - Compressed images and optimized file formats

### Accessibility (WCAG 2.1 AA)
- **Keyboard navigation:** Full keyboard support for all interactive elements
- **Screen reader support:** Semantic HTML, ARIA labels, focus management
- **Visual accessibility:** High contrast ratios, scalable text, focus indicators
- **Motor accessibility:** Large touch targets (44px minimum), reduced motion support
- **Mobile accessibility:** Optimized touch interfaces and readable text

## Changelog

### Version 2.1.0 (October 2025) - Codebase Optimization
- ✅ Created PROJECT_CONTEXT.md as System of Record
- ✅ Removed 150+ lines of unused modal/carousel JavaScript
- ✅ Added build configuration (package.json, ESLint, Prettier)
- ✅ Created media optimization scripts
- ✅ Updated all documentation to current state
- ✅ Improved SEO with canonical tags and updated sitemap

### Version 2.0.0 (January 2025) - Production Ready
- ✅ Complete HTML validation and accessibility improvements
- ✅ Modern ES6+ JavaScript with event delegation
- ✅ Comprehensive documentation and code comments
- ✅ Cross-browser compatibility improvements

### Version 1.1.0 (January 2025) - Mobile & UX Enhancements
- ✅ Comprehensive mobile navigation optimizations
- ✅ Load More pagination for better performance
- ✅ Hero section height optimization
- ✅ Enhanced accessibility and keyboard navigation

### Version 1.0.0 (December 2024) - Initial Release
- ✅ Initial bilingual portfolio website
- ✅ Data-driven project management system
- ✅ Multi-language support (Swedish/English)
- ✅ Integrated Calendly booking system

## Support

For technical support or questions about this website:
- **Documentation:** Consult PROJECT_CONTEXT.md first, then this README
- **Issues:** Contact the developer for any technical problems
- **Content Updates:** Follow the Content Management Guide above
- **Legal Pages:** Consult with legal professionals for privacy policy and terms updates

---

**Last Updated:** October 26, 2025
**Version:** 2.1.0 - Optimized
**Maintained by:** Karin Gunnerek Architecture
