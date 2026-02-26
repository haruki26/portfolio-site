import { createFileRoute, Outlet } from '@tanstack/react-router'
import PageFrame from '@/components/layout/PageFrame'
import { PAGE } from '@/configs/page'

export const Route = createFileRoute('/blogs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageFrame Icon={PAGE.blog.Icon} pageName="Blog">
      <Outlet />
    </PageFrame>
  )
}
