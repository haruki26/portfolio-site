import { createRequire } from 'node:module'
import { fileURLToPath, URL } from 'node:url'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

const require = createRequire(import.meta.url)

// This needs to be resolved to the server-side version of html-dom-parser
// since running this on the edge will throw an error.
const htmlDomParserPath = require.resolve(
  'html-dom-parser/lib/server/html-to-dom',
)

const config = defineConfig({
  resolve: {
    alias: [
      {
        find: 'html-dom-parser',
        replacement: htmlDomParserPath,
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  ssr: {
    optimizeDeps: {
      include: ['html-react-parser'],
    },
  },
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: 'https://about.yosei-82s.fun',
      },
    }),
    viteReact(),
  ],
})

export default config
