import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {

    const { amount, email } = req.body
    console.log(amount);

    try {
        const payment = await stripe.paymentIntents.create({
            amount: 1099,
            payment_method_types: ['ideal'],
            currency: 'eur',
            receipt_email: email
        })

        console.log(payment.client_secret);

        res.status(200).send(payment.client_secret);
        
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
      }
}