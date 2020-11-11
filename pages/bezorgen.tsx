import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { useAuth } from "@/lib/auth";
import getStripe from "../utils/get-stripe";
import { format, formatDistance, formatRelative, subDays, addDays } from 'date-fns'
import { nl } from 'date-fns/locale'

import { logEvent, Result, ErrorResult } from "../utils/util";
import { fetchPostJSON } from "../utils/api-helpers";

import {
  Elements,
  CardElement,
  IdealBankElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import Axios from "axios";
import Cart from "../components/Cart";
import { useRouter } from "next/router";
import NavBarLogo from "@/components/NavBarLogo";
import StripeTestCards from "@/components/StripeTestCards";
import Link from "next/link";
import CartSummaryShort from "@/components/CartSummaryShort";
import Head from "next/head";

const ELEMENT_OPTIONS = {
  classes: {
    base: "StripeElementIdeal",
    focus: "StripeElementIdeal--focus",
  },
  style: {
    base: {
      padding: "10px 14px",
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = () => {

  const today = new Date()
  const tomorrow = addDays(new Date(), 1)

  const optionsDate = [
    <option key={'Wanneer'} value={''}>
      {'Wanneer?'}
    </option>,
    <option key={'vandaag'} value={today.toDateString()}>
      {'vandaag'}
    </option>,
    <option key={'morgen'} value={tomorrow.toDateString()}>
    {'morgen'}
  </option>
  ]
  
  const optionsTime = [
    <option key={'Hoe laat'} value={''}>
      {'Hoe laat?'}
    </option>,
    <option key={'16:00'} value='16:00'>
      {'16:00 - 16:30'}
    </option>,
    <option key={'16:30'} value='16:30'>
    {'16:30 - 17:00'}
  </option>,
  <option key={'17:00'} value='17:00'>
  {'17:00 - 17:30'}
</option>,
    <option key={'17:30'} value='17:30'>
    {'17:30 - 18:00'}
  </option>,
  <option key={'18:00'} value='18:00'>
  {'18:00 - 18:30'}
</option>,
    <option key={'18:30'} value='18:30'>
    {'18:30 - 19:00'}
  </option>,
  <option key={'19:00'} value='19:00'>
  {'19:00 - 19:30'}
</option>,<option key={'19:30'} value='19:30'>
    {'19:30 - 20:00'}
  </option>
    
  ]

 

  const { user } = useAuth();
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProccessing, setProccessingTo] = useState(false);

  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    setItemQuantity,
    totalPrice,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setProccessingTo(true);

    // console.log('cartDetails:', cartDetails);

    const delivery = {
      location: "ce",
      time: time,
      day: day,
      uid: user.uid,
      phone: phone
    };

    const cartData = JSON.stringify(cartDetails);

    const mergedata = {
      cartDetails,
      ...delivery,
    };

    console.log("MERGEDATA: :::: ", mergedata);

    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      mergedata
    );

    // console.log('RESPONSE: ', response);

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    redirectToCheckout({ sessionId: response.id });
  };

  

  return (
    <>
    <div className="grid grid-cols-2">
      <div>
      <form className="w-full max-w-lg" onSubmit={handleCheckout}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Datum
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="quantity-select"
                required
                defaultValue={day}
                onChange={(event) => {setDay(event.target.value)}}
              >
                {optionsDate}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                </svg>
              </div>
            </div>

            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Tijd
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
                id="quantity-select"
                defaultValue={time}
                onChange={(event) => {setTime(event.target.value)}}
              >
                {optionsTime}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                </svg>
              </div>
            </div>
            <div className="relative">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Telefoon
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="phone"
        required
        placeholder="061241212"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }} />
  
    </div>
          </div>
        </div>
        <button type="submit" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
              Adres & betalen 
            </button>
      </form>

      </div>


      <div>

      <CartSummaryShort />

      </div>
      </div>

      {/* <form className="w-full max-w-lg" onSubmit={handleSubmit}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Voornaam
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="name"
        required
        placeholder="Kirsten"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }} />
  
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Achternaam
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" 
        required
        placeholder="van Rijswijk"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }} />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-street">
        Straat
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" 
        required
        placeholder="Markt 5"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }} />
   
    </div>
  </div>
  
  <div className="flex flex-wrap -mx-3 mb-2">
    
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        Postcode
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" 
      required
      placeholder="5211DT"
      value={postal_code}
      onChange={(e) => {
        setPostalCode(e.target.value);
      }} />
    </div>
    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        Stad
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" 
      required
      placeholder="'s-Hertogenbosch"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }} />
    </div>
  </div>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
        Email
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" 
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }} />
   
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
    <label htmlFor="ideal" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">iDEAL Bank</label>
      <IdealBankElement
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700  px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="ideal"
        onBlur={logEvent('blur')}
        onChange={logEvent('change')}
        onFocus={logEvent('focus')}
        onReady={logEvent('ready')}
        options={ELEMENT_OPTIONS}
      />
    </div>
  </div>

      {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
      {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>}
      {paymentStatus && <Result>Got PaymentStatus: {paymentStatus}</Result>}
      <div className="text-right pt-4">
      <button type="submit" disabled={isProccessing} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
        {isProccessing ? "Verwerken van bestelling" : `Betaal`}
      </button>
      </div>
    </form> */}
    </>
  );
};

const OrderPage: NextPage = () => {

  return (
    <>
    <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'event': 'Pageview',
                'pagePath': '/bezorgen',
                'pageTitle': 'Bezorgen STAMPPOT to go'
              });`,
          }}
        ></script>
      </Head>
      <NavBarLogo />
      <div className="text-center font-light px-4 py-2 m-2 hidden lg:block"><Link href="/winkelwagentje">* Terug naar winkelwagentje</Link></div>
      <div className="flex flex-col max-w-lg w-full justify-center items-center mx-auto">
        <h2 className="font-bold uppercase">Bezorging</h2>
        <div className="flex items-center mt-4 text-red-800">
        <p className="ml-3 text-xs">
            Bezorging alleen in 's-Hertogenbosch, Vught en Rosmalen
          </p>
          </div>
          <CheckoutForm />
        <div className="flex items-center mt-4 text-green-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="flex-shrink-0 w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
          <p className="ml-3 text-xs">
            Alle transacties gaan via{" "}
            <abbr title="Grootste en veiligste betaalplatform">Stripe</abbr>{" "}
            betaalplatform.
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
