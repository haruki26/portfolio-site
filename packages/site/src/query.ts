import type { QueryError } from './errors'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: QueryError
  }
}
