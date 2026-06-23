import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import { generateSpacing, linearClamp } from './tailwind/spacing.utils.ts'
import type { PluginAPI } from 'tailwindcss/types/config'

extend([mixPlugin])

const baseTheme = {
  borderWidth: {
    1: '1px',
    2: '2px',
    3: '3px',
  },
  colors: {
    // Prevent usage of non-zinc gray colors
    gray: {},
    neutral: {},
    slate: {},
    stone: {},

    // Original dustindowell.com palette (from _scratch-old/src/styles/_colors.scss).
    // The signature blue/purple accents and slightly blue-tinted desaturated darks.
    brand: {
      blue: 'rgb(127 191 255 / <alpha-value>)',
      purple: 'rgb(191 127 255 / <alpha-value>)',
      blurple: 'rgb(159 159 255 / <alpha-value>)',
    },
    pastel: {
      red: 'rgb(252 121 134 / <alpha-value>)',
      orange: 'rgb(255 161 99 / <alpha-value>)',
      yellow: 'rgb(255 200 123 / <alpha-value>)',
      green: 'rgb(145 199 126 / <alpha-value>)',
      blue: 'rgb(0 189 226 / <alpha-value>)',
      purple: 'rgb(185 159 227 / <alpha-value>)',
    },
    // Desaturated darks with a slight blue tint, from the original's lab() ramp in _scratch-old/src/styles/_colors.scss.
    // dark-N00 == lab(L, 0, -b): 600 lab(5,0,-5), 500 lab(10,0,-6), 400 lab(15,0,-7), 300 lab(20,0,-8), 200 lab(25,0,-9), 100 lab(30,0,-10).
    dark: {
      100: 'rgb(62 71 86 / <alpha-value>)',
      200: 'rgb(52 60 73 / <alpha-value>)',
      300: 'rgb(42 49 60 / <alpha-value>)',
      400: 'rgb(32 38 47 / <alpha-value>)',
      450: 'rgb(27 33 41 / <alpha-value>)',
      500: 'rgb(23 28 35 / <alpha-value>)',
      600: 'rgb(12 17 24 / <alpha-value>)',
    },

    // Desaturated lights with the same slight blue tint, the light-theme half of the original's lab() ramp.
    // light-N00 == lab(L, 0, -b): 600 lab(95,0,-5), 500 lab(90,0,-6), 400 lab(85,0,-7), 300 lab(80,0,-8), 200 lab(75,0,-9), 100 lab(70,0,-10).
    light: {
      100: 'rgb(162 172 189 / <alpha-value>)',
      200: 'rgb(176 185 201 / <alpha-value>)',
      300: 'rgb(191 199 213 / <alpha-value>)',
      400: 'rgb(206 213 225 / <alpha-value>)',
      500: 'rgb(221 227 238 / <alpha-value>)',
      600: 'rgb(236 241 250 / <alpha-value>)',
    },

    primary: 'rgb(var(--primary) / <alpha-value>)',
    'primary-hover': 'rgb(var(--primary-hover) / <alpha-value>)',
    'primary-text': 'rgb(var(--primary-text) / <alpha-value>)',

    // Base dark theme colors
    zinc: {
      50: 'rgb(var(--zinc-50) / <alpha-value>)',
      100: 'rgb(var(--zinc-100) / <alpha-value>)',
      200: 'rgb(var(--zinc-200) / <alpha-value>)',
      300: 'rgb(var(--zinc-300) / <alpha-value>)',
      400: 'rgb(var(--zinc-400) / <alpha-value>)',
      500: 'rgb(var(--zinc-500) / <alpha-value>)',
      600: 'rgb(var(--zinc-600) / <alpha-value>)',
      700: 'rgb(var(--zinc-700) / <alpha-value>)',
      800: 'rgb(var(--zinc-800) / <alpha-value>)',
      900: 'rgb(var(--zinc-900) / <alpha-value>)',
      950: 'rgb(var(--zinc-950) / <alpha-value>)',
    },
  },
  flex: {
    2: '2 2 0%',
    3: '3 3 0%',
    4: '4 4 0%',
  },
  fontFamily: {
    // Original dustindowell.com typefaces.
    // Home/nav use plain system sans-serif; Inter is reserved for the resume (matching the original).
    goldbill: ['Goldbill', 'sans-serif'],
    mont: ['Mont', 'sans-serif'],
    inter: ['Inter var', 'sans-serif'],
    sans: ['sans-serif'],
  },
  spacing: {
    // The `t` spacing scale (t1 = 3px, t2 = 6px, ...) used across the components.
    ...generateSpacing('t', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 18, 20, 24, 48]),
  },
  width: {
    7.5: '1.875rem', // 30px - between w-7 (28px) and w-8 (32px)
  },
  height: {
    7.5: '1.875rem', // 30px - between h-7 (28px) and h-8 (32px)
    13: '3.25rem', // 52px - one grid unit below h-14, matches the original home button height
  },
  backgroundImage: {
    'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
    'gradient-radial-offset': 'radial-gradient(circle at 50% 75%, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
    // The original site's signature white -> blue -> purple diagonal banner gradient.
    'brand-gradient': 'linear-gradient(45deg, #fff -30%, rgb(127 191 255), rgb(191 127 255))',
  },
  fontSize: {
    hero: [linearClamp(36, 96), linearClamp(36 * 1.25, 96 * 1.0625)],
  },
}

export default {
  plugins: [
    // This plugin adds variants for img, input, and svg elements
    // It allows you to use utilities like `img:w`, `input:bg`, and `svg:fill`
    ({ addVariant }: PluginAPI) => {
      addVariant('img', '& img')
      addVariant('input', '& input')
      addVariant('svg', '& svg')
    },

    // This plugin extracts color variables from the theme colors and sets them
    // as CSS variables in the :root selector
    ({ addBase, theme }: PluginAPI) => {
      const extractColorVars = (allThemeColors: Record<string, unknown>) => {
        const vars: Record<string, string> = {}
        const targetColorKeys = ['red', 'yellow', 'emerald', 'sky', 'blue', 'orange', 'amber', 'teal', 'rose']

        for (const colorKey of targetColorKeys) {
          const palette = allThemeColors[colorKey]

          if (typeof palette === 'object' && palette !== null) {
            for (const [shade, colorValue] of Object.entries(palette)) {
              if (typeof colorValue === 'string') {
                const { r, g, b } = colord(colorValue).toRgb()
                vars[[`--${colorKey}`, shade].join('-')] = [r, g, b].join(' ')
              }
            }
          }
        }

        return vars
      }

      addBase({ ':root': extractColorVars(theme('colors')) })
    },

    // Utility to skip rendering off-screen children for performance.
    ({ addUtilities }: PluginAPI) => {
      addUtilities({
        '.content-visibility-auto': {
          'content-visibility': 'auto',
        },
        '.thin-scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgb(var(--zinc-700)) transparent',
        },
      })
    },
  ],
  content: [
    './*.html',
    './src/**/*.{css,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: baseTheme,
  },
}
