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

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    setLoading(true)

    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      cartDetails
    )

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    redirectToCheckout({ sessionId: response.id })
  }

  return (
    <form onSubmit={handleCheckout}>
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong> {cartCount} </strong>
      </p>
    </form>
  )
}

export default CartNavBar