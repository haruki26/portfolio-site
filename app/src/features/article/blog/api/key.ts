export const blogsKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogsKeys.all, 'lists'] as const,
  list: (q?: Record<PropertyKey, unknown>) =>
    [...blogsKeys.lists(), q] as const,
  details: () => [...blogsKeys.all, 'details'] as const,
  detail: (id: string) => [...blogsKeys.details(), id] as const,
}
