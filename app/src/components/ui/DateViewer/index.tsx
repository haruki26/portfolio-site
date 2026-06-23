import { parseDate } from '@/libs/dateParser'

interface Props {
  date: Date
  separator?: string
}

const DateViewer: React.FC<Props> = ({ date, separator = '-' }) => {
  const parsed = parseDate(date)

  return (
    <time dateTime={date.toISOString()}>
      <span className="flex flex-row gap-0.5 text-lg">
        <span>{parsed.year}</span>
        <span>{separator}</span>
        <span>{parsed.month}</span>
        <span>{separator}</span>
        <span>{parsed.day}</span>
      </span>
    </time>
  )
}

export default DateViewer
