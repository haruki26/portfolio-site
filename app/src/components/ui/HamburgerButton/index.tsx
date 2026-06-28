import type React from 'react'
import { cn } from '@/libs/cn'

interface HamburgerElementProps {
  className: string | boolean
}

const HamburgerElement: React.FC<HamburgerElementProps> = ({ className }) => {
  return (
    <span
      className={cn(
        'h-0.5 w-6 md:w-8',
        'bg-primary-100 transition duration-500 ease-in-out',
        'border border-white/20 group-hover:bg-primary-300',
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
      className="group flex h-fit flex-col gap-1.5 transition md:gap-2"
      aria-label="Open sidebar"
    >
      <HamburgerElement
        className={isOpen && 'translate-y-2 rotate-45 md:translate-y-2.5'}
      />
      <HamburgerElement className={isOpen && 'opacity-0'} />
      <HamburgerElement
        className={isOpen && '-translate-y-2 -rotate-45 md:-translate-y-2.5'}
      />
    </button>
  )
}

export default Hamburger
