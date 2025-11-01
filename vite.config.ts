import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// إعداد Vite مع دعم GitHub Pages + React + مفاتيح البيئة
export default defineConfig(({ mode }) => {
  // تحميل متغيرات البيئة من ملف .env
  const env = loadEnv(mode, '.', '')

  return {
    // 👇 مهم جدًا لموقع GitHub Pages (اسم المستودع)
    base: '/Piscool/',

    // إعدادات خادم التطوير المحلي
    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // المكونات الإضافية (plugins)
    plugins: [react()],

    // تعريف المتغيرات العامة
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    // إعداد المسارات المختصرة (aliases)
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // تحسينات البناء (اختياري لكن مفيد)
    build: {
      outDir:
