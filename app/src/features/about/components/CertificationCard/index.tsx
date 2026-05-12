import { Clock } from 'lucide-react'
import LabelWithIcon from '@/components/layout/LabelWithIcon'
import DateViewer from '@/components/ui/DateViewer'
import Glass from '@/components/ui/Glass'
import type { Certification } from '../../types'

interface Props {
  certification: Certification
}

const CertificationCard: React.FC<Props> = ({ certification }) => {
  return (
    <Glass className="flex flex-col gap-0.5 px-5 py-3">
      <LabelWithIcon
        Icon={() => <Clock className="size-5" />}
        className="text-base-content-muted"
      >
        <DateViewer date={certification.date} separator="/" />
      </LabelWithIcon>
      <h3 className="text-center text-2xl">{certification.name}</h3>
    </Glass>
  )
}

export default CertificationCard
