import SEO from '../next-seo.config';
import React from "react";
import NextApp from "next/app";
import Head from "next/head";

import "../styles/index.css"
import { DefaultSeo, LocalBusinessJsonLd, LogoJsonLd } from 'next-seo';

export function reportWebVitals({ id, name, label, value }) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "reportWebVitals",
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    action: name,
    non_interaction: true, // avoids affecting bounce rate.
  });
}

export default class App extends NextApp {
  // static async getInitialProps(appCtx) {
  //   const client = Client();
  //   const menu = (await client.getSingle("menu")) || {};
  //   return {
  //     props: {
  //       menu: menu,
  //     },
  //   };
  // }

  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }


  render() {
    const { Component, pageProps, props } = this.props;

    // console.log(pageProps);
    // console.log(props);
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          ></meta>
          <title>STAMPOT to go - Dageverse stamppot om af te halen </title>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.png" type="image/png" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-config" content="browserconfig.xml" />
          <meta name="theme-color" content="#000" />

          <base href="/"></base>

          <link rel="preconnect" href="https://www.google.com" />
          <link rel="preconnect" href="https://www.google.nl" />
          <link rel="preconnect" href="https://cdn.ampproject.org" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://analytics.google.com" />
          <link rel="preconnect" href="https://stats.g.doubleclick.net" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        </Head>
        <DefaultSeo {...SEO} />
        <LogoJsonLd
          logo="https://res.cloudinary.com/stamppot-to-go/image/upload/v1604488851/logo_m2v83g.png"
          url="https://www.stamppottogo.nl"
        />
            <Component {...pageProps} />
      </>
    );
  }
}
