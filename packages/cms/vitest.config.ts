import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
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
          setupFiles: ['./test/logic/setup.ts'],
        },
      },
    ],
  },
})

