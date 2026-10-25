# Notes for working on this site

Anna Cuomo's personal academic website. Astro static site, built and deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main` (the build only runs on GitHub; the Claude
workspace may not have npm access, so validate data files before pushing).

## Where things live
- `src/data/site.json`: name, label above the name (`eyebrow`), bio (`bio`, `bioPrevious`; `**bold**` works), profile links.
  The Email link stores the address reversed in `"e"`; a script in `src/layouts/Base.astro` builds the mailto link in the browser. Never write the address in plain text.
- `src/data/publications.yaml`: all papers. Fields: `featured` (key publication card), `summary`, `image`, `preprint`
  (shown as a "Free preprint" chip), `links` (chips; colour comes from the label: Code = teal, Analysis code/Pipeline = light teal,
  Data = plum, Website/Docs/Browser = plum outline; chips are auto-sorted), `review: true` (plum "Review" tag), `topic`
  (group on the Research page), `rank` (tie-break within a year, 1 first), `padded` (default true).
  Authors: `*` joint first, `#` corresponding; "Cuomo ASE" is bolded automatically.
- `src/data/topics.yaml`: Research page groups (title, blurb, `color`: teal / teal-light / plum / plum-light / mustard, optional `image`).
  The topic colour also tints that paper's key-publication card.
- `src/data/cv.yaml` (CV sections; order < 10 above publications/talks, >= 10 below), `src/data/talks.yaml`.
- `src/content/blog/*.md`: blog posts (`draft: true` hides a post from the site but NOT from this public repo).
- `src/styles/global.css`: palette and all styling. Pages in `src/pages/`, layout in `src/layouts/Base.astro`,
  components in `src/components/` (PubCard, PaperLinks).
- Images: `public/images/` (infographic, profile), `public/images/pubs/` (card figures), `public/images/research/`, `public/images/blog/`.

## Design decisions Anna has made
- Palette: background #FBF7F0, text #2A2522, teal #1B6B73, light teal #8CCBCF, plum #7A2E4D, light plum #C98BA6, mustard #F0C75E.
  Fonts: Fraunces (headings), Manrope (body). Light mode only.
- Mustard is for accents (menu underline, blog tags, Free preprint chip). Links under the bio are plain teal.
- Figures should have transparent backgrounds (they sit on white panels inside tinted cards). Crop out panel letters.
- Research page: tinted panels per topic, coloured titles, no numbers. Home: photo with links under it on the left, bio on the right;
  infographic full width without a panel.
- CV: publications as a plain list; talks with a year column showing each year once.
- Phones: menu and the label above the name must stay on one line.
- Anna is learning: explain which files a change touches so she can follow the commit.

## Rules
- Nothing under embargo goes into this repo (it is public) until the paper is out.
- The repo is served at annacuomo.github.io/new-website as a preview (noindex) until it is swapped in for annacuomo.github.io.
