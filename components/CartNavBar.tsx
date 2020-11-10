import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import { useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from '../utils/api-helpers'

const CartNavBar = () => {
  const [loading, setLoading] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(true)
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart()

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true)

    console.log('cartDetails:', cartDetails);

    const da = {
      meta: 'test',
      oke: 'erheiu iuehr'
    }

    const cartData = JSON.stringify(cartDetails)

    const mergedata = {
      cartDetails,
      ...da
    }


    console.log('MERGEDATA: :::: ', mergedata);
    
    
    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      mergedata
    )

    console.log('RESPONSE: ', response);
    

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    redirectToCheckout({ sessionId: response.id })
  }

  return (
      <Link href="/winkelwagentje">
        <a href="/winkelwagentje" >
      <div className="flex font-bold text-center px-4 py-2 m-2 items-center">
        <div>
          <svg className="h-6 w-6 fill-current text-red-600" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.949,7.472c-2.176,2.902-4.095,3.002-7.046,3.152H9.802c-3.591-0.002-6.138-1.336-6.138-1.832  C3.662,8.321,5.962,7.095,9.269,6.973L9.859,5.5c-0.019,0-0.037-0.002-0.057-0.002c-4.908,0-7.791,1.562-7.791,3.051v2  c0,0.918,0.582,8.949,7.582,8.949s8-8.031,8-8.949v-2c0-0.391-0.201-0.787-0.584-1.158L16.949,7.472z M17.589,2.702  c-0.441-0.33-1.069-0.242-1.399,0.201l-3.608,4.809l2.336-5.838c0.206-0.512-0.044-1.094-0.557-1.301  c-0.508-0.205-1.096,0.043-1.3,0.559L9.802,9.274c2.882-0.147,4.277-0.227,6.067-2.611c1.789-2.387,1.919-2.561,1.919-2.561  C18.12,3.661,18.031,3.034,17.589,2.702z" />
          </svg>
        </div>
        <div suppressHydrationWarning> 
          {cartCount} 
        </div>         
        
      </div>
      </a>
      </Link>
  
  )
}

export default CartNavBar




