import { cn } from '@/libs/cn'

interface Props {
  children: React.ReactNode
  className?: string
}

const Glass: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl p-6',
        'bg-surface/30 backdrop-blur-[1.5px]',
        'inset-shadow-edge ring-edge/20 ring-2 inset-shadow-sm/70',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Glass
