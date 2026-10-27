import { ImageOff } from 'lucide-react'
import { cn } from '@/libs/cn'

interface Props {
  className?: string
}

const NoImage: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'text-base-content-muted flex h-full w-full flex-row items-center justify-center gap-2',
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
