export const toMB = (bits) => {
  if (!bits) return 0

  return bits / 8e6
}

export const toKB = (bits) => {
  if (!bits) return 0

  return bits / 8000
}

export const toB = (bits) => {
  if (!bits) return 0

  return bits / 8
}
