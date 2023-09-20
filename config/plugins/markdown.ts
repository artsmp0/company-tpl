import Markdown from 'unplugin-vue-markdown/vite';
import Prism from 'markdown-it-prism';
import { isEnvTrue, safelist } from '../utils';

export const pluginMarkdown = ({ VITE_APP_MARKDOWN }: ImportMetaEnv) =>
    isEnvTrue(VITE_APP_MARKDOWN) &&
    Markdown({
        wrapperClasses: safelist,
        markdownItSetup(md) {
            md.use(Prism);
        },
    });
