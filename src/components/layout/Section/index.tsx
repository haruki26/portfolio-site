import SectionTitle from '@/components/ui/SectionTitle'

interface Props {
  children: React.ReactNode
  sectionLabel: string
}

const Section: React.FC<Props> = ({ children, sectionLabel }) => {
  return (
    <section>
      <div className="flex flex-col gap-10 md:gap-16">
        <SectionTitle label={sectionLabel} />
        {children}
      </div>
    </section>
  )
}

export default Section
