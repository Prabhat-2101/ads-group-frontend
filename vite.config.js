import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.BACKEND_URL': JSON.stringify(env.BACKEND_URL)
    },
    plugins: [react(),tailwindcss()],
  }
})
