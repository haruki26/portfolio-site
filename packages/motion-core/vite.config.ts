import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./ts', import.meta.url)),
      },
      {
        find: '@pkg',
        replacement: fileURLToPath(new URL('./pkg', import.meta.url)),
      },
    ],
    tsconfigPaths: true,
  },
  plugins: [wasm(), topLevelAwait()],
  build: {
    target: 'es2022',
    lib: {
      entry: 'ts/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
  },
})
