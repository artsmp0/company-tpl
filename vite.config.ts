import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { createVitePlugins } from './config/plugins';

const envDir = fileURLToPath(new URL('env', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig((c: ConfigEnv) => {
    const env = loadEnv(c.mode, envDir) as ImportMetaEnv;
    const { VITE_PUBLIC_PATH } = env;

    return {
        base: VITE_PUBLIC_PATH,
        envDir,
        plugins: createVitePlugins(c, env),
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        build: {
            modulePreload: {
                polyfill: true,
            },
            rollupOptions: {
                output: {
                    // 拆包是为了更好的利用浏览器缓存，对于首次加载能达成的效果微乎其微
                    manualChunks: {
                        'monaco-editor': ['monaco-editor'],
                        'naive-ui': ['naive-ui'],
                        echarts: ['echarts'],
                        'vue-vendor': ['vue', 'vue-router', 'pinia'],
                        util: ['lodash-unified', '@vueuse/core'],
                    },
                },
            },
        },
        esbuild: {
            // drop: command === 'serve' && mode === 'production' ? ['console', 'debugger'] : [],
        },
    };
});
