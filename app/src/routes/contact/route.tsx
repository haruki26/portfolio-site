import { createFileRoute, Outlet } from '@tanstack/react-router'
import PageFrame from '@/components/layout/PageFrame'
import { PAGE } from '@/configs/page'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageFrame Icon={PAGE.contact.Icon} pageName="Contact">
      <Outlet />
    </PageFrame>
  )
}
