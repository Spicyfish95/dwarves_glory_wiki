import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"

// https://vite.dev/config/
export default defineConfig({
  base:"/dwarves_glory_wiki/",
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      svg: {
        multipass: true,
        plugins: [{ name: 'preset-default' }],
      }
    })
  ],
})
