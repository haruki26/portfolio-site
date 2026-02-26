import type { ClassValue } from 'clsx'
import type React from 'react'
import { useMemo } from 'react'
import { cn } from '@/libs/cn'

const STAR_MIN_SIZE = 0.5
const STAR_MAX_SIZE = 2.5
const STAR_NUM = 100

const STAR_COLORS = ['indigo', 'cyan', 'purple', 'yellow', 'rose'] as const
type StarColor = (typeof STAR_COLORS)[number]

const STAR_VARIANTS: Record<StarColor, ClassValue> = {
  indigo: 'to-indigo-500 shadow-slate-300/60',
  cyan: 'to-cyan-200 shadow-indigo-600/60',
  purple: 'to-purple-300 shadow-rose-300/80',
  yellow: 'to-yellow-200 shadow-yellow-300/50',
  rose: 'to-rose-400 shadow-red-800/90',
}

interface StarProps {
  size: number
  position: { x: number; y: number }
  animationDelay: number
  variant: StarColor
}

const Star: React.FC<StarProps> = ({
  size,
  position,
  animationDelay,
  variant,
}) => {
  return (
    <span
      className={cn(
        'twinkle absolute bg-radial from-zinc-50 shadow',
        STAR_VARIANTS[variant],
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.y}vh`,
        left: `${position.x}vw`,
        animationDelay: `${animationDelay}s`,
      }}
    />
  )
}

const CosmoBackground: React.FC = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_NUM }, (_): StarProps & { id: string } => ({
        id: Math.random().toString(),
        size: Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE,
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        animationDelay: Math.random() * 10,
        variant: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      })),
    [],
  )

  return (
    <div
      aria-hidden={true}
      className="-z-50 pointer-events-none fixed top-0 left-0 h-full w-full overflow-hidden"
    >
      <span className="cosmo absolute top-1/4 right-1/4 size-40 bg-radial from-purple-500/50 to-purple-300/5 blur-2xl delay-193 md:size-80" />
      <span className="cosmo absolute right-1/3 bottom-1/3 size-50 bg-radial from-teal-500/30 to-teal-300/5 blur-2xl delay-367 md:size-100" />
      <span className="cosmo absolute top-1/3 left-1/3 size-60 bg-radial from-indigo-500/40 to-indigo-300/5 blur-2xl md:left-1/2 md:size-100" />
      <span className="twinkle absolute bottom-1/2 left-1/2 size-20 bg-radial from-slate-200/60 to-indigo-300/40 blur-2xl md:left-7/12 md:size-40" />
      {stars.map(({ id, ...props }) => (
        <Star key={id} {...props} />
      ))}
    </div>
  )
}

export default CosmoBackground
