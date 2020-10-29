import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = ({menu, children }) => {
  if (menu) {
    return (
      <div>
        {/* <Head>
          <title>Slice Machine - NextJS</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <Navbar />
        <main>{children}</main>
      </div>
    );
  } 

  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
    
  )
  
  
};

export default Layout;