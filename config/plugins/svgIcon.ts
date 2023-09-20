import { fileURLToPath } from 'node:url';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const iconDirs = [fileURLToPath(new URL('../../src/assets/icons', import.meta.url))];

export const pluginSvgIcon = () =>
    createSvgIconsPlugin({
        iconDirs,
        symbolId: 'icon-[dir]-[name]',
    });
