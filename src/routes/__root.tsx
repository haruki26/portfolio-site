import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import Header from '@/components/layout/Header'
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'
import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider'
import appCss from '@/styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const contexts = TanStackQueryProvider.getContext()

  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body className="m-0 flex min-h-dvh w-full flex-col gap-5 bg-base-100 px-2">
        <TanStackQueryProvider.Provider {...contexts}>
          <div className="sticky top-0 left-0 w-full">
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
              TanStackQueryDevtools,
            ]}
          />
        </TanStackQueryProvider.Provider>
        <Scripts />
      </body>
    </html>
  )
}
