import { defineConfig, presetUno, presetWind3, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetWind3({
      dark: {
        dark: '.amp-dark-mode',
        light: ':not(.amp-dark-mode)'
      }
    }),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    })
  ],
  shortcuts: {
    'btn-primary': 'bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold rounded-xl px-4 py-2.5 transition duration-200 inline-flex items-center justify-center gap-2 cursor-pointer no-underline border-none shadow-sm',
    'btn-secondary': 'bg-surface-200 dark:bg-surface-800 hover:bg-surface-300 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-100 font-bold rounded-xl px-4 py-2.5 transition duration-200 inline-flex items-center justify-center gap-2 cursor-pointer no-underline border border-surface-300 dark:border-surface-700 shadow-sm',
    'btn-accent': 'bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-xl px-4 py-2.5 transition duration-200 inline-flex items-center justify-center gap-2 cursor-pointer no-underline border-none shadow-sm',
    'btn-icon': 'p-2 rounded-xl text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition cursor-pointer no-underline inline-flex items-center justify-center border-none bg-transparent',
    'card-base': 'bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/80 dark:border-surface-800/80 shadow-sm hover:shadow-md hover:border-sky-500/50 dark:hover:border-sky-500/50 transition duration-200 overflow-hidden no-underline block',
    'trust-card': 'bg-white dark:bg-surface-900 p-4 rounded-2xl border border-surface-200/80 dark:border-surface-800/80 shadow-sm flex items-center gap-3.5',
    'badge-category': 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-sky-200 dark:border-sky-800/80 inline-flex items-center gap-1 no-underline',
    'badge-sale': 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-rose-200 dark:border-rose-800/80 inline-flex items-center gap-1 no-underline',
    'glass-header': 'sticky top-0 z-40 bg-white/95 dark:bg-surface-950/95 backdrop-blur-md border-b border-surface-200/80 dark:border-surface-800/80 transition-colors duration-200',
    'nav-pill': 'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition whitespace-nowrap cursor-pointer no-underline',
    'nav-pill-active': 'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 text-white shadow-sm whitespace-nowrap cursor-pointer no-underline'
  },
  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0284c7', // Antinna Sky Primary
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      accent: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316', // Vibrant Orange
        600: '#ea580c',
        700: '#c2410c',
      },
      sky: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0284c7',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
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
        900: '#78350f',
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
  }
});
