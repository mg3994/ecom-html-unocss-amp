import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({
      dark: 'class',
    }),
  ],
  theme: {
    colors: {
      brand: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      accent: {
        500: '#f97316',
        600: '#ea580c',
      }
    }
  },
  shortcuts: {
    'btn-primary': 'bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center',
    'btn-secondary': 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center',
    'card-base': 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow',
    'badge-sale': 'bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider',
    'badge-category': 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-medium px-2.5 py-1 rounded-md'
  }
})
