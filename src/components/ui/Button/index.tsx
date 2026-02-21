import { cn } from '@/libs/cn'
import Glass from '../Glass'

interface Props {
  type?: HTMLButtonElement['type']
  children: React.ReactNode
  className?: string
}

const Button: React.FC<Props> = ({ type = 'button', children, className }) => {
  return (
    <Glass
      className={cn(
        'flex items-center justify-center px-5 py-2 font-bold font-orbitron',
        className,
      )}
    >
      <button type={type}>{children}</button>
    </Glass>
  )
}

export default Button
