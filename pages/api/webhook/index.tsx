import { buffer } from 'micro'
import Cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingWebhook } from '@slack/webhook'

import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://stamppot-togo.firebaseio.com'
  });
}

const db = admin.firestore();

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

    if (event.type === 'checkout.session.completed') {
      const p = event.data.object as Stripe.PaymentIntent;
        console.log('yfghfgh fgf gfg fgfh',p);

        console.log(p.shipping.address);
        console.log(p.metadata.pickup);

        const data = {
          address: p.shipping.address,
          location: p.metadata.pickup,
          time: p.metadata.time,
          customer: p.customer,
        }
        
        

        // const id = p.payment_intent.toString()
        // const payment = await stripe.paymentIntents.retrieve(id);
        // console.log("Succeeded:", payment);
        await db.collection('orders').doc(p.id).set(data, { merge: true });
        // await slackWebhook.send({
        //   text: `💰 PaymentIntent: ${p.payment_status}`,
        // });
    }

    // Cast event data to Stripe object.
    else if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      intent = event.data.object;

      console.log(`💵 paymentIntent id: ${paymentIntent}`)
        
      // console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
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