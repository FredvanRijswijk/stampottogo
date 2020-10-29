import { Client } from "../prismic";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import { NextSeo } from "next-seo";
import Image from 'next/image'
import resolver from "../sm-resolver.js";

import Layout from "./../components/Layout";
import HeaderBanner from "./../components/HeaderBanner";
import Head from "next/head";

// import { Box, Link, Text, Card } from 'theme-ui'


const HomePage = (props) => {
  const {meta_title='', meta_description=''} = props.data || {};
  const {title=''} = props.data || {};
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
        canonical={`https://www.stamppottogo.nl/`}
      />
      <HeaderBanner props={{title: 'hhghg'}} />
      <Layout menu="">
      <div style={{ display: "flex",
          justifyContent: "center", }}>
        <Image src="/static/images/no-picture.jpg" width="320" height="320" />
        </div>
        <SliceZone {...props} resolver={resolver} />
      </Layout>
      <div className="bg-gray-50">
  <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
      Ready to dive in?
      <br />
      <span className="text-indigo-600">Start your free trial today.</span>
    </h2>
    <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
      <div className="inline-flex rounded-md shadow">
        <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
          Get started
        </a>
      </div>
      <div className="ml-3 inline-flex rounded-md shadow">
        <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
          Learn more
        </a>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  queryType: "single",
  type: "homepage"
});

// export const getStaticPaths = useGetStaticPaths({
//   client: Client(),
//   type: "page",
//   fallback: true, // process.env.NODE_ENV === 'development',
//   formatPath: () => "/",
// });

export default HomePage;
