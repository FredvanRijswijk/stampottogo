import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";

import Head from "next/head";
import Navbar from "../components/Navbar";
import HeaderBanner from "../components/HeaderBanner";
import Footer from "../components/Footer";
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import ProductImageView from '../components/ProductImageView'
// import { Box, Link, Text, Card } from 'theme-ui'
import { toast, ToastContainer } from '../components/Toast'

const HomePage = ({ posts }) => {
  // const { meta_title = "STAMPPOT to go", meta_description = "Lokaal af te halen en binnenkort in heel Nederland te bestellen" };
  const { addItem } = useShoppingCart()
  // console.log(posts);


  function addNotify(item) {
    // console.log(item);
    addItem(item)
    toast.notify(`We hebben ${item.name} toegevoegd`)
  }
  
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
                'pageTitle': 'STAMPPOT to go'
              });`,
          }}
        ></script>
      </Head>
      <NextSeo
        title='STAMPPOT to go'
        description='Verse heerlijke luxe stamppot'
        canonical={`https://www.stamppottogo.nl/`}
      />
      {/* <HeaderBanner title="Uit de keuken van Het Zomerpaleis kun je thuis genieten van de lekkerste stamppotten en erwtensoep" title_small="Stamppotten & Snert" /> */}

      <>
        
          <Navbar />
          <ToastContainer />
          <div className="flex bg-brandcolor pb-32 pt-16 pl-8 pr-8">
            {/* <SliceZone {...props} resolver={resolver} />*/}
            <div className="flex-1 text-center">
              <h1 className="font-semibold text-2xl p-8">
                {" "}
                Uit de keuken van Brasserie Cé - STAMPPOT to go{" "}
              </h1>
              <p>
              Tijdens deze 2e lockdown voor de horeca en het koudere seizoen hebben we STAMPPOT to go opgezet. In samenwerking met Brasserie Cé kunt u thuis genieten van de lekkerste stamppotten en andere winterse gerechten, zonder dat u zelf uw spierballen hoeft te gebruiken. U kunt kiezen uit zowel afhalen als thuisbezorgen.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 -mt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">

          
        {posts.dishes.map((post) => (
          
          
          <div key={post.id} className="px-2 py-2 m-8 sm:m-1">
          <div className="bg-white border rounded-lg overflow-hidden">
            
          <ProductImageView 
            className="object-fill w-full"
            url={post.image} 
            name={post.attribution} 
            width="320" 
            height="320" />
          
            <div className="p-6">
            <h2 className="font-semibold text-xl uppercase">{post.name}</h2>
            <div className="flex justify-between">
              <div suppressHydrationWarning className="text-gray-600 text-sm">{post.weight}</div>
              <div suppressHydrationWarning className="text-gray-900 text-lg font-bold">{formatCurrencyString({
                value: post.price,
                currency: post.currency,
                language: 'nl-NL'
              })}</div>

            </div>
            <div suppressHydrationWarning className="mt-2 leading-tight">
              {post.description}
            </div>
            <div className="mt-4">
            <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              onClick={() => addNotify(post)}
            >
              Bestel
            </button>
            </div>
            </div>
          </div>
          </div>
          
        ))}
      </div>
        
        <Footer />
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



export async function getStaticProps() {
  const res = await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/getDishes`)
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

export default HomePage;
