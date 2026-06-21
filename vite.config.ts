import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  return {
    base: process.env.GITHUB_PAGES === '1' || process.env.GITHUB_PAGES === 'true'
      ? '/w.m.-development-web/'
      : '/',

    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
