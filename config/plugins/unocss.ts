import UnoCSS from 'unocss/vite';
import { isEnvTrue, safelist } from '../utils';

export const pluginUnocss = ({ VITE_APP_MARKDOWN }: ImportMetaEnv) =>
    UnoCSS({
        safelist: isEnvTrue(VITE_APP_MARKDOWN) ? safelist.split(' ') : undefined,
    });
