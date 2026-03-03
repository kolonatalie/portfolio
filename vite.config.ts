import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === 'production' && process.env.DEPLOY_TARGET === 'gh-pages';

  return {
    base: isGitHubPages ? '/portfolio/' : '/',


    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/_variables.scss" as *; @use "@/styles/_mixins.scss" as *;`,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-core': ['react', 'react-dom', 'react-router-dom'],
            'vendor-gsap': ['gsap', '@gsap/react'],
            'vendor-utils': ['lenis', 'clsx']
          }
        },
      },
    },
  };
});