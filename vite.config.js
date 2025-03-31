import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Now properly installed
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),  // Required for React projects
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // For SPA routing in dev
  },
  preview: {
    historyApiFallback: true, // For SPA routing in preview
  }
});