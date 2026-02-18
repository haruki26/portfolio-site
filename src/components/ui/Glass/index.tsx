import { cn } from '@/lib/cn'

interface Props {
  children: React.ReactNode
  className?: string
}

const Glass: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6',
        'bg-surface/30 backdrop-blur-[1.5px]',
        'inset-shadow-edge inset-shadow-sm/70 ring-2 ring-edge/20',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Glass
