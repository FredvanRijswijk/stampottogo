import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'

import Cart from '../components/Cart'
import Navbar from '@/components/Navbar'
import CartSummary from '@/components/CartSummary'
import { useAuth } from '@/lib/auth'; 

const OrderPage: NextPage = () => {

const  { user, signinAnonymous } = useAuth();

if (user) {
  console.log(user.uid);
} else {
  signinAnonymous()
}
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