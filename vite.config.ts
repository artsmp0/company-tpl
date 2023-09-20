import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { createVitePlugins } from './config/plugins';
import { isEnvTrue } from './config/utils';

const envDir = fileURLToPath(new URL('env', import.meta.url));
const srcDir = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig((c: ConfigEnv) => {
    const env = loadEnv(c.mode, envDir) as ImportMetaEnv;
    const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_DROP_DEBUG, VITE_LISTEN_HTTPS, VITE_PORT } = env;

    return {
        base: VITE_PUBLIC_PATH,
        envDir,
        plugins: createVitePlugins(c, env),
        resolve: {
            alias: {
                '@': srcDir,
                '@src': srcDir,
            },
        },
        build: {
            target: 'es2015',
            cssTarget: 'chrome80',
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
            pure: [isEnvTrue(VITE_DROP_CONSOLE) && 'console.log', isEnvTrue(VITE_DROP_DEBUG) && 'debugger'].filter(Boolean) as string[],
            exclude: ['node_modules/gupo-icons-vue3/*'],
        },
        server: {
            https: isEnvTrue(VITE_LISTEN_HTTPS),
            port: parseInt(VITE_PORT),
            host: true,
            // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
            proxy: {},
        },
    };
});
