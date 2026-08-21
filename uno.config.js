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
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
        950: '#1e1b4b',
      },
      emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
      },
      surface: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      }
    }
  },
  rules: [
    // Safe area inset utilities for mobile & notch devices
    ['safe-pt', { 'padding-top': 'env(safe-area-inset-top, 0px)' }],
    ['safe-pb', { 'padding-bottom': 'env(safe-area-inset-bottom, 0px)' }],
    ['safe-pl', { 'padding-left': 'env(safe-area-inset-left, 0px)' }],
    ['safe-pr', { 'padding-right': 'env(safe-area-inset-right, 0px)' }],

    // Viewport segment & hinge gap utilities for Foldables & Dual-Screen devices
    ['foldable-gap', { 'gap': 'max(1.5rem, calc(env(viewport-segment-left 0 1, 0px) - env(viewport-segment-width 0 0, 0px)))' }],
    ['tabletop-top-height', { 'min-height': 'env(viewport-segment-height 0 0, auto)' }],
    ['tabletop-bottom-height', { 'min-height': 'env(viewport-segment-height 0 1, auto)' }],

    // AMP Direction class utilities (bypasses AMP validator [dir] restriction)
    ['rtl', { 'direction': 'rtl', 'text-align': 'right' }],
    ['ltr', { 'direction': 'ltr', 'text-align': 'left' }],

    // Layout utilities
    ['responsive-product-grid', { 'display': 'block', 'width': '100%' }],

    // Custom ambient glows
    ['glow-indigo', { 'box-shadow': '0 0 25px -5px rgba(99, 102, 241, 0.35)' }],
    ['glow-emerald', { 'box-shadow': '0 0 25px -5px rgba(16, 185, 129, 0.35)' }],
    ['glow-amber', { 'box-shadow': '0 0 25px -5px rgba(245, 158, 11, 0.35)' }],
  ],
  shortcuts: {
    // BUTTON SHORTCUTS
    'btn-primary': 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center justify-center shadow-md shadow-indigo-900/10 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95',
    'btn-secondary': 'bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-100 font-medium py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center justify-center border border-surface-200 dark:border-surface-700 active:scale-95',
    'btn-accent': 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center justify-center shadow-md shadow-emerald-900/10 hover:shadow-lg active:scale-95',
    'btn-amber': 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center justify-center shadow-md shadow-amber-900/10 hover:shadow-lg active:scale-95',
    'btn-icon': 'p-2.5 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl transition-colors cursor-pointer',

    // CARDS & PANELS
    'card-base': 'bg-white dark:bg-surface-800/95 border border-surface-200/80 dark:border-surface-700/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
    'glass-header': 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-md border-b border-surface-200/70 dark:border-surface-800/80 sticky top-0 z-40 transition-colors safe-pt',
    'glass-panel': 'bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border border-surface-200/70 dark:border-surface-700/70 rounded-2xl p-5 shadow-sm',
    'glass-card-hover': 'bg-white/90 dark:bg-surface-800/90 backdrop-blur-md border border-surface-200/80 dark:border-surface-700/80 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl',

    // BADGES & PILLS
    'badge-category': 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1',
    'badge-sale': 'bg-gradient-to-r from-rose-600 to-red-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm',
    'badge-express': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1',
    'nav-pill': 'whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border border-transparent hover:border-surface-200 dark:hover:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-300',
    'nav-pill-active': 'whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/20',

    // FEATURE & POSTURE CARDS
    'trust-card': 'flex items-center gap-3.5 p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200/70 dark:border-surface-700/60 hover:bg-white dark:hover:bg-surface-800 transition-all duration-200 shadow-sm',
    'fold-split-grid': 'grid grid-cols-1 lg:grid-cols-2 gap-6 foldable-gap items-start',
    'fold-pane': 'bg-white dark:bg-surface-800/95 rounded-2xl p-5 sm:p-6 border border-surface-200/80 dark:border-surface-700/70 shadow-sm',
    'fold-badge': 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1',

    // TIMELINE & STEPPER UTILITIES
    'stepper-node-active': 'w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-md glow-indigo',
    'stepper-node-pending': 'w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400 flex items-center justify-center font-bold text-sm',
  }
})
