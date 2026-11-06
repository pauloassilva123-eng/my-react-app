import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Note the slash here!

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-react-app/', // Correct base path for GitHub Pages
})
