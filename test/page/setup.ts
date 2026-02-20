import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

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
