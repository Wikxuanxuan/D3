/*
 * @Author: Tianxing.Qin
 * @Date: 2021-10-12 14:15:51
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 16:48:03
 * @Description:
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'info',
  server: {
    port: 3300,
    open: true,
    proxy: {
      '/dev': {
        target: 'https://xxxxxx.dev',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, '') // 将 /api 重写为空
      }
    }
  },
  build: {
    outDir: 'build',
    assetsDir: 'statics'
  },
  resolve: {
    alias: { '@': '/src', '@@': '/node_modules/@datlas/design/esm' }
  },
  plugins: [
    react(),
    eslintPlugin({
      fix: true
    })
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: name => `antd/es/${name}/style`
    //     }
    //   ]
    // })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true
      }
    }
  }
})
