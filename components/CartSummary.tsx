import React, { useState, useEffect } from 'react'

import { useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from '../utils/api-helpers'

const CartSummary = () => {
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

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
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
    <form onSubmit={handleCheckout}>
      <h2>Overzicht</h2>
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong>Aantal:</strong> {'meta'}
      </p>
      <p suppressHydrationWarning>
        <strong>Aantal:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Totaal prijs:</strong> {formattedTotalPrice}
      </p>
      <button
        className="cart-style-background"
        type="submit"
        disabled={cartEmpty || loading}
      >
        Betaal
      </button>
      <button
        className="cart-style-background"
        type="button"
        onClick={clearCart}
      >
        Leegmaken
      </button>
    </form>
  )
}

export default CartSummary