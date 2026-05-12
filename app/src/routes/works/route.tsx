import { createFileRoute, Outlet } from '@tanstack/react-router'
import PageFrame from '@/components/layout/PageFrame'
import { PAGE } from '@/configs/page'

export const Route = createFileRoute('/works')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageFrame Icon={PAGE.work.Icon} pageName="Work">
      <Outlet />
    </PageFrame>
  )
}
