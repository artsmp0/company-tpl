import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
  // https://unocss.dev/presets/attributify
  presets: [presetUno(), presetAttributify(), presetIcons({ scale: 1.2 })],
  // https://unocss.dev/config/rules
  rules: [],
  // https://unocss.dev/config/shortcuts
  shortcuts: {
    'border-base': 'border-solid dark:border-white/9 border-[#EFEFF5] border-1',
    'rounded-base': 'rounded-[var(--border-radius)]',
    'bg-base': 'dark:bg-#18181c bg-white',
    'text-base': 'dark:text-white/82',
    'page-wrapper': 'p16 w-full'
  },
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      'text-color': 'var(--n-text-color)'
    }
  }
});
