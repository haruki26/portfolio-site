import Glass from '@/components/ui/Glass'
import type { Hobby } from '../../types'

interface Props {
  hobby: Hobby
}

const HobbyCard: React.FC<Props> = ({ hobby }) => {
  return (
    <Glass className="flex max-w-sm flex-col items-center gap-4 px-3 py-5">
      <h3 className="font-medium text-3xl">{hobby.name}</h3>
      <p className="wrap-anywhere break-keep px-2 text-lg tracking-wider">
        {hobby.description}
      </p>
      <div className="grid grid-cols-2 gap-1 overflow-clip rounded-xl">
        {hobby.images.map((image, i) => (
          <img
            src={image.src}
            key={`${hobby.name}-${i}`}
            alt={image.alt ?? `${hobby.name}画像${i}`}
            width={image.width}
            height={image.height}
            className="size-36 object-cover"
          />
        ))}
      </div>
    </Glass>
  )
}

export default HobbyCard
