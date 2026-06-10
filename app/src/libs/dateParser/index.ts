const formatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

interface ParsedDate {
  year: string
  month: string
  day: string
}

export const parseDate = (date: Date): ParsedDate => {
  const formatted = formatter.format(date)
  const [year, month, day] = formatted.split('/')
  return { year, month, day }
}
