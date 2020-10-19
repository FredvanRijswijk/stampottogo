import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ menu, children }) => {
  if (menu) {
    const menuLinks = menu.data.menu_links;
    return (
      <div>
        {/* <Head>
          <title>Slice Machine - NextJS</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <Navbar menuLinks={menuLinks} />
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