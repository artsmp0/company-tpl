import AutoImport from 'unplugin-auto-import/vite';

export const pluginAutoImport = () =>
    AutoImport({
        dts: './types/auto-imports.d.ts',
        imports: [
            'vue',
            'vue-router',
            {
                'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
            },
        ],
    });
