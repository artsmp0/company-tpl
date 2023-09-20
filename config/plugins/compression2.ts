import { compression } from 'vite-plugin-compression2';

export const pluginCompression2 = () =>
    compression({
        threshold: 1024,
        include: /\.(js|mjs|json|css|html|wasm)$/i,
        algorithm: 'brotliCompress',
    });
