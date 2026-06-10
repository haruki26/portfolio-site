import { createFileRoute } from '@tanstack/react-router'
import { MY_INFO } from '@/configs/myInfo'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import { getBlogs } from '@/features/article/blog/functions'
import { getWorks } from '@/features/article/work/functions'
import { generateHead } from '@/libs/generateHead'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [works, blogs] = await Promise.all([
      getWorks({ data: { limit: TOP_ARTICLE_NUM } }),
      getBlogs({ data: { limit: TOP_ARTICLE_NUM } }),
    ])

    if (works.resultType === 'fail' || blogs.resultType === 'fail') {
      throw new Error('Failed to load works or blogs')
    }

    return { works: works.value.contents, blogs: blogs.value.contents }
  },
  head: () =>
    generateHead({
      title: SEO.title,
      description: SEO.description,
      url: SEO.url,
      image: MY_INFO.iconImage,
      type: 'website',
    }),
})
