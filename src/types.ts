import type { LinkProps } from '@tanstack/react-router'
import type { getRouter } from './router'

type AppPath = LinkProps<ReturnType<typeof getRouter>>
type Page = 'top' | 'work' | 'blog' | 'contact' | 'about'

export type { AppPath, Page }
