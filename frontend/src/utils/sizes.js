export const toMB = (bytes) => {
  if (!bytes) return 0

  return bytes / 1e6
}

export const toKB = (bytes) => {
  if (!bytes) return 0

  return bytes / 1000
}

export const toB = (bits) => {
  if (!bits) return 0

  return bits / 8
}
