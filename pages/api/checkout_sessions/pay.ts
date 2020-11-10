import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export default async (
  req: NextApiRequest,
  res: NextApiResponse) => {

  const myDishes = await fetch(`${process.env.NEXT_BASE_URL}/api/dishes`).then((res) => res.json())

  // pay
  if (req.method === 'POST') {
    const data = req.body
    console.log('BODY: ', req.body);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: data.amount,
        payment_method_types: ['ideal', 'card'],
        currency: 'eur',
        receipt_email: data.email,
        metadata: {
          order_id: '451151'
        },

      })

      console.log('PAYMENT: ', payment.client_secret);

      res.status(200).send(payment.client_secret);

    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).end(error.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}