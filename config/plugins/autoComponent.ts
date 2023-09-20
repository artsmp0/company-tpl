import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export const pluginAutoComponent = () =>
    Components({
        dts: './types/components.d.ts',
        dirs: [],
        resolvers: [NaiveUiResolver()],
    });
