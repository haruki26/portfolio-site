import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  ClientOnly,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import CosmoBackground from '@/components/layout/CosmoBackground'
import Header from '@/components/layout/Header'
import { MY_INFO } from '@/configs/myInfo'
import { SEO } from '@/configs/seo'
import appCss from '@/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: SEO.title },
      {
        name: 'description',
        content: SEO.description,
      },
    ],
    links: [
      ...(appCss
        ? [
            {
              rel: 'stylesheet',
              href: appCss,
            },
          ]
        : []),
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: '',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: `${MY_INFO.lastName}${MY_INFO.firstName}`,
          url: SEO.url,
          jobTitle: 'Student',
          sameAs: [...Object.entries(MY_INFO.sns).map(([_, link]) => link)],
        }),
      },
    ],
  }),
  headers: () => ({
    'Cache-Control':
      'public, max-age=21600, s-maxage=21600, stale-while-revalidate=86400',
  }),
  staleTime: 5 * 60 * 100,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body className="m-0 flex min-h-dvh w-full flex-col gap-5 bg-linear-to-br from-5% from-base-200 to-base-300 px-2 py-4">
        <div className="sticky top-0 left-0 z-50 w-full py-2">
          <Header />
        </div>
        <div className="flex-1">
          <main>{children}</main>
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <ClientOnly>
          <CosmoBackground />
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  )
}
