# packages/cms/AGENTS.md

Read this when editing inside `packages/cms/`. The repo root `AGENTS.md` covers workspace-wide commands.

## Role

You are working on `@repo/cms`, a workspace-internal microCMS client. It is consumed by `app/` only — never by external packages — and exposes a strongly-typed `CMSClient` over `microcms-js-sdk`.

## Stack

- **Language:** TypeScript (extends `tsconfig.base.json`: `strict`, `verbatimModuleSyntax`, `composite`, `noEmit` — the package emits via Vite instead)
- **Bundler:** Vite 7 (workspace catalog) with `vite-plugin-dts` (types) and `vite-plugin-top-level-await`
- **Runtime dep:** `microcms-js-sdk` (private API surface — no direct consumers in `app/`)
- **Tests:** Vitest 4, single `unit logic` project (`packages/cms/vitest.config.ts`)
- **Lint/format:** Biome 2.2 via the root `biome.json` (this package's `biome.json` only sets `files.includes` to `src/**/*.ts` and `test/**/*.ts`)

## Commands

- `pnpm --filter @repo/cms build` — `vite build` to `dist/` (ESM, es2022). This is the `prepare` script, so it runs on `pnpm i`.
- `pnpm --filter @repo/cms test` — `vitest run` over `src/**/*.test.ts` (one project, `node` env).
- `pnpm --filter @repo/cms test:coverage` — used by CI.
- `pnpm --filter @repo/cms lint|format|check` — Biome.
- `pnpm --filter @repo/cms ci:check` (= `biome check`) and `ci:type` (= `tsc --noEmit`) — what `ts-ci.yaml` runs.

## Project structure

```
packages/cms/
├── src/
│   ├── index.ts                   # public API: createCMSClient, re-exports CMSClient
│   ├── schema.ts                  # Blog, Work, Article, Certification, Hobby, Image, Tag
│   ├── constant.ts                # ARTICLE_OVERVIEW_KEYS (used by blog/work list mappers)
│   ├── type.ts                    # CMSConfig, CMSClient, PagingOptions, ListResponse, GetListFn, ...
│   ├── lib/
│   │   ├── microcms/
│   │   │   ├── client.ts          # typed wrapper around microcms-js-sdk's createClient
│   │   │   ├── index.ts           # createMicroCMSClient (composes endpoints)
│   │   │   ├── type.ts            # Endpoints, GetListRequest, GetListResponse, ...
│   │   │   ├── shared/{error.ts, mapper/, type.ts}
│   │   │   └── endpoints/
│   │   │       ├── articles/{blogs,works,shared/{mapper,paging}}/
│   │   │       ├── certifications/
│   │   │       └── hobbies/
│   │   └── shared/
│   │       ├── createEndpoint/    # createEndpointBuilder (fluent .addGetListFn / .addGetDetailFn / .build)
│   │       └── createRawCMSClient # lazy singleton factory
│   └── index.test.ts
├── test/unit/setup.ts             # afterEach: vi.clearAllMocks / vi.restoreAllMocks
├── biome.json                     # root: false, extends: "//"
├── tsconfig.json                  # extends ../../tsconfig.base.json
└── vite.config.ts                 # lib build entry: src/index.ts
```

## Public API

`index.ts` only re-exports `createCMSClient` and the `CMSClient` type. Anything new must go through that barrel.

```ts
import { createCMSClient } from '@repo/cms'
const client = createCMSClient({ serviceDomain: '...', apiKey: '...' })
await client.articles.blogs.getList({ limit: 10, currentPage: 1 })
```

`CMSClient` shape (`src/type.ts`):

```ts
interface CMSClient {
  articles: {
    blogs:  GetableListEndpoint<Blog>  & GetableDetailEndpoint<Blog>
    works:  GetableListEndpoint<Work>  & GetableDetailEndpoint<Work>
  }
  certifications: GetableListEndpoint<Certification>
  hobbies:        GetableListEndpoint<Hobby>
}
```

## Adding a new endpoint

1. Add the schema in `src/schema.ts` (extend the `Article` / `Certification` / `Hobby` types as needed).
2. Add the endpoint type to `Endpoints` in `src/lib/microcms/type.ts`.
3. Wire the new endpoint into `CMSClient` in `src/type.ts`.
4. Create `src/lib/microcms/endpoints/<name>/index.ts` using `createEndpointBuilder`:

```ts
import { createEndpointBuilder } from '@/lib/shared/createEndpoint'
import type { Hobby } from '@/schema'
import { imageMapper } from '../../shared/mapper'

export const createHobbiesEndpoint = (getClient: GetMicroCMSClient) =>
  createEndpointBuilder(getClient)
    .addGetListFn<Hobby>((client) => async () => {
      const res = await client.getList({ endpoint: 'hobbies' })
      return {
        contents: res.contents.map((hobby) => ({
          name: hobby.name,
          description: hobby.description,
          images: hobby.images.map(imageMapper),
        })),
        totalCount: res.totalCount,
      }
    })
    .build()
```

5. Register it in `createMicroCMSClient` (`src/lib/microcms/index.ts`).
6. Add a co-located `index.test.ts`. `createRawCMSClient` memoises the raw client per call, so tests can swap the inner factory.

## Boundaries

### Always do

- Keep `index.ts` as the only public entry.
- Put new schemas in `src/schema.ts` and new client types in `src/type.ts`.
- Co-locate tests.
- Use the `createEndpointBuilder` and mappers from `lib/microcms/shared/mapper`.
- Run `pnpm --filter @repo/cms build && pnpm --filter @repo/cms test` before committing.

### Ask first

- Add a runtime dep.
- Change the public API of `CMSClient` (every consumer in `app/` will break).
- Change the `prepare` / build output (`dist/`).

### Never do

- Re-export `microcms-js-sdk` types from this package.
- Bypass `createEndpointBuilder` (call `getList` directly outside an endpoint module).
- Import this package from anything other than `app/`.
- Touch `dist/`, `coverage/`, or `node_modules/`.
