// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'


// import { createResolver } from 'next-slicezone/resolver'

export default class extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   await createResolver()
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html lang="nl">
        <Head>
        <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WLD7BJZ');`,
            }}
          ></script>
          <script id="mcjs" dangerouslySetInnerHTML={{
              __html: 
              `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/2681af4d3994d7dc878c7f43e/701c9b67d441761322e37345e.js");`}}></script>
          </Head>
        <body>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WLD7BJZ"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
          <Main />
          <NextScript />
        </body>
        
      </Html>
    )
  }
}