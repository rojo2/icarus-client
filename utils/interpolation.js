export function linear(x, a, b) {
  return (1 - x) * a + x * b
}

export function quadratic(x, a, b, c) {
  const d = linear(x, a, b)
  const e = linear(x, b, c)
  return linear(x, d, e)
}

export function cubic(x, a, b, c, d) {
  const e = quadratic(x, a, b, c)
  const f = quadratic(x, b, c, d)
  return linear(x, e, f)
}

export default {
  linear,
  quadratic,
  cubic
}
