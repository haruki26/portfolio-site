interface Props {
  date: Date
  separator?: 'hyphen'
}

const DateViewer: React.FC<Props> = ({ date, separator = '-' }) => {
  return (
    <div className="flex flex-row gap-0.5 text-lg">
      <span>{date.getFullYear()}</span>
      <span>{separator}</span>
      <span>{date.getMonth() + 1}</span>
      <span>{separator}</span>
      <span>{date.getDate()}</span>
    </div>
  )
}

export default DateViewer
