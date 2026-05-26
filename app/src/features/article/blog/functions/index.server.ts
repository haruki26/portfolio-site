import type { CMSClient } from '@repo/cms'
import { createServerOnlyFn } from '@tanstack/react-start'
import type { GetBlogListOptions } from '../types'

const getBlogs = createServerOnlyFn(
  (client: CMSClient, ...params: GetBlogListOptions) =>
    client.articles.blogs.getList(...params),
)

const getBlog = createServerOnlyFn((client: CMSClient, id: string) =>
  client.articles.blogs.getDetail(id),
)

export { getBlogs, getBlog }
