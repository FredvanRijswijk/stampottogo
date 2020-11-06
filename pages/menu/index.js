import React from "react";
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import Cart from "../../components/Cart";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

// posts will be populated at build time by getStaticProps()
function Menu({ posts }) {
  const { addItem } = useShoppingCart()
    return (
      <Cart>
          <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {posts.dishes.map((post) => (
          <>
          <div className="px-2 py-2 m-8 sm:m-1">
          <div key={post.sku} className="bg-white border rounded-lg overflow-hidden">
            <Image src={post.image} alt={post.name} layout="resonsive" width="320" height="320" className="object-fill w-full"/>
            <div className="p-6">
            <h2 className="font-semibold text-xl uppercase">{post.name}</h2>
            <div className="flex justify-between">
              <div className="text-gray-600 text-sm">{post.weight}</div>
              <div className="text-gray-900 text-lg font-bold">{formatCurrencyString({
                value: post.price,
                currency: post.currency,
                language: 'nl-NL'
              })}</div>
            </div>
            <div className="mt-2 leading-tight">
              {post.description}
            </div>
            <div className="mt-4">
            <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              onClick={addItem(post)}
            >
              Bekijk
            </button>
            {/* <button
              
              onClick={() => decrementItem(dishes.sku, 1)}
            />
            <button
              
              onClick={() => incrementItem(dishes.sku, 1)}
            />
            <button 
              onClick={() => removeItem(dishes.sku)}
            >
              Verwijderen
            </button> */}
            </div>
            </div>
          </div>
          </div>
          </>
        ))}
      </div>
      </Cart>
    )
  }
  
  // This function gets called at build time on server-side.
  // It won't be called on client-side, so you can even do
  // direct database queries. See the "Technical details" section.
  export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/getDishes`)
    const posts = await res.json()

  
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
        revalidate: 20,
    }
  }
  
  export default Menu