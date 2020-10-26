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

      <>
      <nav className="f-reset"> 
      <div className="linksnav">
        <a href="/">test</a>
      {menuLinks.map((menuLink, index) => (
            
              <DocLink key={`menulink-${index}`} link={menuLink.link} linkClass="link">
                {RichText.asText(menuLink.label)}
              </DocLink>
           
          ))}
      <NextLink href="/bestel">
                Bestel
              </NextLink>
              <NextLink href="/contact">
                Contact
              </NextLink>
              <Cart>
                  <CartNavBar />
                </Cart>
      </div>
       
      </nav>
      
      <style jsx>{`
        nav {
          background-color: #e4f9f3;
          position: relative;
          flex: 1;
          height: 80px;
          display: flex;
          align-items: center;
          
        }

        .linksnav {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 1;
        }

        .linksnav a.link {
          text-decoration: none;
          transition: color 0.2s ease;
          color: #000;
        }

        .linksnav a:hover.link {
          color: #000;
        }

        .linksnav a.selected.link {
          color: #414f6b;
          font-weight: 600;
        }


        .linksnav a:first-child,
        .linksnav a:last-child {
          display: flex;
        }

        a.icon,
        a.icon > :global(div.container) {
          /* Remove additional space from SVG */
          display: inline-flex;
          justify-content: center;
        }

        a.icon > :global(div.container) {
          overflow: visible;
        }

        .mobile-logo,
        .mobile-top {
          display: none;
        }

        .header-feedback {
          display: inline-flex;
        }

        /* Mobile */

        @media (max-width: 640px) {
          .mobile-logo {
            display: block;
          }

          nav {
            height: unset;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 1rem 0;
          }

          nav .links .logo,
          nav .links .icon {
            display: none;
          }

          nav .links a {
            font-size: 14px;
          }

          .mobile-top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }

          .mobile-top > .icons {
            display: flex;
            align-items: center;
          }

          .mobile-top > .icons a:nth-child(2) {
            margin-left: 2rem;
          }
        }

        @media (max-width: 950px) {
          .header-feedback {
            display: none;
          }
        }
      `}</style>
      
      </>
    )
  }
  return null
}

export default Navbar;