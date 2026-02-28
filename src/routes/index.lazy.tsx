import { useSuspenseQueries } from '@tanstack/react-query'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import { TOP_ARTICLE_NUM } from '@/configs/page'
import AboutCard from '@/features/about/components/AboutCard'
import { getBlogsOptions } from '@/features/article/blog/api'
import ArticleCards from '@/features/article/components/ArticleCards'
import { getWorksOptions } from '@/features/article/work/api'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [
    {
      data: { works },
    },
    {
      data: { blogs },
    },
  ] = useSuspenseQueries({
    queries: [
      getWorksOptions({ limit: TOP_ARTICLE_NUM }),
      getBlogsOptions({ limit: TOP_ARTICLE_NUM }),
    ],
  })

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
          <Link to="/about">
            <Button>More</Button>
          </Link>
        </div>
      </Section>
      <Section sectionLabel="Works">
        <div className="flex w-full flex-col items-center gap-10">
          <ArticleCards
            articleType="work"
            articles={works}
            className="lg:grid-cols-3 lg:gap-10"
          />
          <Link to="/works" search={{ page: 1 }}>
            <Button>All Works</Button>
          </Link>
        </div>
      </Section>
      <Section sectionLabel="Blogs">
        <div className="flex w-full flex-col items-center gap-10">
          <ArticleCards
            articleType="blog"
            articles={blogs}
            className="lg:grid-cols-3 lg:gap-10"
          />
          <Link to="/blogs" search={{ page: 1 }}>
            <Button>All Blogs</Button>
          </Link>
        </div>
      </Section>
    </div>
  )
}
