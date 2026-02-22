export const aboutKeys = {
  all: ['about'],
  certifications: () => [...aboutKeys.all, 'certifications'] as const,
  hobbies: () => [...aboutKeys.all, 'hobbies'] as const,
}
