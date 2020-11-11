import React from "react";
import Link from 'next/link'
import Image from "next/image";
import CartNavBar from "./CartNavBar";


const Navbar = () => {
  return (
    <>
    <header className="">
      <nav>
            <div className="container mx-auto">
              
              <div className="flex justify-center m-6 lg:hidden ">
              <Link href="/">
                <Image
                  src="/static/images/oeteldonk.jpg"
                  width="80"
                  height="80"
                />
                </Link>
              </div>

              <div className="hidden lg:flex justify-center m-6 ">
                <Image
                  src="/static/images/oeteldonk.jpg"
                  width="160"
                  height="160"
                />
              </div>

            </div>

            <div
              id="menu"
              className="flex items-center justify-between uppercase max-w-screen-md container mx-auto"
            >
              <div className="font-bold text-center px-4 py-2 m-2 hidden lg:block"><Link href="/">Home</Link></div>
              {/* <div className="font-bold text-center px-4 py-2 m-2 "><Link href="/menu">Menu</Link></div>
              <div className="font-bold text-center px-4 py-2 m-2"><Link href="/bestel">Over ons</Link></div> */}
              <CartNavBar />
            </div>
          </nav>
    </header>
    </>
  )
};


export default Navbar;