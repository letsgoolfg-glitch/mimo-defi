/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mimo: {
          purple: '#8B5CF6',
          violet: '#7C3AED',
          dark: '#0F0A1A',
          'dark-card': '#1A1028',
          'dark-border': '#2D1F4E',
          'dark-hover': '#251A3A',
        },
      },
    },
  },
  plugins: [],
};
