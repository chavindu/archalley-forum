/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#FFA500', // Orange
          light: '#FFB84D',   // Lighter shade for hover states
          dark: '#E69500',    // Darker shade for active states
        },
        // Light Theme Colors
        light: {
          bg: '#FFFFFF',      // Background
          text: {
            primary: '#1A1A1A',   // Main text
            secondary: '#333333', // Supporting text
          },
        },
        // Dark Theme Colors
        dark: {
          bg: '#1A1A1A',      // Background
          text: {
            primary: '#FFFFFF',   // Main text
            secondary: '#CCCCCC', // Supporting text
          },
        },
      },
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 