import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',  // 替换为你的后端服务器地址
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // 可选：重写路径
      }
    }
  },
  define: {
    // 显式定义功能标志，以避免 hydration mismatch 警告
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false', // 或 'true'，根据你的需求
  },
  

})
