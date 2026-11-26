import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Library build: dist/index.js (components) + dist/styles.css (tokens, fonts, utilities).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    rollupOptions: {
      // React and every runtime dependency are installed by the app, not bundled.
      external: (id) =>
        /^(react|react-dom|react\/jsx-runtime|@radix-ui\/|class-variance-authority|clsx|tailwind-merge)/.test(id),
    },
  },
})
