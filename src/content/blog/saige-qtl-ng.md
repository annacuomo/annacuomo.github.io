---
title: "SAIGE-QTL is out in Nature Genetics"
date: 2026-11-11
tag: "Method"
summary: "A new robust and scalable model to map single-cell eQTLs for both common and rare variants."
image: /images/blog/saige-qtl-social.png
---

No research articles for a couple of years and now two big papers finally coming out within 10 days of each other!

SAIGE-QTL, the single-cell eQTL mapping method I built with the wonderful Wei Zhou, is now out in _Nature Genetics_: [read the paper](https://www.nature.com/articles/s41588-026-02798-2). If you missed it, our [TenK10K phase 1 paper](https://www.nature.com/articles/s41586-026-10721-2) came out in _Nature_ at the end of last month; it uses SAIGE-QTL, and in fact (for me at least) it was the reason to build it in the first place.

To put things into perspective, I grew and birthed two whole humans in the time between starting both these projects and finally seeing them published 🤯

## Do we really need a new method?

I have long been frustrated that mixed models, which are the standard in population genetic associations (e.g. GWAS), are not routinely used in eQTL mapping analysis.
I get it: those models are computationally more expensive, and in eQTL mapping we need to run many more tests. In a standard GWAS we need to consider only one phenotype (height, type 2 diabetes), and ~1 million independent variants tend to be sufficient to tag all common variants in the genome: so at most 1m tests.
In eQTL mapping we are testing many more phenotypes, let's say 10,000 expressed genes at least.
Even if we limit ourselves to _cis_ mapping, so only variants in the direct vicinity of the genes, we might test hundreds to thousands of variants per gene.
Let's say 200 - we're already at 2m tests. Now let's say we have 4 cell types we're interested in - 8m tests.
A study like TenK10K considers 28 cell types, so you do the maths.

But the annoyance of having more tests to run (and the complication of having to handle the multiple testing burden as a result; instead of simply using a universal threshold like GWAS's p<5e-8) does not eliminate the cryptic relatedness and population structure that may be present in our sample and which is not appropriately modelled by a linear model (which is what is implemented in everyone's favourite [TensorQTL](https://github.com/broadinstitute/tensorqtl), for example).

Once again, we've known this for years and it's the default in disease and trait genetics, and yet molecular QTL genetics has not adopted it universally, far from it.

With single-cell eQTLs, there are further complications.
In bulk transcriptomics, at least, we consider a single expression value per individual, which derives from the sum of hundreds of thousands of cells, so 1) because of the central limit theorem, the distribution can be reasonably approximated as a Normal and 2) each observation(=individual) can be considered genetically independent, assuming we've removed related individuals.

With single-cell RNA-sequencing, neither 1 nor 2 hold. If we're lucky, we get a few thousand cells per individual, but on the other hand we get expression values for each one of them: those are very much not independent, as they share the exact same DNA (because they are coming from the same person).

Additionally, that's far fewer cells than in bulk, so even if we take the sum or the mean of the single-cell values to return to a single-value-per-individual aggregate (aka "pseudobulk"), the distribution of expression typically is very far from a Normal, except for a few extremely highly expressed genes like ribosomal genes.
Also, by aggregating single-cell expression into a pseudobulk we are losing information and washing out potentially important signal.

Lastly, single-cell readouts allow us to get snapshots along a continuous trajectory and therefore test eQTLs that are modulated by a cell state - more on this below.

## The TenK10K phase 1 use case

I already knew that ideally, we wanted a method that implemented a mixed model, and that allowed non-Gaussian distributions, for example Poisson.
Given the unprecedented scale of the TenK10K phase 1 data I was now analysing (~2,000 individuals, 5.4m cells altogether across 28 cell types) I needed it to be fast and scalable.
Finally, because we were calling rare(r) variants from WGS, I needed a solution for that.
I wrote about many of the methodological challenges in a Nature Reviews Genetics review with my postdoc supervisors Joseph Powell and Daniel MacArthur as well as rheumatologist and Harvard professor Soumya Raychaudhuri and Aparna Nathan, a researcher in his lab ([Single-cell genomics meets human genetics](https://www.nature.com/articles/s41576-023-00599-5)).

Existing methods such as my own [CellRegMap](https://link.springer.com/article/10.15252/msb.202110663), [GASPACHO](https://www.nature.com/articles/s41588-023-01421-y), or the Poisson mixed model from R's lme4 package used in Aparna's [_Nature_ paper](https://www.nature.com/articles/s41586-022-04713-1) were built for a different purpose (see "Dynamic QTLs" below) and are far too slow to use at scale for discovery (i.e. to find all eQTLs in a dataset, rather than to analyse specific case examples).

Additionally, no widely used eQTL method (single-cell or otherwise) could test the effects of rare variants.
The scale and rare variant use-case were the two main issues I was facing when wanting to fully exploit the TenK10K data, and I had resorted to building on CellRegMap to speed it up and implement rare variant set tests when Daniel suggested I reach out to Wei Zhou, whom he knew from his previous role at the Broad.

Wei is the first author of the SAIGE toolkit papers (all published in _Nature Genetics_), which she developed during her PhD in Michigan with Seunggeun Lee and Cristen Willer and later her postdoc with Ben Neale and Mark Daly at the Broad, where she has now started her own [lab](https://wzhoulab.com/).

The three SAIGE (which stands for "Scalable and Accurate Implementation of GEneralized mixed model") papers are outlined below:

* [SAIGE](https://www.nature.com/articles/s41588-018-0184-y), Zhou et al _Nature Genetics_ 2018
* [SAIGE-GENE](https://www.nature.com/articles/s41588-020-0621-6), Zhou et al _Nature Genetics_ 2020
* [SAIGE-GENE+](https://www.nature.com/articles/s41588-022-01178-w), Zhou et al _Nature Genetics_ 2022

Briefly, SAIGE is designed for binary phenotypes (disease case-control studies, typical of GWAS) when there is an extreme imbalance in numbers between cases and controls. It implements a logistic mixed model that uses the saddlepoint approximation (SPA) to control inflation, and, being a mixed model, it can adjust for sample relatedness.
SAIGE-GENE expands the framework to region-based tests for rare variants, including SKAT and burden tests.
It retains the SPA implementation for unbalanced binary traits and uses a linear (rather than logistic) mixed model (after inverse-normal transformation) for quantitative traits.
Finally SAIGE-GENE+ improves upon SAIGE-GENE by better handling extremely rare variants (MAF<0.1% or 0.01%).

##  So what is SAIGE-QTL?

SAIGE-QTL builds on the same foundation as SAIGE and SAIGE-GENE(+), keeping all those benefits (adjusting for relatedness, scalability, and calibrated rare-variant tests), and like them can test effects of single variants (for common variants) and sets of variants in a region (for rare variants).
It is also a generalised mixed model, but it uses a Poisson distribution instead, which is better suited for count data such as (single-cell) RNA-seq. It cleverly handles multiple observations per individual, allowing it to model single cells that share identical genotypes.

In the paper, we demonstrate calibration under a variety of settings using simulations, and apply it to real data (mainly [OneK1K](https://www.science.org/doi/10.1126/science.abf3041), the precursor to TenK10K). We show improved power compared to the popular pseudobulk method TensorQTL, and demonstrate applicability to rare variant testing in the single-cell eQTL setting.
We also ran _trans_ eQTL mapping: testing for variants genome-wide including on a different chromosome from the gene of interest.

In the meantime, SAIGE-QTL was used in the two largest population-scale single-cell datasets, our own TenK10K phase 1 ([read about it here](/blog/tenk10k-nature/)!) and the [FinnGen multiome paper](https://www.nature.com/articles/s41586-026-11078-2) from colleagues at the Broad.

## Dynamic QTLs

What does SAIGE-QTL not do?
We purposefully focused on implementing a fast and scalable single-cell eQTL mapping tool for both common and rare variants, and _cis_ and _trans_ mapping. However, at the moment, this works within a well-defined population of cells: for TenK10K, each of the 28 cell types.
One exciting prospect for single-cell eQTL mapping is to map "dynamic" (e)QTLs, where the genetic effect of a variant on a gene's expression is modulated by a cell state or other variable.

So perhaps we only see the effect at a specific point along a trajectory, or only in younger individuals, or only in women, or only in cells where the immune response is switched on (this concept is well illustrated in [this review](https://www.sciencedirect.com/science/article/pii/S0168952520302092)).
We could also call these genotype by context (GxC) interaction effects, a similar concept to genotype by [environment (GxE) interactions](https://www.nature.com/articles/s41576-024-00731-z) in classical statistical genetics.

I developed the cellular regulatory map ([CellRegMap](https://link.springer.com/article/10.15252/msb.202110663)) tool with this specific goal in mind, but unfortunately, while it ran fine for the sample sizes available at the time (100-200 individuals, from my own PhD papers [here](https://www.nature.com/articles/s41467-020-14457-z) and [here](https://www.nature.com/articles/s41588-021-00801-6)), it just does not scale well to thousands of individuals and millions of cells like in TenK10K.
A similar method called [GASPACHO](https://www.nature.com/articles/s41588-023-01421-y) is even more computationally expensive and just not feasible in its current form for large sample sizes (as the authors themselves say in the Discussion of the paper).

This is why we developed CASTIE, led by superstar Yijia Christiana Liu!
CASTIE stands for "Context-Aware Single-cell Tool for Investigating regulatory Effects", and it is specifically designed to test for GxC interactions at scale using single-cell data.
You can read about it in [our preprint](https://www.medrxiv.org/content/10.64898/2026.08.13.26360300v2) :)

## Thank you

This project was a long one but very rewarding, and I am especially proud of the long-distance yet very productive collaboration with Wei and members of her team, especially Linfeng Hu.
With them in Boston and me first in Sydney then in London it wasn't always easy, but we made it happen!
Linfeng really stepped in when many more analyses were required upon revision than Wei or I had bandwidth for and got it across the line!
We had a truly star-studded supervision team with Ben Neale, Mark Daly, Daniel MacArthur and Joseph Powell, and received incredibly valuable contributions from all co-authors, especially Masahiro (Masa) Kanai, Angli Xue, and Yijia Christiana Liu - thank you!

## Abbreviations

- eQTL: expression quantitative trait locus
- GWAS: genome-wide association study
- GxC: genotype by context (interaction)
- GxE: genotype by environment (interaction)
- MAF: minor allele frequency
- SKAT: sequence kernel association test (described in [Wu et al 2011](https://www.cell.com/ajhg/fulltext/S0002-9297(11)00222-9))
- SPA: saddlepoint approximation
- WGS: whole-genome sequencing