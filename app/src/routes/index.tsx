import { createFileRoute } from '@tanstack/react-router'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import { MY_INFO } from '@/configs/myInfo'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import { SEO } from '@/configs/seo'
import AboutCard from '@/features/about/components/AboutCard'
import { getBlogs } from '@/features/article/blog/functions'
import ArticleCards from '@/features/article/components/ArticleCards'
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
  component: RouteComponent,
})

function RouteComponent() {
  const { works, blogs } = Route.useLoaderData()

  return (
    <div className="flex w-full flex-col items-center gap-16 px-3 py-3 md:gap-20">
      <h1 className="sr-only">久保陽生</h1>
      <div className="flex h-80 flex-col items-center justify-center gap-8 text-shadow-lg text-shadow-secondary-200 md:gap-16">
        <span className="font-orbitron text-6xl md:text-8xl">Welcome</span>
        <p className="text-3xl">I&apos;m a web developer&#46;</p>
      </div>
      <Section sectionLabel="About">
        <div className="flex flex-col items-center gap-7 md:gap-10">
          <article>
            <AboutCard />
          </article>
          <Button type="link" path={{ to: '/about' }}>
            More
          </Button>
        </div>
      </Section>
      <Section sectionLabel="Works">
        <div className="flex w-full flex-col items-center gap-10">
          <ArticleCards
            articleType="work"
            articles={works}
            className="lg:grid-cols-3 lg:gap-10"
          />
          <Button type="link" path={{ to: '/works', search: { page: 1 } }}>
            All Works
          </Button>
        </div>
      </Section>
      <Section sectionLabel="Blogs">
        <div className="flex w-full flex-col items-center gap-10">
          <ArticleCards
            articleType="blog"
            articles={blogs}
            className="lg:grid-cols-3 lg:gap-10"
          />
          <Button type="link" path={{ to: '/blogs', search: { page: 1 } }}>
            All Blogs
          </Button>
        </div>
      </Section>
    </div>
  )
}
