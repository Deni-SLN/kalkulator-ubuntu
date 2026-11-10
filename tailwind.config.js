/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dsln: {
          darkBg: '#17191F',
          darkSurface: '#20232B',
          darkElevated: '#292D37',
          darkBorder: '#353A47',
          lightBg: '#F5F6FA',
          lightSurface: '#FFFFFF',
          lightElevated: '#E8ECF2',
          lightBorder: '#E2E8F0',
          textDark: '#F5F7FA',
          textLight: '#20232B',
          textMuted: '#9299A8',
          accent: 'var(--accent-color, #2563EB)',
          accentHover: 'var(--accent-hover, #1D4ED8)',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Inter', 'Ubuntu', 'sans-serif'],
        mono: ['Ubuntu Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'fluent': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'fluent-elevated': '0 8px 24px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
