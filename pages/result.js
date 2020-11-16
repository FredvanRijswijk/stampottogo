import React, { useState, useEffect } from "react";
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'
import Cart from '../components/Cart'
import ClearCart from '../components/ClearCart'

import { fetchGetJSON } from '../utils/api-helpers'
import useSWR from 'swr'


import Navbar from '@/components/Navbar'
import Link from 'next/link'
import NavBarLogo from '@/components/NavBarLogo'
import { useAuth } from "@/lib/auth";


const ResultPage = () => {
  const router = useRouter()
  const { user } = useAuth();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  )

  console.log(data?.payment_intent);

  if (error) return <div>failed to load</div>


    useEffect(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'purchase',
        'ecommerce': {
          'purchase': {
            'transaction_id': data?.payment_intent.id,
            'value': data?.payment_intent.charges.data[0].amount/100,
            'tax': (data?.payment_intent.charges.data[0].amount/100)/100*9,
            'shipping': 2.95,
            'currency': 'EUR',
            
          },
          'payment_method': data?.payment_intent.charges.data[0].payment_method_details.type,
        }
      })
    })


  if (user) {
    console.log(user.uid);
  }

  return (
      
      <>
      
      <div className="flex flex-col mx-auto max-w-lg w-full col-auto">
        <NavBarLogo />
        <h1>Bedankt</h1>

        {/* <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2> */}
        {/* <h3>CheckoutSession response:</h3> */}
        {/* <PrintObject content={data ?? 'loading...'} /> */}
        {data?.payment_intent?.charges.data[0].receipt_number}
        
          <ClearCart />
        
      </div>
</>
  )
}

export default ResultPage