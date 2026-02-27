import { createServerOnlyFn } from '@tanstack/react-start'
import { getBlogDetail, getBlogList } from '@/cms/endpoints/blogs'

const getBlogs = createServerOnlyFn(getBlogList)
const getBlog = createServerOnlyFn(getBlogDetail)

export { getBlogs, getBlog }
