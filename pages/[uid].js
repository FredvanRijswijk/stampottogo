import { Client } from "../prismic";
import SliceZone from "next-slicezone";
import { useGetStaticProps, useGetStaticPaths } from "next-slicezone/hooks";

import Head from "next/head";
import { NextSeo } from "next-seo";

import resolver from "../sm-resolver.js";

import Layout from "./../components/Layout";

const Page = (props) => {
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
                'pagePath': '/${props.uid}',
                'pageTitle': '${meta_title}'
              });`,
          }}
        ></script>
      </Head>
      <NextSeo
        title={meta_title}
        description={meta_description}
        canonical={`https://www.stamppottogo.nl/${props.uid}`}
      />
      <Layout menu={props.menu}>
        <SliceZone {...props} resolver={resolver} />
      </Layout>
    </>
  );
};

// Fetch content from prismic
export const getStaticProps = useGetStaticProps({
  client: Client(),
  uid: ({ params }) => params.uid,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: "page",
  fallback: true, // process.env.NODE_ENV === 'development',
  formatPath: ({ uid }) => ({ params: { uid } }),
});

export default Page;
