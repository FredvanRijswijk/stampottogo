import React from "react";
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

import ProductImageView from '../../components/ProductImageView'

function Menu({ posts }) {
  
  const { addItem } = useShoppingCart()
  
    return (
      <>
          <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">

        {posts.dishes.map((post) => (

              <div key={post.id} className="px-2 py-2 m-8 sm:m-1">
                        <div className="bg-white border rounded-lg overflow-hidden">
             
                        
                        <ProductImageView 
                          className="object-fill w-full"
                          url={post.image} 
                          name={post.attribution} 
                          width="320" 
                          height="320" />

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
                          >
                            Add to cart
                          </button>
                          </div>
                          </div>
                        </div>
                        </div>

          
          
          
          
        ))}
      </div>
      </>
    )
  }
  
  export async function getStaticProps() {
    const res = await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/getDishes`)
    const posts = await res.json()

    return {
      props: {
        posts,
      },
      revalidate: 1,
    }
  }
  
  export default Menu