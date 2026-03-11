interface Props {
  date: Date
  separator?: string
}

const DateViewer: React.FC<Props> = ({ date, separator = '-' }) => {
  return (
    <time dateTime={date.toISOString()}>
      <span className="flex flex-row gap-0.5 text-lg">
        <span>{date.getFullYear()}</span>
        <span>{separator}</span>
        <span>{date.getMonth() + 1}</span>
        <span>{separator}</span>
        <span>{date.getDate()}</span>
      </span>
    </time>
  )
}

export default DateViewer
