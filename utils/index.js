export function formatDate(date) {
  return (
    padLeft(date.getFullYear(), '0', 4) +
    '-' +
    pad(date.getMonth(), 2, '0') +
    '-' +
    padLeft(date.getDate(), '0', 2)
  )
}

export function formatDateDaysFrom(date) {
  return (
    padLeft(date.getFullYear(), '0', 4) +
    '-' +
    pad(date.getMonth() + 1, 2, '0') +
    '-' +
    padLeft(date.getDate(), '0', 2)
  )
}

export function formatDateTime(date) {
  return (
    padLeft(date.getFullYear(), '0', 4) +
    '-' +
    pad(date.getMonth(), 2, '0') +
    '-' +
    padLeft(date.getDate(), '0', 2) +
    ' ' +
    padLeft(date.getHours(), '0', 2) +
    ':' +
    padLeft(date.getMinutes(), '0', 2)
  )
}

export function exponent(value, base = 10) {
  if (!value) return 0
  return Math.floor(Math.log10(Math.abs(value)) / Math.log10(base))
}

export function pad(value, length = 2, chr = '0') {
  let str = String(value)
  if (str.length < length) {
    str = chr + str
  }
  return str
}

export function padLeft(str, chr, length) {
  str = str.toString()
  while (str.length < length) {
    str = chr + str
  }
  return str
}

export function padRight(str, chr, length) {
  str = str.toString()
  while (str.length < length) {
    str += chr
  }
  return str
}

export function daysFrom(days, date = new Date()) {
  date.setDate(date.getDate() + days)
  const minDateFormatted = formatDateDaysFrom(date)
  return minDateFormatted
}

export function sunspotCoord(value, positive = false) {
  return Math.sin(Math.PI * (positive ? 0.5 : -0.5)) * Math.sin(value)
}

export function parseSunspot(data) {
  const NS = !!data.substr(0, 1) === 'N'
  const WE = data.substr(3, 1) === 'W'

  const alpha = (parseInt(data.substr(1, 2), 10) / 90) * Math.PI * 0.5
  const beta = (parseInt(data.substr(4, 2), 10) / 90) * Math.PI * 0.5

  const x = sunspotCoord(beta, WE)
  const y = sunspotCoord(alpha, NS)

  return { x, y }
}

export function parseDate(d) {
  if (/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/.test(d)) {
    const [, year, month, day, hours, minutes, seconds] = d.match(
      /([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})/
    )
    return new Date(
      parseInt(year, 10),
      parseInt(month, 10),
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10),
      parseInt(seconds, 10)
    )
  } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(d)) {
    const [, year, month, day] = d.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})/)
    return new Date(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10))
  }
  return Date.parse(d)
}

export function interpolate(value, min, max) {
  return min + value * (max - min)
}

export function interpolateLog(value, min, max) {
  return interpolate(Math.log10(value), Math.log10(min), Math.log10(max))
}

export function from(value, min, max) {
  return (value - min) / (max - min)
}

export function to(value, min, max) {
  return (1 - value) * min + value * max
}

export function fromTo(value, fromMin, fromMax, toMin, toMax) {
  return to(from(value, fromMin, fromMax), toMin, toMax)
}

export function ts(list, x = 'date', y = 'ts') {
  return list.map((item) => {
    item[y] = new Date(item[x])
    return item
  })
}

export function time(list, x = 'date', y = 'time') {
  return list.map((item) => {
    if (x in item) {
      return {
        ...item,
        [y]: parseDate(item[x]).getTime()
      }
    }
    return {
      ...item
    }
  })
}

export function max(list, name) {
  return list.reduce((acc, current) => {
    return Math.max(acc, current[name])
  }, Number.MIN_VALUE)
}

export function maxOf(lists, name, count = 0) {
  if (count <= 0) {
    return Math.max(...lists.map((list) => max(list, name)))
  } else {
    let current = Number.MIN_VALUE
    for (let index = 0; index < count; index++) {
      const list = lists[index]
      current = Math.max(max(list, name), current)
    }
    return current
  }
}

export function min(list, name) {
  return list.reduce((acc, current) => {
    return Math.min(acc, current[name])
  }, Number.MAX_VALUE)
}

export function minOf(lists, name, count = 0) {
  if (count <= 0) {
    return Math.min(...lists.map((list) => min(list, name)))
  } else {
    let current = Number.MAX_VALUE
    for (let index = 0; index < count; index++) {
      const list = lists[index]
      current = Math.min(min(list, name), current)
    }
    return current
  }
}

export function log(value, min, max) {
  const m = Math.log10(min)
  return (Math.log10(value) - m) / (Math.log10(max) - m)
}

export function pointsLog(list, x, y, minX, maxX, minY, maxY) {
  return list.map((item) => {
    return {
      x: from(item[x], minX, maxX),
      y: log(item[y], minY, maxY)
    }
  })
}

export function points(list, x, y, minX, maxX, minY, maxY) {
  return list.map((item) => {
    return {
      x: from(item[x], minX, maxX),
      y: from(item[y], minY, maxY)
    }
  })
}

export function dots(points, width, height) {
  return points.map((point) => {
    const x = point.x * width
    const y = height - point.y * height
    if (x === 0 && y === 0) {
      return null
    }
    return {
      x,
      y,
      w: 2,
      h: 2,
      key: `${x}_${y}_${Math.random() * Number.MAX_SAFE_INTEGER}`
    }
  })
}

export function areaPath(points, width, height) {
  return (
    points.reduce((acc, point, index) => {
      const cmd = index === 0 ? 'M' : 'L'
      const pos = `${cmd}${point.x * width} ${height - point.y * height}`
      return acc + (index > 0 ? ',' : '') + pos
    }, '') + `L${width} ${height} L0 ${height}`
  )
}

export function path(points, width, height) {
  let isNextM = true
  return points.reduce((acc, point, index) => {
    const x = point.x * width
    const y = height - point.y * height
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      isNextM = true
      return acc + ''
    }
    let cmd = 'L'
    if (isNextM) {
      cmd = 'M'
      isNextM = false
    }
    const pos = `${cmd}${x} ${y}`
    return acc + (index > 0 ? ',' : '') + pos
  }, '')
}

export function nearest(value, roundTo = 0.1) {
  return Math.round(value / roundTo) * roundTo
}

function ticksLog(min, max) {
  const minExponent = exponent(min)
  const maxExponent = exponent(max)
  const ticks = []
  for (let value = minExponent; value < maxExponent; value++) {
    ticks.push(10 ** value)
  }
  return ticks
}

function ticks(min, max) {
  const range = max - min
  const step = range / 10
  const ticks = []
  for (let value = min; value <= max; value += step) {
    ticks.push(value)
  }
  return ticks
}

export function canvasDot(points, canvas, style = { color: '#fff', width: 1 }) {
  const context = canvas.getContext('2d')
  const halfWidth = style.width * 0.5
  points.forEach((point, index) => {
    context.fillStyle = style.color
    context.fillRect(
      point.x - halfWidth,
      point.y - halfWidth,
      style.width,
      style.width
    )
  })
}

export function canvasLine(
  points,
  canvas,
  style = { color: '#fff', width: 1 }
) {
  const context = canvas.getContext('2d')
  context.beginPath()
  points.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x * canvas.width, point.y * canvas.height)
    } else {
      context.lineTo(point.x * canvas.width, point.y * canvas.height)
    }
  })
  context.strokeStyle = style.color
  context.lineWidth = style.width
  context.stroke()
}

export function radio(list) {
  ts(list, 'date')
  const items = []
  let lastItem = null
  for (const item of list) {
    if (items.length === 0) {
      items.push(item)
    } else if (item.ts.getDate() !== lastItem.ts.getDate()) {
      items.push(item)
    }
    lastItem = item
  }
  return items
}

export default {
  exponent,
  parseDate,
  interpolate,
  interpolateLog,
  from,
  to,
  fromTo,
  time,
  ts,
  max,
  min,
  maxOf,
  minOf,
  log,
  points,
  pointsLog,
  areaPath,
  path,
  dots,
  ticksLog,
  ticks,
  radio,
  daysFrom,
  formatDate,
  formatDateTime,
  padLeft,
  padRight,
  sunspotCoord,
  parseSunspot
}
