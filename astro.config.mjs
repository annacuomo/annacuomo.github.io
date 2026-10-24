// Site configuration.
// SITE_URL and BASE_PATH are set by the GitHub Actions workflow, so the same code
// works for the preview (annacuomo.github.io/new-website) and the final site.
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: process.env.SITE_URL || 'https://annacuomo.github.io',
  base: process.env.BASE_PATH || '/',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: { theme: 'github-light' },
  },
});
