import React from "react";
import { default as NextLink } from 'next/link'
import Image from "next/image";
import CartNavBar from "./CartNavBar";


const Navbar = () => {
  return (
    <>
    <header className="">
      <nav>
            <div className="container mx-auto">
              
              <div className="flex justify-center m-6 md:hidden ">
              <NextLink href="/">
                <Image
                  src="/static/images/no-picture.jpg"
                  width="80"
                  height="80"
                />
                </NextLink>
              </div>

              <div className="hidden lg:flex justify-center m-6 ">
                <Image
                  src="/static/images/no-picture.jpg"
                  width="160"
                  height="160"
                />
              </div>

            </div>

            <div
              id="menu"
              className="flex items-center justify-between uppercase max-w-screen-md container mx-auto"
            >
              <div className="font-bold text-center px-4 py-2 m-2 hidden lg:block"><NextLink href="/">Home</NextLink></div>
              <div className="font-bold text-center px-4 py-2 m-2 "><NextLink href="/menu">Stamppot</NextLink></div>
              <div className="font-bold text-center px-4 py-2 m-2"><NextLink href="/bestel">Bestel</NextLink></div>
              <CartNavBar />
            </div>
          </nav>
    </header>
    </>
  )
};


export default Navbar;