import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  // https://unocss.dev/presets/attributify
  presets: [presetUno(), presetAttributify()],
  // https://unocss.dev/config/rules
  rules: [],
  // https://unocss.dev/config/shortcuts
  shortcuts: {
    'border-base': 'border-solid dark:border-white/9 border-[#EFEFF5] border-1',
    'rounded-base': 'rounded-[var(--border-radius)]',
    'bg-base': 'dark:bg-#18181c bg-white',
    'text-base': 'dark:text-white/82'
  },
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      'text-color': 'var(--n-text-color)'
    }
  }
});
