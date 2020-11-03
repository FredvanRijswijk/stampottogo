import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = ({menu, children }) => {
  if (menu) {
    return (
      <div className="flex">
        {/* <Head>
          <title>Slice Machine - NextJS</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <Navbar />
        <main>{children}</main>

        <Footer />

      </div>
    );
  } 

  return (
    <div className="flex">

      <main>{children}</main>
      
      <Footer />

    </div>
    
  )
  
  
};

export default Layout;