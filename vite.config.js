import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    // Bundle only the bot files
    lib: {
      entry: resolve(__dirname, 'bot/main.js'),
      formats: ['iife'],
      name: 'PaperclipsBot',
      fileName: () => 'bot.bundle.js'
    },

    outDir: 'build',
    sourcemap: true,

    rollupOptions: {
      external: [],
      output: {
        // Single file output
        inlineDynamicImports: true,
      }
    }
  }
});
