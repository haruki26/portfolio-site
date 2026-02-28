import { BookMarked, CircleUser, House, Mail, PackageCheck } from 'lucide-react'
import type { AppPath, Page } from '@/types'

const TOP_ARTICLE_NUM = 3
const LIST_ARTICLES_NUM = 10

interface PageConfig {
  Icon: React.ElementType<{ className: string }>
  path: AppPath
}

const PAGE: Record<Page, PageConfig> = {
  top: {
    Icon: House,
    path: {
      to: '/',
    },
  },
  work: {
    Icon: PackageCheck,
    path: {
      to: '/works',
    },
  },
  blog: {
    Icon: BookMarked,
    path: {
      to: '/blogs',
    },
  },
  about: {
    Icon: CircleUser,
    path: {
      to: '/about',
    },
  },
  contact: {
    Icon: Mail,
    path: {
      to: '/contact',
    },
  },
} as const

export { LIST_ARTICLES_NUM, PAGE, TOP_ARTICLE_NUM }
