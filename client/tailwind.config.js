const linearClamp = (min, max) => {
  min = min / 16
  max = max / 16

  const minWidth = 425 / 16 // minimum width of mobile
  const maxWidth = 1280 / 16 // maximum width of laptop

  const slope = (max - min) / (maxWidth - minWidth)
  const intercept = min - slope * minWidth
  const value = slope * 100

  return `clamp(${min}rem, ${intercept}rem + ${value}vw, ${max}rem)`
}

const generateSpacing = (prefix, maxUnits = 43) => {
  const spacingObj = {}
  const baseUnit = 0.1875 // 3px in rem

  for (let i = 1; i <= maxUnits; i++) {
    const remValue = (baseUnit * i)
    spacingObj[prefix + i] = remValue + 'rem'
  }

  return spacingObj
}

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    ({ addVariant }) => {
      addVariant('img', '& img')
      addVariant('svg', '& svg')
    },
  ],
  content: [
    './*.html',
    './src/**/*.{css,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
    },
  },
}
