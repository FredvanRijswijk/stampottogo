import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const NavBarLogo = () => {
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
              <div className="text-center font-light px-4 py-2 m-2 hidden lg:block"><Link href="/winkelwagentje"> * terug naar winkelwagen</Link></div>
              
            </div>
          </nav>
    </header>
    </>
  
  )
}

export default NavBarLogo




