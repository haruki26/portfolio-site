import { Link } from '@tanstack/react-router'
import { cn } from '@/libs/cn'
import type { AppPath } from '@/types'

interface BaseProps {
  type?: HTMLButtonElement['type'] | 'link'
  children: React.ReactNode
  isDisabled?: boolean
  className?: string
}

interface ButtonProps extends BaseProps {
  type?: HTMLButtonElement['type']
}

interface LinkProps extends BaseProps {
  type: 'link'
  path: AppPath
}

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  const classNameWithDefault = cn(
    'flex items-center justify-center text-nowrap rounded-xl px-5 py-2 font-bold font-orbitron',
    'inset-shadow-edge inset-shadow-sm/70 bg-surface/50 ring-2 ring-edge/20 backdrop-blur-[0.8px]',
    'md:px-10 md:py-3 md:text-3xl',
    props.className,
  )

  return props.type === 'link' ? (
    <Link {...props.path} className={classNameWithDefault}>
      {props.children}
    </Link>
  ) : (
    <button
      type={props.type}
      className={classNameWithDefault}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  )
}

export default Button
