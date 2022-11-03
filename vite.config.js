import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server:{
    port: 8866, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    host: '0.0.0.0',//ip地址
    proxy: {
      "/api": {
        target: "http://localhost:8877",
        changeOrigin: true,
        //去掉请求中的api字段  rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  //配置sass
  css: {
    preprocessorOptions: {
      scss: {
        // '@import "assets/scss/globalVar.scss";@import "assets/scss/globalMixin.scss";'
        additionalData: '@import "../assets/scss/globalVar.scss";@import "../assets/scss/globalMixin.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
