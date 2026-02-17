import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts|tsx}'],
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
      {
        extends: true,
        test: {
          name: 'component',
          environment: 'jsdom',
          include: ['src/**/*.test.tsx'],
          setupFiles: ['./test/component/setup.ts'],
        }
      }
    ],
  }
})
