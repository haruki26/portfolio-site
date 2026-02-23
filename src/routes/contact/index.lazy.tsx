import { createLazyFileRoute } from '@tanstack/react-router'
import ContactForm from '@/features/contact/components/ContactForm'

export const Route = createLazyFileRoute('/contact/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex-col items-center justify-center px-4">
      <ContactForm />
    </div>
  )
}
