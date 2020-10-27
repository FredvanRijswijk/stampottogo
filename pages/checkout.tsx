import React, {useState} from 'react';
import { NextPage } from 'next'
import Layout from '../components/Layout'

import getStripe from '../utils/get-stripe'

import {logEvent, Result, ErrorResult} from '../utils/util';

import { Elements, CardElement, IdealBankElement, useElements, useStripe } from '@stripe/react-stripe-js'

import Axios from 'axios';
import Cart from '../components/Cart'
import { useRouter } from 'next/router';

const ELEMENT_OPTIONS = {
  classes: {
    base: 'StripeElementIdeal',
    focus: 'StripeElementIdeal--focus',
  },
  style: {
    base: {
      padding: '10px 14px',
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};


const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProccessing, setProccessingTo] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setProccessingTo(true);

    const idealBankElement = elements.getElement(IdealBankElement);


    const payload = await stripe.createPaymentMethod({
      type: 'ideal',
      ideal: idealBankElement,
      billing_details: {
        name: name,
        email: email
      },
      
    });

    if (payload.error) {
      console.log('[error]', payload.error);
      setErrorMessage(payload.error.message);
      setPaymentMethod(null);
    } else {

      
  
      
      console.log('[PaymentMethod]', payload);
      setPaymentMethod(payload.paymentMethod);
      setErrorMessage(null);

      const data = {
        amount: 1099,
        email: email
      }
      const response = await Axios.post('/api/checkout_sessions/pay', {
        data
      })

      const pi: string = response.data

      console.log('RESPONSE: ', pi);
      

      const confirmedPayment = await stripe.confirmIdealPayment(pi, {
        payment_method: payload.paymentMethod.id,
        return_url: 'https://staging.stamppottogo.nl/checkout'
      });
      
      setPaymentStatus(confirmedPayment.paymentIntent)
      console.log(confirmedPayment); 

    }
  };

  return (
    <>
    <Cart>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        required
        placeholder="Jenny Rosen"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="ideal">iDEAL Bank</label>
      <IdealBankElement
        id="ideal"
        onBlur={logEvent('blur')}
        onChange={logEvent('change')}
        onFocus={logEvent('focus')}
        onReady={logEvent('ready')}
        options={ELEMENT_OPTIONS}
      />
      {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
      {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
      {paymentStatus && <Result>Got PaymentStatus: {paymentStatus}</Result>}
      <button type="submit" disabled={isProccessing}>
        {isProccessing ? "Verwerken van bestelling" : `Betaal`}
      </button>
    </form>
    </Cart>
    </>
  )
}





const OrderPage: NextPage = () => {

  const [user] = ['5211']
  const router = useRouter()

  return (
    <Layout menu="">
      <div className="page-container">
        <h1>Checkout</h1>

        <Elements stripe={getStripe()}>
          <CheckoutForm />
        </Elements>
      
        
      </div>
    </Layout>
  )
}

export default OrderPage