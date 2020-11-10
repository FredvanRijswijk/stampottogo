import { NextApiRequest, NextApiResponse } from 'next'
import { validateCartItems } from 'use-shopping-cart/src/serverUtil'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const myDishes = await fetch(`${process.env.NEXT_BASE_URL}/api/dishes`).then((res) => res.json())

  // pay
    try {
      // res.status(200).send(req.body);
      const payment = await stripe.paymentIntents.create({
        amount: req.body.totalPrice,
        currency: 'eur',
        payment_method_types: ['ideal']

      })

      console.log('PAYMENT: ', payment.client_secret);

      res.status(200).send(payment.client_secret);

    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).end(error.message)
    }

}