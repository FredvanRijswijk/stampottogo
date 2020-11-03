import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'

import { useShoppingCart } from 'use-shopping-cart'

import Cart from '../components/Cart'

import Products from '../components/Products'
import Navbar from '@/components/Navbar'
import CartSummary from '@/components/CartSummary'

const OrderPage: NextPage = () => {

  return (

      <Cart>
      <Navbar />
      <div className="flex bg-gray-200 p-8">
        
          <CartSummary />
          
      </div>
      </Cart>

  )
}

export default OrderPage