import type { CMSClient } from '@repo/cms'
import type { Article } from '@/features/article/shared/types'

type GetBlogListOptions = Parameters<CMSClient['articles']['blogs']['getList']>

interface Blog extends Article {}

export type { Blog, GetBlogListOptions }
