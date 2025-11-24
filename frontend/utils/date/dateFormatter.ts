import { Dayjs } from 'dayjs'

// Format date string ---------------------------------------------------------------------------------------
export function formatDateForQuery(date: string | Date | Dayjs) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatDateEn(date: string | Date | Dayjs, isLong?: boolean) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: isLong ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatDateTh(date: string | Date | Dayjs, isLong?: boolean) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: isLong ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

// Format month year ----------------------------------------------------------------------------------------
export function formatMonthYearEn(
  date: string | Date | Dayjs,
  isLong?: boolean
) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('en-GB', {
    month: isLong ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatMonthYearTh(
  date: string | Date | Dayjs,
  isLong?: boolean
) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('th-TH', {
    month: isLong ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

// Format month ---------------------------------------------------------------------------------------------

export function formatMonthEn(date: string | Date | Dayjs, isLong?: boolean) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('en-GB', {
    month: isLong ? 'long' : 'short',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatMonthTh(date: string | Date | Dayjs, isLong?: boolean) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('th-TH', {
    month: isLong ? 'long' : 'short',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

// Format year ----------------------------------------------------------------------------------------------
export function formatYearEn(date: string | Date | Dayjs) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatYearTh(date: string | Date | Dayjs) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

// Format date time string ----------------------------------------------------------------------------------
export function formatDateTimeEn(
  date: string | Date | Dayjs,
  isLong?: boolean
) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleString('en-GB', {
    day: 'numeric',
    month: isLong ? 'long' : 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatDateTimeTh(
  date: string | Date | Dayjs,
  isLong?: boolean
) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleString('th-TH', {
    day: 'numeric',
    month: isLong ? 'long' : 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

// Format time string ---------------------------------------------------------------------------------------
export function formatTimeEn(date: string | Date | Dayjs) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatTimeTh(date: string | Date | Dayjs) {
  const newDate = new Date(date.toString())
  const formattedDate = newDate.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Bangkok', // your local time zone
  })
  return formattedDate
}

export function formatTimeFromString(time: string) {
  if (!time || time.trim() === '') return ''

  const [hour, minute] = time.split(':').map(Number)

  const timeStr = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`
  return timeStr
}

// Create date ---
export function createDateFromString(date: string, time: string) {
  let dateTime = new Date(date)

  if (time) {
    const [hour, minute, second] = time.split(':').map(Number)
    dateTime.setHours(hour, minute, second, 0)
  }

  return dateTime
}
