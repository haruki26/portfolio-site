import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['routeTree.gen.ts'],
      reporter: [
        'text', 'json-summary', 'json'
      ],
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
      {
        extends: true,
        test: {
          name: 'component',
          environment: 'jsdom',
          include: ['src/**/components/**/*.test.tsx'],
          setupFiles: ['./test/component/setup.ts'],
        }
      },
      {
        extends: true,
        test: {
          name: 'page',
          environment: 'jsdom',
          include: ['src/routes/**/*.test.tsx'],
          exclude: ['src/routes/**/-components/*/*.test.tsx'],
          setupFiles: ['./test/page/setup.ts']
        }
      },
    ],
  }
})
