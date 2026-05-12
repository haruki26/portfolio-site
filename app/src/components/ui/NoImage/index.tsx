import { ImageOff } from 'lucide-react'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
}

const NoImage: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-row items-center justify-center gap-2 text-base-content-muted',
        className,
      )}
      aria-hidden={true}
    >
      <ImageOff className="h-7 w-7" />
      <span className="text-xl">No Image</span>
    </div>
  )
}

export default NoImage
