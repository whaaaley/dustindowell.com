import { desktopUnit, pageUnit } from './tailwind/spacing.utils.ts'

export default {
  content: [
    './*.html',
    './src/**/*.{css,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      },
      fontFamily: {
        blacker: ['Blacker Pro Text', 'serif'],
        star: ['Star', 'DejaVu Sans', 'sans-serif'],
      },
      fontSize: {
        'page-name': [pageUnit(40), '1'],
        'page-h1': [pageUnit(14), '1.5'],
        'page-h2': [pageUnit(11), '1.5'],
        'page-body': [pageUnit(9), '1.5'],
        'page-glyph': [pageUnit(6), '1'],
      },
      spacing: {
        'page-line': pageUnit(13.5, 1),
        'page-half': pageUnit(6.75, 1),
        'page-quarter': pageUnit(3.375, 1),
        'page-indent': pageUnit(6, 1),
        'page-dot': pageUnit(12, 1),
        'image-gap': desktopUnit(9, 1),
        'image-gutter': desktopUnit(12, 1),
        'image-margin': desktopUnit(24, 1),
        'page-lift': pageUnit(2.5, 1),
        'page-inline': pageUnit(6, 1),
        'page-px': pageUnit(48, 0.5),
        'page-pt': pageUnit(48, 0.5),
        'page-pb': pageUnit(40, 0.5),
      },
      maxWidth: {
        page: '1440px',
      },
    },
  },
}
