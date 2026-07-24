# Project Roadmap

## Project Summary
Build a premium, minimal, fast-loading recommendation and review site for gaming, desk setup, PC accessories, mobile accessories, tech gadgets, and work-from-home products. The site should be easy to update often, support affiliate links, include search and dark mode, and be optimized for SEO, Pinterest traffic, and Google Search Console.

## Current Status
- Completed: core pages, content model, search, dark mode, sitemap, robots.txt, SEO metadata plumbing, the first Pinterest-friendly article system, and primary/secondary article category support.
- Next up: launch readiness, affiliate validation, more article content, and more production-ready product pages.

## Goals
- Present products in a trustworthy review-and-recommendation format.
- Drive affiliate clicks to Amazon through helpful content first.
- Keep the site fast, lightweight, and easy to host on Vercel.
- Make it simple to add new categories and products over time.
- Support SEO, sitemap, robots.txt, and social sharing metadata from the start.

## Success Criteria
- Visitors can browse categories, search products, and open product detail pages quickly.
- Product pages include summaries, reviews, videos, and affiliate call-to-action buttons.
- The site works well in dark mode and feels premium/minimal.
- The project has a clear content structure that can scale as more items are added.
- Sitemap and robots.txt are ready for Search Console submission.

## Scope for Version 1
### Core Categories
- Gaming
- Desk Setup
- PC Accessories
- Mobile Accessories
- Tech Gadgets
- Work From Home
- Cable Management and Organization

### Initial Product Areas
- Mechanical gaming keyboard
- Wireless gaming mouse
- Mouse pad
- Phone cooler
- Laptop cooling pad
- RGB LED
- Headphone stand
- Cable management box
- Cable sleeves
- Cable clips
- Under-desk cable trays
- Velcro cable ties
- Cable raceways
- Desk organizers
- Charging stations
- Docking stations
- Monitor light bar
- USB-C hub

### Core Features
- Homepage with featured categories and featured products
- Category pages
- Product detail/review pages
- Search bar
- Dark mode toggle
- Affiliate disclosure page
- Sitemap.xml
- Robots.txt
- SEO metadata for pages
- Pinterest-friendly page previews

## Milestones

### Milestone 1: Strategy and Information Architecture
- [x] Confirm site positioning as a recommendation and review hub
- [x] Finalize category structure
- [x] Define page types and navigation
- [x] Decide content fields for categories and products
- [x] Confirm the user journey from Pinterest to product page to affiliate link

### Milestone 2: Tech Stack and Foundation
- [x] Choose the frontend framework
- [x] Set up the Vercel deployment path
- [x] Decide the content storage approach for version 1
- [x] Define how updates will be added over time
- [x] Establish basic project structure

### Milestone 3: Design System
- [x] Define visual style for premium minimal branding
- [x] Choose color palette and typography direction
- [x] Design card styles, buttons, spacing, and layout patterns
- [x] Add dark mode styling
- [x] Confirm mobile-first responsive behavior

### Milestone 4: Core Pages
- [x] Build homepage
- [x] Build category page template
- [x] Build product review page template
- [x] Build about page
- [x] Build affiliate disclosure page

### Milestone 5: Content and Data Model
- [x] Create category data structure
- [x] Create product data structure
- [x] Add sample content for the first categories
- [x] Define fields for reviews, specs, videos, and affiliate links
- [x] Prepare the site for easy content expansion

### Milestone 6: Search and Discovery
- [x] Add a fast search bar
- [x] Support search across categories and products
- [x] Add featured and recommended sections
- [ ] Add related product suggestions

### Milestone 7: Pinterest Articles
- [x] Add an articles collection and article page template
- [x] Add Pinterest-friendly article list pages
- [x] Link articles to related product review pages
- [x] Surface featured articles on the homepage
- [x] Support one primary category and up to two secondary categories on articles
- [ ] Add article comparison and FAQ blocks

### Milestone 8: SEO and Social Sharing
- [x] Generate sitemap.xml
- [x] Add robots.txt
- [x] Add metadata per page
- [x] Add Open Graph and Twitter card metadata
- [ ] Prepare Pinterest-friendly preview images and titles

### Milestone 9: Performance and Quality
- [x] Optimize image loading
- [ ] Keep videos lazy-loaded or embedded efficiently
- [x] Reduce page weight and unnecessary client-side work
- [x] Check mobile performance
- [ ] Test page speed and Core Web Vitals basics

### Milestone 10: Launch Readiness
- [x] Review all pages and navigation
- [ ] Validate affiliate links
- [ ] Submit sitemap to Google Search Console
- [x] Confirm robots.txt rules
- [ ] Finalize launch checklist

### Milestone 11: Growth and Expansion
- [ ] Add more products to existing categories
- [ ] Add new categories as needed
- [ ] Improve review content and comparison sections
- [ ] Track clicks and engagement
- [ ] Refine the design and conversion flow based on usage

## Timeline

### Week 1: July 20, 2026 to July 26, 2026
Focus: planning and structure
- Finalize roadmap
- Confirm category structure
- Define page types and content fields
- Lock the initial scope for version 1

### Week 2: July 27, 2026 to August 2, 2026
Focus: stack and foundation
- Set up the project structure
- Choose the implementation approach for content
- Start the homepage layout
- Establish the base design system

### Week 3: August 3, 2026 to August 9, 2026
Focus: core pages
- Build category pages
- Build product review pages
- Add dark mode support
- Start the affiliate disclosure and about pages

### Week 4: August 10, 2026 to August 16, 2026
Focus: content and discovery
- Add sample product data
- Add search functionality
- Add featured sections and recommendations
- Connect page templates to structured content

### Week 5: August 17, 2026 to August 23, 2026
Focus: SEO and performance
- Add sitemap.xml
- Add robots.txt
- Add metadata and social sharing tags
- Optimize page speed and image handling

### Week 6: August 24, 2026 to August 30, 2026
Focus: launch preparation
- Test the full user flow
- Verify affiliate links
- Submit to Google Search Console
- Prepare first content batch for launch

### Ongoing: After Launch
Focus: growth
- Add new products regularly
- Expand categories
- Improve search and filtering
- Review analytics and click performance

## Content Update Workflow
When adding a new product, follow this sequence:
1. Add the product data entry.
2. Add images and review notes.
3. Add or link a video if available.
4. Confirm the affiliate link.
5. Validate the page preview and metadata.
6. Publish and monitor clicks.

When adding a new article, follow this sequence:
1. Create an MDX file in `content/articles/`.
2. Add the article frontmatter, including title, intro, primary category, up to two secondary categories, cover image, and product slugs.
3. Link the article to the relevant product review pages.
4. Add Pinterest-ready copy in the intro and body.
5. Add images in `public/images/` and reference them with root-relative paths.
6. Confirm the article appears on `/articles` and in search.

## Article Structure And Templates
This section defines the standard format we will follow for all articles so the site stays consistent, easy to scan, and easy to expand.

### Article Types
- List articles, such as "10 Gaming Desk Accessories Worth Buying"
- Category roundup articles, such as best items for gaming, desk setup, or work from home
- Product comparison articles, such as "Best Mechanical Gaming Keyboards"
- Single product review articles when a deeper review is needed

### Standard Article Layout
Every article should follow this order:
1. Hero title
2. Short intro paragraph
3. Table of contents when the article is long enough
4. Individual item sections
5. Summary or recommendation section
6. Affiliate disclosure
7. Related products or related articles

### Standard Item Section Template
Each item in a list article should include:
- Item title
- Short description
- Why it is worth buying
- Pros
- Cons
- Optional image
- Optional video embed
- Affiliate button or link

### Example Item Section Pattern
For each item section, follow this writing pattern:
- State what the item is
- Explain the main benefit
- List a few pros
- List a few cons
- Add the affiliate call-to-action

### Affiliate Link Placement Rules
- Each item section must have its own affiliate link.
- The affiliate link should sit near the end of the section and be easy to see.
- Use clear button labels such as:
  - Check Price on Amazon
  - View on Amazon
  - See Deal
- Do not hide the affiliate link in the body text only.

### Content Fields For Articles
Each article should support these fields:
- Title
- Slug
- Intro
- Primary category
- Up to two secondary categories
- Cover image
- Table of contents label
- Item sections
- Summary section
- Affiliate disclosure text
- SEO title and description

### Content Fields For Item Sections
Each item section should support these fields:
- Item name
- Short description
- Pros
- Cons
- Product image
- Video URL
- Affiliate URL
- Optional rating or recommendation label
- Optional "best for" label

### Writing Rules
- Keep the tone helpful and review-focused.
- Make each section easy to scan.
- Avoid overly promotional language.
- Explain why the item is useful before pushing the affiliate link.
- Keep paragraphs short and readable on mobile.

### Reusable Article Example
An article like "10 Gaming Desk Accessories Worth Buying" should be structured as:
- Intro
- Item 1: Mechanical keyboard
- Item 2: Wireless gaming mouse
- Item 3: Mouse pad
- Item 4: Phone cooler
- Item 5: Laptop cooling pad
- Item 6: RGB LED
- Item 7: Headphone stand
- Item 8: Cable management box
- Item 9: Monitor light bar
- Item 10: USB-C hub
- Final recommendation
- Affiliate disclosure

### Publishing Workflow For Articles
When creating a new article:
1. Choose the article type.
2. Write the title and intro.
3. Add the item sections.
4. Add pros, cons, and affiliate links for each item.
5. Add images and videos where needed.
6. Check metadata and preview quality.
7. Push the update to GitHub.
8. Let Vercel redeploy the site.

## Technical Notes
- Prefer a static-first build so the site stays fast.
- Keep product content data-driven so updates are simple.
- Avoid introducing backend complexity unless it becomes necessary.
- Make sure the site works well on mobile first.
- Keep search lightweight and fast.

## Risks and Watchouts
- Adding too many heavy embeds could slow the site down.
- A complex backend could make updates harder than necessary.
- Thin product content may hurt SEO and trust.
- Visual clutter could weaken the premium/minimal style.

## Definition of Done
- The roadmap items for version 1 are complete.
- The site is deployed on Vercel.
- The homepage, category pages, and product pages are live.
- Search, dark mode, sitemap, and robots.txt are working.
- The site is ready for content expansion.
