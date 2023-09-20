import type { ConfigEnv } from 'vite';
import { pluginVue } from './vue';
import { pluginVueJsx } from './vueJsx';
import { pluginEnvTypes } from './envTypes';
import { pluginUnocss } from './unocss';
import { pluginAutoImport } from './autoImport';
import { pluginAutoComponent } from './autoComponent';
import { pluginSvgIcon } from './svgIcon';
import { pluginVueDevtool } from './vueDevtool';
import { pluginCompression2 } from './compression2';
import { pluginMarkdown } from './markdown';

export const createVitePlugins = (config: ConfigEnv, viteEnv: ImportMetaEnv) => {
    const plugins = [
        pluginVue(viteEnv),
        pluginVueJsx(),
        pluginEnvTypes(),
        pluginUnocss(viteEnv),
        pluginAutoImport(),
        pluginAutoComponent(),
        pluginSvgIcon(),
        pluginVueDevtool(),
        pluginCompression2(),
        pluginMarkdown(viteEnv),
    ];

    return plugins;
};
