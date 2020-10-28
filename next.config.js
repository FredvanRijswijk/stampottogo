const withTM = require('next-transpile-modules')(['next-slicezone', 'essential-slices']);

module.exports = withTM({
    images: {
      deviceSizes: [320, 420, 768, 1024, 1200],
      iconSizes: [],
      domains: ['res.cloudinary.com'],
      path: '/_next/image',
      loader: 'default',
    },
  });