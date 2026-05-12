import { cn } from '@/libs/cn'

interface Props {
  label: string
}

const SectionTitle: React.FC<Props> = ({ label }) => {
  return (
    <h2
      className={cn(
        'flex w-full items-center justify-center',
        'before:mt-[0.12rem] before:mr-3 before:inline-block before:h-[0.4px] before:w-[1.2rem]',
        'before:bg-base-content before:shadow-secondary-200/50 before:shadow-xl',
        'after:mt-[0.12rem] after:ml-3 after:inline-block after:h-[0.4px] after:w-[1.2rem] after:bg-base-content',
        'after:bg-base-content after:shadow-secondary-200/50 after:shadow-xl',
        'font-extrabold font-orbitron text-3xl text-shadow-lg text-shadow-secondary-300/80 tracking-wider md:text-5xl',
      )}
    >
      {label}
    </h2>
  )
}

export default SectionTitle
