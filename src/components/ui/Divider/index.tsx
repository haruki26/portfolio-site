import { cn } from '@/libs/cn'

interface Props {
  direction?: 'horizontal' | 'vertical'
  className?: string
}

const Divider: React.FC<Props> = ({ direction = 'horizontal', className }) => {
  return (
    <span
      className={cn(
        'block rounded-4xl bg-radial from-slate-200 to-80% to-cyan-400/90 blur-[1.5px]',
        direction === 'horizontal' ? 'h-2 w-full' : 'h-full w-2',
        className,
      )}
      aria-hidden={true}
    />
  )
}

export default Divider
