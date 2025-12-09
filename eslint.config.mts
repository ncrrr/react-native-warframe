import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    js.configs.recommended,
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
    {
        rules: {
            indent: ['error', 4],
            semi: ['error', 'always'],
            'semi-style': ["error", "last"],
            quotes: ['error', 'single'],
        }
    }
]);
