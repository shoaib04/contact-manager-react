import react from '@vitejs/plugin-react'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: browserslistToEsbuild(),
  },
})
