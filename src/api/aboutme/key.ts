export const aboutMeKeys = {
  all: ['aboutMe'] as const,
  detail: (query?: Record<PropertyKey, unknown>) => [...aboutMeKeys.all, query],
}
