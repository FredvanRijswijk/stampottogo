// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from 'theme-ui'

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
        })(window,document,'script','dataLayer','GTM-KB37GM4');`,
            }}
          ></script>
          <script dangerouslySetInnerHTML={{
              __html: `id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/ec8a222b3ec4072e450151135/7f0f5070b9e2e335fcbfd4025.js");`}}></script>
          </Head>
        <body>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KB37GM4"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}