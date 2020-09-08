export function from(value, min, max) {
  return (value - min) / (max - min)
}

export function to(value, min, max) {
  return (1 - value) * min + value * max
}

export function fromTo(fromValue, fromMin, fromMax, toMin, toMax) {
  return to(from(fromValue, fromMin, fromMax), toMin, toMax)
}

export function clamp(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

export function max(value, max) {
  if (value > max) return max
  return value
}

export function min(value, min) {
  if (value < min) return min
  return value
}

export default {
  from,
  to,
  fromTo,
  clamp,
  max,
  min
}
