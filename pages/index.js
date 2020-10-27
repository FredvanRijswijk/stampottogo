import { Client } from "../prismic";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import { NextSeo } from "next-seo";
import Image from 'next/image'
import resolver from "../sm-resolver.js";

import Layout from "./../components/Layout";
import Head from "next/head";

// import { Box, Link, Text, Card } from 'theme-ui'

const HomePage = (props) => {
  const {meta_title='', meta_description=''} = props.data || {};

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
      <Layout menu="">
        <Image src="/static/images/no-picture.jpg" width="320" height="320" />
        <SliceZone {...props} resolver={resolver} />
      </Layout>
      <style jsx>{`
      img {
        padding-top: 40px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      `}</style>
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
