---
title: "TenK10K phase 1 is out in Nature"
date: 2026-10-30
tag: "Paper"
summary: "How common and rare genetic variants shape gene expression across 28 immune cell types, in nearly 2,000 people."
image: /images/blog/tenk10k-fig1a.png
---

I have not written a blog post before, so bear with me, but a first author paper in Nature does not come every day so I thought it was as good a place to start as any, and it was the push I needed to (ask Claude to help me) zhuzh up my personal website.

I'm very proud to share the main work of my postdoc, now published in *Nature*: the first phase of **TenK10K**, with matched whole-genome sequencing and single-cell RNA sequencing from nearly 2,000 individuals. [Read the paper here](https://www.nature.com/articles/s41586-026-10721-2).

I plan on writing a few posts following up on this one to dive into different aspects of this (huge!) dataset but in this post I just want to give an overview of what the dataset looks like, what we found, and where you can find the data to have a look for yourselves!

## Why look at genetics one cell at a time?

Differences ("variants") in the DNA of one person compared to another contribute to how we all look different, and also to our risk of developing diseases, yet most of these genetic variants do not directly change a protein. Instead, they sit in regulatory regions of the genome and change how much of a gene is produced, by turning its expression up or down: they are called expression quantitative trait loci, or eQTLs. Importantly, these effects often can only be detected in particular cell types or states, and are often masked when gene expression is measured in "bulk" one tissue at a time.

Population-scale single-cell studies, with matched genotypes and single-cell RNA-seq for hundreds (and now thousands) of people, let us map these effects in the cell where they actually act, as we wrote in a [recent review in *Nature Reviews Genetics*](https://www.nature.com/articles/s41576-023-00599-5).

TenK10K was designed to tackle two key limitations of existing single-cell eQTL studies. They tested only **common** variants, and they averaged each person's cells into a "pseudobulk" profile instead of modelling the single cell expression profiles directly.

## What we did

<figure>
  <img src="../../images/blog/tenk10k-fig1a.png" alt="TenK10K phase 1 study design: blood from 1,925 individuals, whole-genome sequencing and single-cell RNA sequencing, and the six main analyses" />
  <figcaption>TenK10K phase 1 at a glance: whole-genome sequencing and single-cell RNA-seq from the same people, and the main analyses in the paper. Adapted from Cuomo et al., <em>medRxiv</em> 2025 (CC BY 4.0).</figcaption>
</figure>

We collected blood from 1,925 individuals and profiled 5.4 million cells, approximately 3,000 cells per individual, spanning 28 immune cell types. Whole-genome sequencing gave us both common **and rare** genetic variants for every participant.

To analyse it, we used [SAIGE-QTL](https://www.medrxiv.org/content/10.1101/2024.05.15.24307317v1), a method we recently developed to model single-cell counts directly rather than pseudobulk. SAIGE-QTL also allows us to use gene-level tests (burden and SKAT) that combine many rare variants together, because each one on its own is too rare to test.

## What we found

The size and depth of the data paid off.

- We found common variant eQTLs for 83% of genes, and a rare variant signal for 47%.
- Many of the variants fall in functional regions of the genome, including open chromatin regions from our own single-cell ATAC-seq data.
- Over 60,000 colocalisations, involving more than 5,000 genes and 60 complex traits and blood diseases, with cell type specific eQTLs more likely to colocalise

One example to illustrate this: the gene *OSM* has distinct eQTLs in different immune cell types, and only the effect specific to natural killer (NK) cells overlaps a known risk locus for inflammatory bowel disease (IBD). eQTLs allow us to determine the direction of the effect: higher *OSM* expression in NK cells corresponds to higher IBD risk. Since moving to pharma I have much deeper appreciation for quite how long the path is going from a gene described in a research paper to actually designing a drug, and therefore how important it is to learn as much as possible about a gene's mode-of-action and relationship to disease risk.

<figure>
  <img src="../../images/blog/tenk10k-osm.png" alt="Left: OSM eQTL association signals in CD4 central memory T cells and in NK cells, compared with the IBD GWAS signal at the same locus. Right: scatter of the NK-cell OSM eQTL against IBD GWAS signal, showing strong agreement." />
  <figcaption>The <em>OSM</em> example. Left: distinct eQTL signals for <em>OSM</em> in CD4 central memory T cells and in NK cells; only the NK-cell signal lines up with the IBD risk locus. Right: across variants, the effect on <em>OSM</em> expression in NK cells and the effect on IBD risk line up in the same direction, so higher <em>OSM</em> expression in NK cells corresponds to higher IBD risk. Adapted from Cuomo et al., <em>medRxiv</em> 2025 (CC BY 4.0).</figcaption>
</figure>

Another example just to highlight a rare variant result: *SH2D2A* has a significant gene-level rare variant effect in CD4+ central memory T cells: yet on their own, the individual variants are not especially significant (check that y-axis!). It is genuinely their joint effect, across several *non-coding* variants in enhancers, UTR and an intron, rather than a single variant changing the protein. The biology fits nicely, too: *SH2D2A* encodes the T cell-specific adaptor protein (TSAd), which induces cytokine production in CD4+ T cells, and the gene has been linked to autoimmune conditions including hypothyroidism. Again, so much more work needs to happen now but exciting to see this gene had not been reported previously so a nice highlight of these data's potential.

<figure>
  <img src="../../images/blog/tenk10k-sh2d2a.png" alt="Single-variant association results for rare non-coding variants around SH2D2A in CD4+ central memory T cells, labelled by functional annotation." style="max-width: 85%" />
  <figcaption>The <em>SH2D2A</em> example. Single-variant results for rare variants around <em>SH2D2A</em> in CD4+ central memory T cells, labelled by functional annotation: individually modest, together they drive a strong gene-level signal. Adapted from Cuomo et al., <em>medRxiv</em> 2025 (CC BY 4.0).</figcaption>
</figure>

We did many (and many more, upon revision) analyses I am excited to talk about, but I shall cover those in upcoming posts!!

## A resource for everyone

For the time being, that's all folks! Just a sneak peek of the data, and hopefully an invitation to use TenK10K data for your own analyses. All summary statistics are [available on Zenodo](https://zenodo.org/records/18221260), and the [analysis code is on GitHub](https://github.com/powellgenomicslab/tenk10k_phase1). You can also explore the results in our [interactive browser](https://browser.tenk10k.org/).

## Companion papers

Two companion papers using this dataset are out in *Nature* today too (with all data available and browseable):

- **Tandem repeats:** Hope Tanudisastro and colleagues show how variation in repetitive DNA shapes cell-type-specific gene expression. [Read it here](https://www.nature.com/articles/s41586-026-10438-2).
- **Chromatin accessibility:** Angli Xue and colleagues map genetic effects on chromatin accessibility in about 3.5 million immune cells. [Read it here](https://www.nature.com/articles/s41586-026-11173-4).

And there is more to come: Albert Henry, Anne Senabouth, Rika Tyebally and colleagues combine our single-cell eQTLs with around 100 traits to point to the genes and cell types likely driving them. It's [available as a preprint](https://www.medrxiv.org/content/10.1101/2025.08.28.25334614v4) for now, and I'll write about it here once it's published.

## In the news

- *Nature* news: [Genetic variants that alter gene regulation in specific cell types are closely tied to disease](https://www.nature.com/articles/d41586-026-03067-2)
- Garvan Institute: [Three landmark studies reveal the hidden layers between DNA and disease](https://www.garvan.org.au/news-resources/news/three-landmark-studies-reveal-the-hidden-layers-between-dna-and-disease)

## Thank you

First, thank you to the participants who generously provided their data, and the respective program teams that enabled their inclusion in this project.

On a personal note, this was an amazing project to be part of, and I am very grateful to Joseph Powell and Daniel MacArthur for trusting me with it. I learnt a lot, and am very proud of the final product, and I miss Australia and the team every day!! Massive thanks and congratulations to everyone involved, including Hope Tanudisastro, Ellie Spenceley, Blake Bowen, Albert Henry, Lawrence Huang, Angli Xue, Wei Zhou, Katrina de Lange and many, many others: the dream team!

For more detail, [read the paper](https://www.nature.com/articles/s41586-026-10721-2) or <a href="#contact" data-e="moc.liamg@omouc.es.anna">get in touch</a>.
