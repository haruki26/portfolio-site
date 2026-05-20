import { createServerOnlyFn } from '@tanstack/react-start'
import { cmsClient } from '@/integrations/cms/client'

const getBlogs = createServerOnlyFn(cmsClient.articles.blogs.getList)
const getBlog = createServerOnlyFn(cmsClient.articles.blogs.getDetail)

export { getBlogs, getBlog }
