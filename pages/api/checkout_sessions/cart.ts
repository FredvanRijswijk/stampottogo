import { NextApiRequest, NextApiResponse } from 'next'

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
// import inventory from '../../../data/products.json'


import Stripe from 'stripe'
import useDishes from '../../../hooks/Dishes'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const data  = await fetch('http://localhost:3000/api/dishes').then((res) => res.json())
  console.log('DATA ', data);
  
  if (data.dishes) {
    console.log('DATA Dishes', data.dishes);
    
  }

  if (req.method === 'POST') {
    
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = req.body
      const line_items = validateCartItems(data.dishes, cartItems)
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        allow_promotion_codes: true,
        submit_type: 'pay',
        payment_method_types: ['card', 'ideal'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['NL'],
        },
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/bestel`,
      }
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      )

      console.log('checkoutSession: ', checkoutSession);
      

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}