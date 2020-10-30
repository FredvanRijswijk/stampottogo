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
        cyan: '#9cdbff',
      },
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
}
