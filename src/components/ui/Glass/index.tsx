import { cn } from '@/lib/cn'

interface Props {
  children: React.ReactNode
  className?: string
}

const Glass: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-3xl bg-surface-100/10 backdrop-blur-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Glass
