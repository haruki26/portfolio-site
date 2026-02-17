import { ClientOnly } from '@tanstack/react-router'

const STAR_MIN_SIZE = 0.5
const STAR_MAX_SIZE = 2.5
const STAR_NUM = 100

const Star = () => {
  const size = Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE

  return (
    <span
      className="twinkle absolute bg-zinc-50"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 10}s`,
      }}
    />
  )
}

const CosmoBackground = () => {
  return (
    <div className="pointer-events-none fixed top-0 left-0 -z-50 h-full w-full overflow-hidden">
      <span className="cosmo absolute top-1/4 right-1/4 h-40 w-40 bg-radial from-purple-500/50 to-purple-300/5 blur-2xl delay-193" />
      <span className="cosmo absolute right-1/3 bottom-1/3 h-50 w-50 bg-radial from-teal-500/30 to-teal-300/5 blur-2xl delay-367" />
      <span className="cosmo absolute top-1/3 left-1/3 h-60 w-60 bg-radial from-indigo-500/40 to-indigo-300/5 blur-2xl" />
      <span className="twinkle absolute bottom-1/2 left-1/2 h-20 w-20 bg-radial from-slate-200/70 to-indigo-100/40 blur-2xl" />
      <ClientOnly>
        {Array.from({ length: STAR_NUM }).map((_) => (
          <Star key={Math.random()} />
        ))}
      </ClientOnly>
    </div>
  )
}

export default CosmoBackground
