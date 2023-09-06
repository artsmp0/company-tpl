import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import EnvTypes from 'vite-plugin-env-types';
import VueDevTools from 'vite-plugin-vue-devtools';
import { compression } from 'vite-plugin-compression2';

const envDir = fileURLToPath(new URL('env', import.meta.url));
const iconDirs = [fileURLToPath(new URL('src/assets/icons', import.meta.url))];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, envDir);

  return {
    base: VITE_PUBLIC_PATH,
    envDir,
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        dts: './types/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ]
      }),
      Components({
        dts: './types/components.d.ts',
        dirs: [],
        resolvers: [NaiveUiResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs,
        symbolId: 'icon-[dir]-[name]'
      }),
      EnvTypes({
        dts: './types/env.d.ts'
      }),
      VueDevTools(),
      compression({
        threshold: 1024,
        include: /\.(js|mjs|json|css|html|wasm)$/i,
        algorithm: 'brotliCompress'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      modulePreload: {
        polyfill: true
      },
      rollupOptions: {
        output: {
          // 拆包是为了更好的利用浏览器缓存，对于首次加载能达成的效果微乎其微
          manualChunks: {
            'monaco-editor': ['monaco-editor'],
            'naive-ui': ['naive-ui'],
            echarts: ['echarts'],
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            util: ['lodash-unified', '@vueuse/core']
          }
        }
      }
    }
  };
});
