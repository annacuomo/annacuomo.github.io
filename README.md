# Anna Cuomo's website

Built with [Astro](https://astro.build) and published with GitHub Pages. Every push to `main` rebuilds the site automatically (see `.github/workflows/deploy.yml`).

## Where things live

| To change… | Edit |
|---|---|
| Bio, name, top-of-page label | `src/data/site.json` (use `**double stars**` for bold) |
| Social links | `src/data/site.json` |
| Publications | `src/data/publications.yaml` (`featured: true` = key publication) |
| CV | `src/data/cv.yaml` |
| Talks | `src/data/talks.yaml` |
| Blog posts | add a markdown file to `src/content/blog/` |
| Images | `public/images/` |
| Colours and fonts | top of `src/styles/global.css` |

## Writing a blog post

Create `src/content/blog/my-post.md`:

```markdown
---
title: "My post title"
date: 2026-10-30
tag: "Paper"
summary: "One line shown in lists."
draft: true   # remove this line to publish
---

Your text here.
```

Posts with `draft: true` are not published.

## Running it on your own computer (optional)

```bash
npm install
npm run dev
```
