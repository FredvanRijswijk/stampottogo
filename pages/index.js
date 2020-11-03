import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";


import Layout from "./../components/Layout";
import HeaderBanner from "./../components/HeaderBanner";
import Head from "next/head";
import Products from "../components/Products";
import CartNavBar from "../components/CartNavBar";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";


const HomePage = (props) => {
  const { meta_title = "", meta_description = "" } = props.data || {};

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'event': 'Pageview',
                'pagePath': '/',
                'pageTitle': '${meta_title}'
              });`,
          }}
        ></script>
      </Head>
      <NextSeo
        title={meta_title}
        description={meta_description}
        canonical={process.env.NEXT_BASE_URL}
      />
      {/* <HeaderBanner title="Bla Bla Bla" title_small="Bla Bla ..." /> */}

      <>
        <Cart>
          <Navbar />
          <div className="flex bg-brandcolor h-24 pb-64 pt-16 pl-8 pr-8">
            {/* <SliceZone {...props} resolver={resolver} />*/}
            <div className="text-center">
              <h1 className="font-semibold text-2xl">
                {" "}
                Welkom bij STAMPPOT to go{" "}
              </h1>
              <p>
                Tijdens deze 2e lockdown voor de horeca en het seizoen hebben we
                STAMPPOT to go opgezet om uit verschillende horeca keukens
                lekkere Hollandse stamppot te verkopen. Voor zowel afhalen als
                thuisbezorgen.
              </p>
            </div>
          </div>
          <div className="flex bg-brandcolor h-12 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mt-20">
            <Products />
          </div>
        </Cart>
      </>
    </>
  );
};

// Fetch content from prismic
// export const getStaticProps = useGetStaticProps({
//   client: Client(),
//   queryType: "single",
//   type: "homepage"
// });

// export const getStaticPaths = useGetStaticPaths({
//   client: Client(),
//   type: "page",
//   fallback: true, // process.env.NODE_ENV === 'development',
//   formatPath: () => "/",
// });

export default HomePage;
