# Setup Signal

Setup Signal is a Next.js App Router site for curated product recommendations, Pinterest-friendly articles, affiliate reviews, and category pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Vercel deployment

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Keep the default Next.js framework settings.
4. Add `NEXT_PUBLIC_SITE_URL` in Vercel environment variables with your production domain, for example `https://setupsignal.com`.
5. Deploy.

## Content workflow

- Add article pages in `content/articles/` for Top 5 and roundup-style guides.
- Tag each article with one primary category and up to two secondary categories.
- Add product review pages in `content/products/`.
- Add category pages in `content/categories/`.
- Add static pages like About and policies in `content/pages/`.
- Put images in `public/images/` and reference them from MDX with root-relative paths like `/images/example.jpg`.
