import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  build: {
    outDir: '../garage_map/static/garage_map/react-dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'frontend/src/main.jsx'),
      },
    },
  },
  server: {
    port: 5173,
    cors: true,
  },
})
