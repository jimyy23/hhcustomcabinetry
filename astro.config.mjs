import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hhcustomcabinetry.onid.ca',
  output: 'static',
  integrations: [sitemap()],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  compressHTML: true,
});
