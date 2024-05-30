import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['icon.svg', 'icon_192.png', 'icon_512.png'],
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Multimoney',
        short_name: 'Multimoney',
        theme_color: '#ffffff',
        lang: 'ru',
        icons: [
          {
            src: 'icon_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Добавить доход',
            short_name: 'Доход',
            url: '/#income',
            icons: [{ src: 'income.png', sizes: '96x96', type: 'image/png' }],
          },
          {
            name: 'Добавить расход',
            short_name: 'Расход',
            url: '/#expense',
            icons: [{ src: 'expense.png', sizes: '96x96', type: 'image/png' }],
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3344,
  },
});
