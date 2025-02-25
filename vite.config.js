// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/3DWebSynth/', // Set this to the name of your GitHub repo
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Increased the limit to avoid warnings
  },
  server: {
    open: true, // Automatically open the app in the browser
  },
});
