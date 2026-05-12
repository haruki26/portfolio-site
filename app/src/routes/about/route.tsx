import { createFileRoute, Outlet } from '@tanstack/react-router'
import PageFrame from '@/components/layout/PageFrame'
import { PAGE } from '@/configs/page'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageFrame Icon={PAGE.about.Icon} pageName="About">
      <Outlet />
    </PageFrame>
  )
}
