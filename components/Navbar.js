import React from "react";
import { default as NextLink } from 'next/link'
import { RichText } from 'prismic-reactjs'
import DocLink from "./DocLink"

const Navbar = ({ menuLinks = [] }) => (
    <header className="site-header">
        <NextLink href="/">
      <a><div className="logo">AttiqLab</div></a>
    </NextLink>
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
          <li> <NextLink href="/contact">
                Contact
              </NextLink></li>
        </ul>
      </nav>
    )
  }
  return null
}

export default Navbar;