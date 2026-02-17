import type React from 'react'
import { cn } from '@/lib/cn'

interface HamburgerElementProps {
  className: string | boolean
}

const HamburgerElement: React.FC<HamburgerElementProps> = ({ className }) => {
  return (
    <span
      className={cn(
        'h-0.5 w-8 bg-secondary-100 transition-transform duration-500 ease-in-out',
        className,
      )}
    />
  )
}

interface Props {
  isOpen: boolean
  onClick?: (() => void) | (() => Promise<void>)
}

const Hamburger: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-fit flex-col gap-2"
    >
      <HamburgerElement className={isOpen && 'translate-y-2.5 rotate-45'} />
      <HamburgerElement className={isOpen && 'opacity-0'} />
      <HamburgerElement className={isOpen && '-translate-y-2.5 -rotate-45'} />
    </button>
  )
}

export default Hamburger
