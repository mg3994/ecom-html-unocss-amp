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
  rules: [
    // Safe area inset utilities
    ['safe-pt', { 'padding-top': 'env(safe-area-inset-top, 0px)' }],
    ['safe-pb', { 'padding-bottom': 'env(safe-area-inset-bottom, 0px)' }],
    ['safe-pl', { 'padding-left': 'env(safe-area-inset-left, 0px)' }],
    ['safe-pr', { 'padding-right': 'env(safe-area-inset-right, 0px)' }],
    ['safe-mt', { 'margin-top': 'env(safe-area-inset-top, 0px)' }],
    ['safe-mb', { 'margin-bottom': 'env(safe-area-inset-bottom, 0px)' }],

    // Viewport segments & foldable hinge gap utilities (Book / Dual-Screen mode)
    ['foldable-gap', { 'gap': 'max(1.5rem, calc(env(viewport-segment-left 0 1, 0px) - env(viewport-segment-width 0 0, 0px)))' }],
    ['fold-hinge-x', { 'padding-left': 'calc(env(viewport-segment-left 0 1, 0px) - env(viewport-segment-width 0 0, 0px))' }],
    ['fold-left-width', { 'width': 'env(viewport-segment-width 0 0, 100%)' }],
    ['fold-right-width', { 'width': 'env(viewport-segment-width 0 1, 100%)' }],

    // Clamshell / Tabletop posture utilities (Horizontal hinge mode)
    ['tabletop-gap', { 'gap': 'max(1rem, calc(env(viewport-segment-top 0 1, 0px) - env(viewport-segment-height 0 0, 0px)))' }],
    ['tabletop-top-height', { 'min-height': 'env(viewport-segment-height 0 0, auto)' }],
    ['tabletop-bottom-height', { 'min-height': 'env(viewport-segment-height 0 1, auto)' }],

    ['glass-border', { 'border-color': 'rgba(255, 255, 255, 0.15)' }],
    ['text-shadow-sm', { 'text-shadow': '0 1px 2px rgba(0,0,0,0.1)' }],

    // Dynamic AMP List Grid Layout
    ['responsive-product-grid', { 'display': 'block', 'width': '100%' }],
  ],
  shortcuts: {
    'btn-primary': 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center justify-center shadow-sm hover:shadow-md active:scale-95',
    'btn-secondary': 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center justify-center border border-gray-200/80 dark:border-gray-700/80 active:scale-95',
    'btn-outline': 'border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/40 font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center',
    'card-base': 'bg-white dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
    'glass-header': 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 sticky top-0 z-40 transition-colors safe-pt',
    'badge-sale': 'bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm',
    'badge-category': 'bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200/60 dark:border-green-800/60 text-xs font-semibold px-3 py-1 rounded-full',
    'nav-pill': 'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 text-gray-600 dark:text-gray-300',
    'nav-pill-active': 'whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold bg-green-600 text-white shadow-sm',
    'trust-card': 'flex items-center gap-3.5 p-4 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-sm',
    'fold-split-grid': 'grid grid-cols-1 lg:grid-cols-2 gap-6 foldable-gap items-start',
    'fold-pane': 'bg-white dark:bg-gray-800/90 rounded-2xl p-5 sm:p-6 border border-gray-200/70 dark:border-gray-700/60 shadow-sm',
    'fold-badge': 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1',
    'tabletop-split-grid': 'flex flex-col gap-4 tabletop-gap',
  }
})
