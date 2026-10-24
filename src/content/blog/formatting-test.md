---
title: "Formatting test (delete before launch)"
date: 2026-10-24
tag: "Test"
summary: "What a blog post looks like: headings, figures, code and maths."
---

This post shows how blog posts look, so you can judge the style. **Delete this file before launch.**

Posts are plain markdown files in `src/content/blog/`. The file name becomes the address, so `my-new-paper.md` is published at `/blog/my-new-paper/`.

## A heading

Regular text, with *italics*, **bold** and [a link](https://www.nature.com). Paragraphs are kept to a comfortable reading width.

> A quote, for highlighting a key finding.

## A figure

<figure>
  <img src="../../images/infographic.png" alt="Research overview infographic" />
  <figcaption>Figures can have captions underneath.</figcaption>
</figure>

## Code

```python
import scanpy as sc
adata = sc.read_h5ad("cells.h5ad")
sc.pl.umap(adata, color="cell_type")
```

## Maths

Inline maths like $y = \beta g + \epsilon$ works, and so do display equations:

$$
y_{ij} = \mu + \beta_c \, g_i + u_i + \epsilon_{ij}
$$
