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
    date: z.coerce.date(),
    location: z.string(),
    description: z.string().optional(),
    link: z.string().optional(),
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
        where: z.string().optional(),
        when: z.string().optional(),
        details: z.array(z.string()).optional(),
      })
    ),
  }),
});

export const collections = { blog, publications, talks, cv };
