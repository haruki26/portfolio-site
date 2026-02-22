import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

const failExternalRequest = (method: 'getList' | 'getListDetail') => {
  throw new Error(
    `[page test] Unexpected external request via microCMS (${method}). Mock server functions in the route test instead.`,
  )
}

vi.mock('@/libs/microcms', () => ({
  createClient: vi.fn(() => ({
    getList: vi.fn(async () => failExternalRequest('getList')),
    getListDetail: vi.fn(async () => failExternalRequest('getListDetail')),
  })),
}))

vi.mock('@tanstack/react-devtools', () => ({
  TanStackDevtools: () => null,
}))

vi.mock('@tanstack/react-router-devtools', () => ({
  TanStackRouterDevtoolsPanel: () => null,
}))

vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtoolsPanel: () => null,
}))

afterEach(() => {
  window.history.pushState({}, '', '/')
})
