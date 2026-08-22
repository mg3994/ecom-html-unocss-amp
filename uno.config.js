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
    'navbar': 'h-[70px] bg-white/95 dark:bg-surface-900/95 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 fixed top-0 w-full z-50 flex items-center px-4 transition-all duration-300 shadow-xs',
    'nav-container': 'w-full max-w-7xl mx-auto flex items-center justify-between',
    'nav-left': 'flex items-center gap-3',
    'logo': 'no-underline flex items-center gap-2.5 text-surface-900 dark:text-white font-extrabold text-xl tracking-tight',
    'logo-box': 'w-8 h-8 rounded-lg flex items-center justify-center bg-transparent',
    'logo-text': 'text-lg font-semibold capitalize text-surface-900 dark:text-white',
    'logo-subtext': 'text-[9px] font-normal italic uppercase text-[#3c6522] tracking-wider',
    'desktop-links': 'hidden lg:flex items-center gap-1.5 ml-5',
    'nav-item': 'no-underline text-surface-600 dark:text-surface-300 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-sky-600 transition duration-200',
    'nav-item-active': 'no-underline text-sky-600 dark:text-sky-400 text-sm font-bold px-4 py-2 rounded-lg bg-surface-100 dark:bg-surface-800',
    'actions-group': 'flex items-center gap-1.5',
    'icon-btn': 'bg-transparent border-none w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-sky-600 transition duration-200 relative active:scale-95',
    'btn-primary': 'bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold rounded-xl px-4 py-2.5 transition duration-200 inline-flex items-center justify-center gap-2 cursor-pointer no-underline border-none shadow-sm hover:shadow-md active:scale-[0.98]',
    'btn-secondary': 'bg-surface-200 dark:bg-surface-800 hover:bg-surface-300 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-100 font-bold rounded-xl px-4 py-2.5 transition duration-200 inline-flex items-center justify-center gap-2 cursor-pointer no-underline border border-surface-300 dark:border-surface-700 shadow-sm active:scale-[0.98]',
    'btn-accent': 'bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-xl px-4 py-2.5 transition duration-200 inline-flex items-center justify-center gap-2 cursor-pointer no-underline border-none shadow-sm hover:shadow-md active:scale-[0.98]',
    'btn-google-login': 'bg-white dark:bg-surface-800 text-surface-900 dark:text-white border border-surface-200 dark:border-surface-700 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm cursor-pointer flex items-center gap-2 transition hover:bg-surface-50 shadow-xs active:scale-[0.98]',
    'card-base': 'bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/80 dark:border-surface-800/80 shadow-sm hover:shadow-md hover:border-sky-500/50 dark:hover:border-sky-500/50 transition duration-200 overflow-hidden no-underline block',
    'trust-card': 'bg-white dark:bg-surface-900 p-4 rounded-2xl border border-surface-200/80 dark:border-surface-800/80 shadow-sm flex items-center gap-3.5 transition duration-200 hover:shadow-md',
    'badge-category': 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-sky-200 dark:border-sky-800/80 inline-flex items-center gap-1 no-underline',
    'badge-sale': 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-rose-200 dark:border-rose-800/80 inline-flex items-center gap-1 no-underline',
    'product-card': 'bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-md hover:border-sky-500/50 dark:hover:border-sky-500/50 no-underline relative',
    'product-card-img': 'w-full h-48 object-cover border-b border-surface-200 dark:border-surface-800 transition duration-500 group-hover:scale-105',
    'product-card-body': 'p-5 flex flex-col flex-1 gap-2',
    'product-card-category': 'text-xs font-extrabold uppercase text-sky-600 dark:text-sky-400 tracking-wider',
    'product-card-title': 'text-base font-bold text-surface-900 dark:text-white leading-tight m-0',
    'product-card-price': 'text-lg font-extrabold text-[#f97316] mt-auto',
    'product-card-btn': 'w-full p-2.5 bg-surface-50 dark:bg-surface-800 text-sky-600 dark:text-sky-400 text-center font-bold text-xs border-t border-surface-200 dark:border-surface-800 transition duration-200 group-hover:bg-[#0284c7] group-hover:text-white',
    'filter-chip': 'px-4 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 font-semibold text-xs cursor-pointer transition duration-200 border border-transparent hover:bg-surface-200 dark:hover:bg-surface-700 no-underline inline-block',
    'filter-chip-active': 'px-4 py-1.5 rounded-full bg-[#0284c7] text-white font-bold text-xs cursor-pointer transition duration-200 shadow-sm no-underline inline-block',
    'order-form-card': 'bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl p-6 shadow-md flex flex-col gap-4'
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
