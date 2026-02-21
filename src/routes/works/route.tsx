import { createFileRoute, Outlet } from '@tanstack/react-router'
import { PackageCheck } from 'lucide-react'
import PageFrame from '@/components/layout/PageFrame'

export const Route = createFileRoute('/works')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageFrame Icon={PackageCheck} pageName="Works">
      <Outlet />
    </PageFrame>
  )
}
