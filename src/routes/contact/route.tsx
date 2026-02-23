import { createFileRoute, Outlet } from '@tanstack/react-router'
import Section from '@/components/layout/Section'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Section sectionLabel="Contact">
      <Outlet />
    </Section>
  )
}
