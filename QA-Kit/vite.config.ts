import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const sourceDirectory = fileURLToPath(new URL('./src', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.join(sourceDirectory, 'assets'),
      '@components': path.join(sourceDirectory, 'components'),
      '@locales': path.join(sourceDirectory, 'locales'),
      '@pages': path.join(sourceDirectory, 'pages'),
      '@themes': path.join(sourceDirectory, 'themes'),
      '@type': path.join(sourceDirectory, 'type'),
      '@utils': path.join(sourceDirectory, 'utils'),
    },
  },
  server: {
    port: 8080,
  },
})
