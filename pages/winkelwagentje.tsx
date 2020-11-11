import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'

import Cart from '../components/Cart'
import Navbar from '@/components/Navbar'
import CartSummary from '@/components/CartSummary'
import { useAuth } from '@/lib/auth'; 
import { toast, ToastContainer } from '../components/Toast'
import Head from 'next/head'
const OrderPage: NextPage = () => {

const  { user, signinAnonymous } = useAuth();

if (user) {
  console.log(user.uid);
} else {
  signinAnonymous()
}
  return (

<>
<Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'event': 'Pageview',
                'pagePath': '/winkelwagentje',
                'pageTitle': 'Winkelwagentje van STAMPPOT to go'
              });`,
          }}
        ></script>
      </Head>
      <Navbar />

      <ToastContainer />
      <div className="flex bg-gray-200 p-8">
         
          <CartSummary />
          
      </div>
</>

  )
}

export default OrderPage