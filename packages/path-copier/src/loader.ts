// packages/path-copier/src/loader.ts
import { transform } from './swc-plugin.js';

export default async function loader(this: any, source: string) {
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) return source;

    const callback = this.async();
    const filePath = this.resourcePath;

    // We only want to process files in the project, not node_modules
    if (filePath.includes('node_modules')) {
        return callback(null, source);
    }

    try {
        const result = await transform(source, filePath, isDev);
        callback(null, result.code, result.map);
    } catch (err) {
        console.error('Path Copier Loader Error:', err);
        callback(err);
    }
}
