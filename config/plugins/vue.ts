import vue from '@vitejs/plugin-vue';
import { isEnvTrue } from '../utils';

export const pluginVue = ({ VITE_VUE_DEFINE_MODEL }: ImportMetaEnv) =>
    vue({
        script: {
            defineModel: isEnvTrue(VITE_VUE_DEFINE_MODEL),
        },
        include: [/\.vue$/, /\.md$/],
        template: {
            compilerOptions: {
                // 注册自定义组件micro-app 防止控制台警告
                isCustomElement: tag => /^micro-app/.test(tag),
            },
        },
    });
