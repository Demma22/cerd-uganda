/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C3C01',
        secondary: '#5b6d49',
        accent: '#a2ac82',
        background: '#f1f2ed',
      }
    },
  },
  plugins: [],
}