import lume from 'lume/mod.ts';
import code_highlight from 'lume/plugins/code_highlight.ts';
import jsx from 'lume/plugins/jsx.ts';
import mdx from 'lume/plugins/mdx.ts';
import metas from 'lume/plugins/metas.ts';
import postcss from 'lume/plugins/postcss.ts';
import robots from 'lume/plugins/robots.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import tailwindcss from 'lume/plugins/tailwindcss.ts';

import tailwindConfig from './tailwind.config.ts';

const site = lume({ src: './src' });

// rendering
site.use(jsx());
site.use(code_highlight());
site.use(mdx());

// styles
site.use(
  tailwindcss({
    extensions: ['.html', '.mdx', '.tsx'],
    options: tailwindConfig,
  }),
);
site.use(postcss());

// Explicit allow access to Google and Bing
site.use(metas(/* Options */));
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
site.copy('images', 'images');
site.copy('scripts', 'scripts');

export default site;
