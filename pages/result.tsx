import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'
import Cart from '../components/Cart'
import ClearCart from '../components/ClearCart'

import { fetchGetJSON } from '../utils/api-helpers'
import useSWR from 'swr'

import { useState, useEffect } from "react"
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import NavBarLogo from '@/components/NavBarLogo'

const ResultPage: NextPage = () => {
  const router = useRouter()

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  )

  if (error) return <div>failed to load</div>

  return (
      
      <>
      
      <div className="flex flex-col mx-auto max-w-lg w-full col-auto">
        <NavBarLogo />
        <h1>Bedankt</h1>
        <Link href="/">
        <a href="/">terug naar website</a>
      </Link>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} />
        {data?.payment_intent?.customer}
        
          <ClearCart />
        
      </div>
</>
  )
}

export default ResultPage