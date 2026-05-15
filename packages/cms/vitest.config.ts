import { fileURLToPath, URL } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit logic',
          environment: 'node',
          include: ['src/**/*.test.ts'],
          fileParallelism: false,
          setupFiles: ['./test/unit/setup.ts'],
        },
      },
    ],
  },
})
