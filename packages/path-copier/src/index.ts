// This file will export the public API of the path-copier package.
export * from './swc-plugin.js';

// Exporting the loader path for convenience
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loaderPath = path.resolve(__dirname, 'loader.js');
