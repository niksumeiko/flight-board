/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
    extends: './vite.config.ts',
    test: {
        name: 'unit',
        environment: 'node',
        include: ['src/**/*.test.{ts,tsx}'],
        exclude: ['src/**/__tests__/*.test.tsx'],
    },
});
