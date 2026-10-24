// Defines the site's content: blog posts (markdown files) and the data files
// for publications, talks and the CV.
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string().default('Post'),
    summary: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    url: z.string(),
    preprint: z.string().optional(),
    review: z.boolean().default(false),
    topic: z.string().optional(),
    rank: z.number().default(99),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    featured: z.boolean().default(false),
    summary: z.string().optional(),
    image: z.string().optional(),
  }),
});

const talks = defineCollection({
  loader: file('src/data/talks.yaml'),
  schema: z.object({
    title: z.string(),
    type: z.string().default('Talk'),
    year: z.number(),
    location: z.string(),
    video: z.string().optional(),
    slides: z.string().optional(),
  }),
});

const cv = defineCollection({
  loader: file('src/data/cv.yaml'),
  schema: z.object({
    order: z.number(),
    heading: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        link: z.string().optional(),
        where: z.string().optional(),
        links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
        when: z.string().optional(),
        details: z.array(z.string()).optional(),
      })
    ),
  }),
});

const topics = defineCollection({
  loader: file('src/data/topics.yaml'),
  schema: z.object({ order: z.number(), title: z.string(), blurb: z.string().optional(), color: z.enum(['teal', 'teal-light', 'plum', 'plum-light', 'mustard']).default('teal'), image: z.string().optional() }),
});

export const collections = { blog, publications, talks, cv, topics };
