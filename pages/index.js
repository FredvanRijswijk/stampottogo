import { Client } from "../prismic";
import SliceZone from "next-slicezone";
import { useGetStaticProps } from "next-slicezone/hooks";

import { NextSeo } from "next-seo";

import resolver from "../sm-resolver.js";

import Layout from "./../components/Layout";
import Head from "next/head";

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'

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
      <Layout menu={props.menu}>
        <SliceZone {...props} resolver={resolver} />
        <h1>HELLOOOOOOOO</h1>
      </Layout>
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
