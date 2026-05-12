import { cn } from '@/libs/cn'

interface Props {
  Icon: () => React.ReactNode
  children: React.ReactNode
  className?: string
}

const LabelWithIcon: React.FC<Props> = ({ Icon, children, className }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Icon()}
      {children}
    </div>
  )
}

export default LabelWithIcon
