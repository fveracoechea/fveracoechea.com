import rehypeSlug from 'https://esm.sh/rehype-slug@6.0.0';
import lume from 'lume/mod.ts';
import code_highlight from 'lume/plugins/code_highlight.ts';
import date from 'lume/plugins/date.ts';
import esbuild from 'lume/plugins/esbuild.ts';
import favicon from 'lume/plugins/favicon.ts';
import jsx from 'lume/plugins/jsx_preact.ts';
import mdx from 'lume/plugins/mdx.ts';
import metas from 'lume/plugins/metas.ts';
import ogImages from 'lume/plugins/og_images.ts';
import postcss from 'lume/plugins/postcss.ts';
import robots from 'lume/plugins/robots.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import tailwindcss from 'lume/plugins/tailwindcss.ts';

import extractToc from './src/_plugins/mdxToc.ts';
import tailwindConfig from './tailwind.config.ts';

const site = lume(
  {
    src: './src',
    location: new URL('https://fveracoechea.com'),
  },
  {
    markdown: {
      extensions: ['.md', '.mdx'],
    },
  },
);

site.use(date());

// rendering
site.use(jsx({}));
site.use(code_highlight());
site.use(
  mdx({
    rehypePlugins: [rehypeSlug],
  }),
);

site.use(extractToc('post'));

site.use(
  esbuild({
    extensions: ['.ts', '.js', '.tsx'],
    options: {
      legalComments: 'none',
      splitting: true,
    },
  }),
);

// site.use(terser(/* Options */));

// styles
site.use(
  tailwindcss({
    extensions: ['.html', '.mdx', '.tsx'],
    options: tailwindConfig,
  }),
);
site.use(postcss());

site.use(
  ogImages({
    // @ts-ignore invalid type
    satori: {
      width: 750,
      height: 400,
    },
  }),
);
site.use(metas(/* Options */));
// Explicit allow access to Google and Bing
site.use(
  robots({
    allow: ['Googlebot', 'Bingbot'],
  }),
);
site.use(
  sitemap({
    filename: 'sitemap.xml', // to change the sitemap filename
    sort: 'date=desc', // To sort by data in ascendent order
  }),
);

// static assets
site.use(favicon());
// Copy the content of "assets" directory to the root of your site
site.copy('assets', '.');

export default site;
