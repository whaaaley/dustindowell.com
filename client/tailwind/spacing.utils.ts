// Returns a CSS clamp() that scales linearly from `min` at 425px viewport width to `max` at 1440px (laptop), in `unit`.
export const linearClamp = (min: number, max: number, unit = 'rem'): string => {
  min = min / 16
  max = (max / 16)

  const minWidth = 425 / 16 // minimum width of mobile
  const maxWidth = 1440 / 16 // maximum width of laptop

  const slope = (max - min) / (maxWidth - minWidth)
  const intercept = min - slope * minWidth
  const value = slope * 100

  return `clamp(${min}${unit}, ${intercept}${unit} + ${value}vw, ${max}${unit})`
}

// Like linearClamp but extrapolates further on ultrawide (5120px) so spacing keeps growing past laptop sizes.
export const linearScale = (min: number, max: number, unit = 'rem'): string => {
  min = min / 16
  max = (max / 16) * (5120 / 1440)

  const minWidth = 425 / 16 // minimum width of mobile
  const maxWidth = 5120 / 16 // maximum width of laptop

  const slope = (max - min) / (maxWidth - minWidth)
  const intercept = min - slope * minWidth
  const value = slope * 100

  return `clamp(${min}${unit}, ${intercept}${unit} + ${value}vw, ${max}${unit})`
}

// Scales a measurement from the 816px letter-size resume PDF up to a 1440px page on laptop.
// Type keeps the default mobile scale so 9px body text reads at 14px; spacing passes a smaller scale so gaps stay tight on a phone.
export const pageUnit = (px: number, mobileScale = 14 / 9): string => {
  return linearClamp(px * mobileScale, px * 1440 / 816)
}

export const desktopUnit = (px: number, mobileScale = 14 / 9): string => {
  return pageUnit(px * 816 / 1440, mobileScale)
}

// Generates an object of `<prefix><unit>: <unit*0.1875>rem` entries for the given units.
// Used to produce the `t1`, `t2`, ... custom spacing scale.
export const generateSpacing = (prefix: string, units: number[] = []): Record<string, string> => {
  const spacingObj: Record<string, string> = {}
  const baseUnit = 0.1875 // 3px in rem

  for (const unit of units) {
    const remValue = (baseUnit * unit)
    spacingObj[prefix + unit] = remValue + 'rem'
  }

  return spacingObj
}
