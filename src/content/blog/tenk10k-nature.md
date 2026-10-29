---
title: "TenK10K phase 1 is out in Nature"
date: 2026-10-30
tag: "Paper"
summary: "How common and rare genetic variants shape gene expression across 28 immune cell types, in nearly 2,000 people."
image: /images/blog/tenk10k-fig1a.png
---

I'm very proud to share the main work of my postdoc, now published in *Nature*: the first phase of **TenK10K**, with matched whole-genome sequencing and single-cell RNA sequencing from nearly 2,000 individuals. [Read the paper here](https://www.nature.com/articles/s41586-026-10721-2).

In this post I explain why we built this dataset, what we found, and what has changed since the [preprint](https://www.medrxiv.org/content/10.1101/2025.03.20.25324352v2), so it should make sense whether or not you followed along the first time.

## Why look at genetics one cell at a time?

Most genetic variants linked to disease do not directly change a protein. Instead, they sit in regulatory regions of the genome and change how much of a gene is made: they are expression quantitative trait loci, or eQTLs. Crucially, these effects often happen only in particular cell types or states, which is exactly the information that is lost when gene expression is measured in bulk tissue.

Population-scale single-cell studies, with matched genotypes and single-cell RNA-seq for hundreds (and now thousands) of people, let us map these effects in the cells where they actually act. I wrote more about why this matters in a [review in *Nature Reviews Genetics*](https://www.nature.com/articles/s41576-023-00599-5).

Until now, most single-cell eQTL maps had two limitations. They tested only **common** variants, and they averaged each person's cells into a single "pseudobulk" profile instead of modelling the single cells themselves. TenK10K was designed to tackle both.

## What we did

<figure>
  <img src="../../images/blog/tenk10k-fig1a.png" alt="TenK10K phase 1 study design: blood from 1,925 individuals, whole-genome sequencing and single-cell RNA sequencing, and the six main analyses" />
  <figcaption>TenK10K phase 1 at a glance: whole-genome sequencing and single-cell RNA-seq from the same people, and the main analyses in the paper. Adapted from Cuomo et al., <em>medRxiv</em> 2025 (CC BY 4.0).</figcaption>
</figure>

We collected blood from 1,925 individuals and profiled around 5 million immune cells, roughly 3,000 cells per person, spanning 28 cell types. Whole-genome sequencing gave us both common **and rare** genetic variants for every participant.

To analyse it, we used [SAIGE-QTL](https://www.medrxiv.org/content/10.1101/2024.05.15.24307317v1), a method we recently developed to model single-cell counts directly rather than pseudobulk. It also supports gene-level tests that combine many rare variants together, since each one on its own is too rare to test.

## What we found

The depth of the data paid off.

- We found common-variant eQTLs for **83% of genes**, and a rare-variant signal for **47%**.
- Many of the variants fall in functional regions of the genome, including open chromatin regions from our own single-cell ATAC-seq data.
- Comparing our eQTLs with genetic associations for diseases and blood traits revealed tens of thousands of shared signals, with striking **cell-type specificity**: around 43% of disease loci matched an eQTL in only one cell type.

One example to illustrate this: the gene *OSM* has distinct eQTLs in different immune cell types, and only the effect specific to natural killer (NK) cells overlaps a known risk locus for inflammatory bowel disease (IBD). We can even read off the direction of the effect: higher *OSM* expression in NK cells goes with higher IBD risk. That is exactly the kind of information you need to design a drug that mimics the real biology, and without single-cell resolution the link would be invisible.

<figure>
  <img src="../../images/blog/tenk10k-osm.png" alt="Left: OSM eQTL association signals in CD4 central memory T cells and in NK cells, compared with the IBD GWAS signal at the same locus. Right: scatter of the NK-cell OSM eQTL against IBD GWAS signal, showing strong agreement." />
  <figcaption>The <em>OSM</em> example. Left: distinct eQTL signals for <em>OSM</em> in CD4 central memory T cells and in NK cells; only the NK-cell signal lines up with the IBD risk locus. Right: across variants, the effect on <em>OSM</em> expression in NK cells and the effect on IBD risk line up in the same direction, so higher <em>OSM</em> expression in NK cells corresponds to higher IBD risk. Adapted from Cuomo et al., <em>medRxiv</em> 2025 (CC BY 4.0).</figcaption>
</figure>

Rare variants add a different kind of insight. Take *SH2D2A* in CD4+ central memory T cells: on their own, the individual rare variants near the gene are not especially significant, but tested together they reveal a clear effect on its expression. And it is genuinely their joint effect, across several *non-coding* variants in enhancers, untranslated regions and an intron, rather than a single variant changing the protein. The biology fits nicely, too: *SH2D2A* encodes the T cell-specific adaptor protein (TSAd), which induces cytokine production in CD4+ T cells, and the gene has been linked to autoimmune conditions including hypothyroidism.

<figure>
  <img src="../../images/blog/tenk10k-sh2d2a.png" alt="Single-variant association results for rare non-coding variants around SH2D2A in CD4+ central memory T cells, labelled by functional annotation." style="max-width: 85%" />
  <figcaption>The <em>SH2D2A</em> example. Single-variant results for rare variants around <em>SH2D2A</em> in CD4+ central memory T cells, labelled by functional annotation: individually modest, together they drive a strong gene-level signal. Adapted from Cuomo et al., <em>medRxiv</em> 2025 (CC BY 4.0).</figcaption>
</figure>

The paper also introduces a framework to quantify how cell-type-specific an eQTL is, maps eQTLs whose effects change gradually along cell states, and identifies genetic variants that change how abundant particular cell states are.

## What's new since the preprint

If you read the preprint, here is what we added during revision:

- **Fine-mapping** of all results with SuSiE, to narrow down the likely causal variants and identify secondary independent signals for more than 40% of the genes with an eQTL.
- **A wider search window:** all eQTLs re-mapped within 1 Mb of each gene, as well as the 100 kb window used in the paper.
- **Comparisons with existing datasets:** how much do you gain by doubling the number of people, or the number of cells per person? And how do single-cell eQTLs compare with bulk eQTLs from sorted cell types?
- **More interpretation:** functional annotations to improve the rare-variant tests, the characteristics of cell-type-specific versus shared eQTLs, many more traits for the disease comparisons, and a deeper look at the cell state abundance QTLs.

## A resource for everyone

We want TenK10K to be used well beyond our own papers. All summary statistics, for both window sizes, and the fine-mapping results are [available on Zenodo](https://zenodo.org/records/18221260), and the [analysis code is on GitHub](https://github.com/powellgenomicslab/tenk10k_phase1).

## Companion papers

Two companion papers using this dataset are out in *Nature* today too:

- **Tandem repeats:** Hope Tanudisastro and colleagues show how variation in repetitive DNA shapes cell-type-specific gene expression. [Read it here](https://www.nature.com/articles/s41586-026-10438-2).
- **Chromatin accessibility:** Angli Xue and colleagues map genetic effects on chromatin accessibility in about 3.5 million immune cells. [Read it here](https://www.nature.com/articles/s41586-026-11173-4).

And there is more to come: Albert Henry, Anne Senabouth, Rika Tyebally and colleagues combine our single-cell eQTLs with around 100 traits to point to the genes and cell types likely driving them. It's [available as a preprint](https://www.medrxiv.org/content/10.1101/2025.08.28.25334614v4) for now, and I'll write about it here once it's published.

## Thank you

First, a huge thank you to the participants who gave their time and samples: none of this exists without them. 

On a personal note, this was an amazing project to be part of. I'm very grateful to Joseph Powell and Daniel MacArthur for trusting me with it. I learnt a lot, I'm very proud of the final result, and I miss Australia and the team a lot. Massive thanks and congratulations to everyone involved, including Hope Tanudisastro, Ellie Spenceley, Blake Bowen, Albert Henry, Lawrence Huang, Angli Xue, Wei Zhou, Katrina de Lange and many, many others: the dream team!

For more detail, [read the paper](https://www.nature.com/articles/s41586-026-10721-2) or <a href="#contact" data-e="moc.liamg@omouc.es.anna">get in touch</a>.
