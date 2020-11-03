module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    
      './slices/**/*.vue',
      './node_modules/swiper/**/*.js',
      './node_modules/vue-awesome-swiper/**/*.js',
      './node_modules/vue-awesome-swiper/**/*.ts',
      './components/**/**.vue',
      'layouts/**/*.vue',
      'pages/**/*.js',
      'plugins/**/*.js',
      './node_modules/swiper/js/swiper.esm.js'
    
  ],
  theme: {
    extend: {
      colors: {
        'brandcolor': '#FEDF25',
        'brandcolor-600': '#FEDF25',
        'brandcolor-900': '#FEDF25',
      },
    },
    fontFamily: {
      sans: [
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
  },
  variants: {},
  plugins: [],
}
