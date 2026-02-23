import { cn } from '@/libs/cn'

interface Props {
  type?: HTMLButtonElement['type']
  children: React.ReactNode
  isDisable?: boolean
  className?: string
}

const Button: React.FC<Props> = ({
  type = 'button',
  children,
  isDisable = false,
  className,
}) => {
  return (
    <button
      type={type}
      className={cn(
        'flex items-center justify-center rounded-xl px-5 py-2 font-bold font-orbitron',
        'inset-shadow-edge inset-shadow-sm/70 bg-surface/50 ring-2 ring-edge/20 backdrop-blur-[0.8px]',
        className,
      )}
      disabled={isDisable}
    >
      {children}
    </button>
  )
}

export default Button
