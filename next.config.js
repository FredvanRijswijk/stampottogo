const withTM = require('next-transpile-modules')(['next-slicezone', 'essential-slices']);

module.exports = withTM({
    images: {
      deviceSizes: [320, 420, 768, 1024, 1200],
      iconSizes: [],
      domains: ['res.cloudinary.com'],
      path: '/_next/image',
      loader: 'default',
    },
    async redirects() {
      return [
        {
          source: '/default.asp?page=Vraag_%20en%20_antwoord_Assistent_manager&pid=46',
          destination: '/veel-gestelde-vragen',
          permanent: true
        },
        {
          source: '/default.asp?page=Vraag_%20en%20_antwoord_Activiteiten&pid=80',
          destination: '/veel-gestelde-vragen',
          permanent: true
        },
        {
          source: '/default.asp?page=nieuws&pid=5&id=50&c=',
          destination: '/veel-gestelde-vragen',
          permanent: true
        }
      ];
    }
  });