import { cn } from '@/lib/cn'

interface Props {
  children: React.ReactNode
  className?: string
}

const Glass: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface-100/30 backdrop-blur-xs',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Glass
