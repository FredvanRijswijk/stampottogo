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

const Links = ({menuLinks}) => {
  if (menuLinks) {
    return (
      <nav>
        <ul>
          {menuLinks.map((menuLink, index) => (
            <li key={`menulink-${index}`}>
              <DocLink link={menuLink.link}>
                {RichText.asText(menuLink.label)}
              </DocLink>
            </li>
          ))}
          <li> <NextLink href="/bestel">
                Bestel
              </NextLink></li>
              <li> <NextLink href="/contact">
                Contact
              </NextLink></li>

              <li>
                <Cart>
                  <CartNavBar />
                </Cart>
              </li>
        </ul>
      </nav>
    )
  }
  return null
}

export default Navbar;