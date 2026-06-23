# app/AGENTS.md

Read this when editing inside `app/`. The repo root `AGENTS.md` covers workspace-wide commands; this file is for the deployable TanStack Start site.

## Role

You are an expert front-end / full-stack engineer working in `app/`, a TanStack Start site deployed to Cloudflare Workers. The app fetches content from microCMS via the `@repo/cms` workspace package and renders with file-based routes.

## Stack (versions are pinned in `package.json`)

- **Framework:** TanStack Start 1.167 + Router 1.169 (file-based routing), React 19, Vite 7
- **Styling:** Tailwind v4 via `@tailwindcss/vite`; class merge via `cn()` (`src/libs/cn/index.ts`); `useSortedClasses` is enforced (root `biome.json` + `app/biome.json`)
- **Validation:** Zod 4 — schemas in `src/features/<domain>/schemas.ts`, types inferred via `z.infer`
- **Server functions:** `@tanstack/react-start` (`createServerFn`, `createServerOnlyFn`)
- **Forms:** `@tanstack/react-form` (see `src/features/contact/hooks/index.ts`)
- **Deploy:** Wrangler 4 + `@cloudflare/vite-plugin`. `wrangler.jsonc` enables `nodejs_compat`; `main` is `@tanstack/react-start/server-entry`
- **Tooling:** Biome 2.2 (lint/format, single root config), Vitest 4 (3 projects — see Tests)
- **Storybook 10** in `app/.storybook/`; stories match `src/**/*.stories.@(ts|tsx)`

## Commands (run from `app/` or use `pnpm -C app <script>`)

- `pnpm dev` — Vite dev server on port 3000 (`vite dev --port 3000`)
- `pnpm build` — `vite build`. Prerender + sitemap are on by default (`vite.config.ts` → `tanstackStart({ prerender: { enabled: true, crawlLinks: true }, sitemap: { enabled: true, host: 'https://about.yosei-82s.fun' } })`)
- `pnpm test` — `vitest run` (no watch). Use `vitest` directly for watch mode
- `pnpm test:coverage` — used by CI; outputs `coverage/coverage-*.json`
- `pnpm lint|format|check` — Biome. `check --write` is what lefthook runs on pre-commit
- `pnpm ci:check` (= `biome check`) and `pnpm ci:type` (= `tsc --noEmit`) — what `ts-ci.yaml` runs
- `pnpm deploy` — `vite build && wrangler deploy`. Needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
- `pnpm storybook` — port 6006. Stories live in `src/**/*.stories.@(ts|tsx)`

## Project structure

```
app/
├── src/
│   ├── routes/                    # file-based routes (one folder per segment)
│   │   ├── __root.tsx             # root layout (HTML shell, JSON-LD Person, devtools)
│   │   ├── index.tsx              # /, top page (works + blogs loader)
│   │   ├── about/, blogs/, works/, contact/  # each has route.tsx + index.tsx + $id/
│   │   └── *.test.tsx             # page tests (co-located)
│   ├── features/                  # one folder per domain
│   │   ├── about/, article/{blog,work,shared}, contact/
│   │   └── <domain>/
│   │       ├── components/<Name>/{index.tsx,*.test.tsx}  # co-located tests
│   │       ├── functions/{index.ts,index.server.ts}      # see "Server functions" below
│   │       ├── hooks/{index.ts,*.test.ts}                # only contact has hooks
│   │       ├── schemas.ts        # zod schemas
│   │       └── types.ts
│   ├── components/                # shared layout (CosmoBackground, Header, Section, ...)
│   │   └── ui/                    # generic UI (Button, Pagination, Divider, ...)
│   ├── integrations/cms/client.ts # getCMSClientMiddleware (the only place that owns the client)
│   ├── libs/                      # pure helpers (cn, env, result, dateParser, ...)
│   ├── configs/                   # myInfo, seo, page (constants like LIST_ARTICLES_NUM)
│   ├── router.tsx                 # getRouter() — single router factory
│   ├── routeTree.gen.ts           # generated, do not edit
│   └── styles.css                 # Tailwind v4 entry, defines --font-* / --color-* theme tokens
├── test/                          # vitest setup files (see Tests)
├── public/                        # static assets served as-is (avatar.webp, manifest.json, ...)
├── .env / .env.sample             # MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN, FORM_API_URL
├── wrangler.jsonc                 # name=portfolio, compatibility_date=2026-02-27
├── vite.config.ts                 # see vite quirks below
├── vitest.config.ts               # 3 projects
└── tsconfig.json                  # extends workspace base; includes all *.ts/tsx
```

## Server functions (the part that breaks often)

The split between `index.ts` and `index.server.ts` is deliberate: `index.server.ts` is `createServerOnlyFn`-wrapped pure calls that are unit-testable by mocking `@tanstack/react-start`; `index.ts` adds the TanStack middleware + `tryAsync` + zod input validation.

Reference: `src/features/article/blog/functions/{index.ts,index.server.ts}` and the matching `index.server.test.ts` in `contact`.

Good (`index.ts`):

```ts
import { createServerFn } from '@tanstack/react-start'
import { getCMSClientMiddleware } from '@/integrations/cms/client'
import { tryAsync } from '@/libs/result'
import { getBlog as _getBlog, getBlogs as _getBlogs } from './index.server'

const getBlogs = createServerFn()
  .inputValidator(getArticleListSchema)        // zod schema from shared/schemas.ts
  .middleware([getCMSClientMiddleware])
  .handler(async ({ data, context: { getCMSClient } }) =>
    tryAsync(async () => _getBlogs(getCMSClient(), data)),
  )
```

Good (consuming in a route loader):

```ts
export const Route = createFileRoute('/blogs/')({
  beforeLoad: async ({ search: { page } }) => {
    const result = await getBlogs({ data: { limit: LIST_ARTICLES_NUM, currentPage: page } })
    if (result.resultType === 'fail') throw new Error(result.error.message)
    // ... result.value is ListResponse<Blog>
  },
})
```

Bad: importing the CMS client directly inside a handler. Always go through `getCMSClientMiddleware` and read `getCMSClient()` from `context`.

## Tests (`vitest.config.ts` — 3 projects, `globals: true`)

- `unit logic` — `node`, `src/**/*.test.ts`, `test/logic/setup.ts`. `fileParallelism: false`. `afterEach` clears/restores mocks.
- `component` — `jsdom`, `src/**/components/**/*.test.tsx`, `test/component/setup.ts` (loads `@testing-library/jest-dom/vitest`).
- `page` — `jsdom`, `src/routes/**/*.test.tsx` (excludes `src/routes/**/-components/*/*.test.tsx`), `test/page/setup.ts`. Mocks `@/libs/microcms` so any unmocked CMS call **throws**; render with `renderWithRouter` from `test/page/renderWithRouter.tsx` and reset `window.history` to `/` after each test.
- `test/component/setup.ts` and `test/logic/setup.ts` are tiny; `test/page/setup.ts` has the real work.
- Test env vars live in `vitest.config.ts` (`MICROCMS_API_KEY=test-api-key`, `MICROCMS_SERVICE_DOMAIN=test-domain`, `FORM_API_URL=https://test-api.example.com`); no real network calls.

Run a single project: `pnpm exec vitest --project=page` (or `unit logic`, `component`).

## Env & deployment

- `app/.env` (gitignored) must define `MICROCMS_API_KEY`, `MICROCMS_SERVICE_DOMAIN`, `FORM_API_URL`. Missing values throw `EnvError` at import of `@/libs/env`.
- `wrangler.jsonc` `name=portfolio`, `compatibility_date=2026-02-27`, flags `["nodejs_compat"]`. The main is `@tanstack/react-start/server-entry`.
- `deploy.yaml` writes `.env` from secrets and runs `pnpm run deploy` (i.e. `vite build && wrangler deploy`).

## Vite quirks (`app/vite.config.ts`)

- `cloudflare({ viteEnvironment: { name: 'ssr' } })` — must stay before `tanstackStart` so the SSR env resolves.
- `html-dom-parser` is aliased to the server-side build (`html-dom-parser/lib/server/html-to-dom`) because the default throws on the edge.
- `tsconfigPaths({ projects: ['./tsconfig.json'] })` is the only way `@/*` resolves in tests/builds.
- The `sitemap.host` (`https://about.yosei-82s.fun`) is the canonical site URL — match it in `src/configs/seo.ts`.

## Code style

- Single quotes, semicolons as-needed, trailing commas (`biome.json`).
- `verbatimModuleSyntax: true` — use `import type` for types.
- Sort Tailwind classes — `useSortedClasses` is an error against `twMerge`/`clsx`/`cn` (`app/biome.json`).
- The HTML `lang` is `ja` in `__root.tsx`; do not change.

Good (component, sorted classes, typed props):

```tsx
import { cn } from '@/libs/cn'

interface Props {
  type?: HTMLButtonElement['type']
  isDisabled?: boolean
  className?: string
  children: React.ReactNode
}

const Button: React.FC<Props> = ({
  type = 'button',
  isDisabled = false,
  className,
  children,
}) => (
  <button
    className={cn('btn', isDisabled && 'btn-disabled', className)}
    disabled={isDisabled}
    type={type}
  >
    {children}
  </button>
)
```

## Boundaries

### Always do

- Co-locate tests next to source.
- Return `Promise<Result<T, SerializableError>>` from server fns.
- Use `getCMSClientMiddleware` for any CMS call.
- Run `pnpm ci:check && pnpm ci:type && pnpm test:coverage` before pushing.

### Ask first

- Add a new route folder.
- Change `wrangler.jsonc`.
- Modify the sitemap host.
- Touch `prerender` / `sitemap` config in `vite.config.ts`.

### Never do

- Commit `app/.env` or anything in `*.local`.
- Import `microcms-js-sdk` directly. Go through `@repo/cms`.
- Add a `index.lazy.tsx` sibling to a route file. The lazy pattern is being removed — write to `index.tsx` and let the router plugin regenerate `routeTree.gen.ts`.
- Hand-edit `routeTree.gen.ts`.
- Touch `app/.tanstack/`, `app/.wrangler/`, `app/coverage/`, or `app/dist/`.
