import { defineConfig } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'astro-preview-compat-date',
    compatibilityDate: '2026-10-12',
  },
});
