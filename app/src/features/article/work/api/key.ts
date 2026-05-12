export const worksKeys = {
  all: ['works'] as const,
  lists: () => [...worksKeys.all, 'lists'] as const,
  list: (q?: Record<PropertyKey, unknown>) =>
    [...worksKeys.lists(), q] as const,
  details: () => [...worksKeys.all, 'details'] as const,
  detail: (id: string) => [...worksKeys.details(), id] as const,
}
