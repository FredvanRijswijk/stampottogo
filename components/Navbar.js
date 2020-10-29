import React from "react";
import { default as NextLink } from 'next/link'
import { RichText } from 'prismic-reactjs'
import DocLink from "./DocLink"
import Cart from "./Cart";
import CartNavBar from "./CartNavBar";


const Navbar = ({ menuLinks = [] }) => (
    <header className="site-header">
      <Links menuLinks={menuLinks} />
    </header>
);

const links = [
  { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
  { href: 'https://nextjs.org/docs', label: 'Docs' },
]

const Links = ({menuLinks}) => {
 
    return (

      <>
      <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline">Home</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a href={href} className="btn-blue no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </ul>
    </nav>

      </>
    )
  
  return null
}

export default Navbar;