import EnvTypes from 'vite-plugin-env-types';

export const pluginEnvTypes = () =>
    EnvTypes({
        dts: './types/env.d.ts',
    });
