import React, {useState} from 'react';
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { useAuth } from '@/lib/auth'; 
import getStripe from '../utils/get-stripe'

import {logEvent, Result, ErrorResult} from '../utils/util';

import { Elements, CardElement, IdealBankElement, useElements, useStripe } from '@stripe/react-stripe-js'

import Axios from 'axios';
import Cart from '../components/Cart'
import { useRouter } from 'next/router';
import NavBarLogo from '@/components/NavBarLogo';

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
  const {user} = useAuth();
  const stripe = useStripe();
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

    const address = {
      line1: 'Kruisstraat 47',
      line2: '',
      city: 'Den Bosch',
      postal_code: '5211 DT',
      country: 'NL'

    }

    const payload = await stripe.createPaymentMethod({
      type: 'ideal',
      ideal: idealBankElement,
      billing_details: {
        address,
        name: name,
        email: email
      },
      metadata: {
        uid: user.uid,
        location: 'ce',
        time: '18:00'
      }
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
      <label htmlFor="ideal" className="font-bold">iDEAL Bank</label>
      <IdealBankElement
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
    
    </>
  )
}





const OrderPage: NextPage = () => {

  const [user] = ['5211']
  const router = useRouter()

  return (
    <>
    <NavBarLogo />
    <div className="flex flex-col max-w-lg w-full">
        <h2 className="font-bold uppercase">Afrekenen</h2>

        <Elements stripe={getStripe()}>
          <CheckoutForm />
        </Elements>
        <div className="flex items-center mt-4 text-green-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          <p className="ml-3 text-xs">Alle transacties gaan via <abbr title="Grootste en veiligste betaalplatform">Stripe</abbr> betaalplatform.</p></div>
      </div>
    </>
  )
}

export default OrderPage