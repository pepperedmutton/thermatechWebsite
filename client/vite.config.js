import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // react-router-dom v7 doesn't ship server.js; point SSG to the server entry from react-router
      'react-router-dom/server': 'react-router/dist/production/index-react-server.mjs',
      'react-router-dom/server.js': 'react-router/dist/production/index-react-server.mjs',
    },
  },
  // Bundle these CommonJS deps for SSR/SSG to avoid named-export interop issues
  ssr: {
    noExternal: ['react-helmet-async', 'react-katex'],
  },
})
