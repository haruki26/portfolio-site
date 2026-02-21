import Divider from '@/components/ui/Divider'
import { cn } from '@/libs/cn'

interface Props {
  children: React.ReactNode
  Icon: React.ElementType<{ className: string }>
  pageName: string
}

const PageFrame: React.FC<Props> = ({ children, Icon, pageName }) => {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div
        className={cn(
          'flex flex-row items-center justify-center gap-4 rounded-lg px-0.5 py-1',
          'bg-linear-to-b from-70% from-secondary-100/0 to-secondary-300/45',
        )}
      >
        <Icon className="h-16 w-16" />
        <h1 className="font-bold font-orbitron text-5xl">{pageName}</h1>
      </div>
      <div className="w-full px-3" aria-hidden={true}>
        <Divider />
      </div>
      {children}
    </div>
  )
}

export default PageFrame
