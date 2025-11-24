// Get the year options for select
export function getEnYearRangeOptions() {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 1900; i <= currentYear + 100; i++) {
    years.push({ value: i, label: i.toString() })
  }
  return years
}

export function getThYearRangeOptions() {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 1900; i <= currentYear + 100; i++) {
    years.push({ value: i, label: (i + 543).toString() })
  }
  return years
}

// Get the month options for select
export function getEnMonthOptions(isLong?: boolean) {
  const months = []
  for (let i = 0; i < 12; i++) {
    const date = new Date()
    date.setMonth(i)
    months.push({
      value: i,
      label: date.toLocaleDateString('en-GB', {
        month: isLong ? 'long' : 'short',
      }),
    })
  }
  return months
}

export function getThMonthOptions(isLong?: boolean) {
  const months = []
  for (let i = 0; i < 12; i++) {
    const date = new Date()
    date.setMonth(i)
    months.push({
      value: i,
      label: date.toLocaleDateString('th-TH', {
        month: isLong ? 'long' : 'short',
      }),
    })
  }
  return months
}
