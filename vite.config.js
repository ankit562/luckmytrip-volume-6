import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['cookie'], // Add 'cookie' to external dependencies
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  //    server: {
  //   port: 5173,
  //   // ✅ Add this to handle PayU redirects
  //   strictPort: true,
  //   hmr: {
  //     overlay: false
  //   }
  // },
  // preview: {
  //   port: 5173,
  // }
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000',
  //   },
  // },
});