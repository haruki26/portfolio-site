interface Props {
  date: Date
  separator?: string
}

const DateViewer: React.FC<Props> = ({ date, separator = '-' }) => {
  return (
    <time dateTime={date.toISOString()}>
      <div className="flex flex-row gap-0.5 text-lg">
        <span>{date.getFullYear()}</span>
        <span>{separator}</span>
        <span>{date.getMonth() + 1}</span>
        <span>{separator}</span>
        <span>{date.getDate()}</span>
      </div>
    </time>
  )
}

export default DateViewer
