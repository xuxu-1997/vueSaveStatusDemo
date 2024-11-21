import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5199,
  },
  build: {
    cssCodeSplit:false,
    emptyOutDir:false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js', // 入口文件的命名规则
        chunkFileNames: 'chunks/[name].js', // 非入口文件的命名规则
        assetFileNames: 'assets/[name].[extname]', // 静态资源文件的命名规则
        //禁止代码分割
        manualChunks() {
          return 'all';
        },
      }
    }
  }
})
