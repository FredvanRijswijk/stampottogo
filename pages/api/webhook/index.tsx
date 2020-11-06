import { buffer } from 'micro'
import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingWebhook } from '@slack/webhook'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!
const slackUrl = process.env.SLACK_WEBHOOK_URL;

const slackWebhook = new IncomingWebhook(slackUrl)

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id)

    let intent = null;
    let paymentIntent = null;
    let charge = null;
    switch (event['type']) {
      case 'payment_intent.succeeded':
        intent = event.data.object;
        console.log("Succeeded:", intent.id);
        paymentIntent = event.data.object as Stripe.PaymentIntent;
        const payTo = event.data.object as Stripe.Charge
        await slackWebhook.send({
          text: `💰 PaymentIntent status: ${paymentIntent.status} | ${payTo.billing_details}`,
        });
        console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
        break;
      case 'payment_intent.payment_failed':
        intent = event.data.object;
        const message = intent.last_payment_error && intent.last_payment_error.message;
        console.log('Failed:', intent.id, message);
        paymentIntent = event.data.object as Stripe.PaymentIntent
        await slackWebhook.send({
          text:`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`,
        });
      console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`)
        break;
      case 'payment_intent.created':
        charge = event.data.object as Stripe.Charge;
        await slackWebhook.send({
          text:`💵 Charge id: ${charge.id}`,
        });
        console.log(`💵 Charge id: ${charge.id}`)
        break;
    }

    // Cast event data to Stripe object.
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      )
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge
      console.log(`💵 Charge id: ${charge.id}`)
    } 
    else if (event.type === 'payment_intent.created') {
      const charge = event.data.object as Stripe.PaymentIntentsResource
      console.log(`👍🏻 Charge id: ${charge.create}`)
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}


export default cors(webhookHandler as any)