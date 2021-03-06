import React, { useState, useEffect } from "react";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/api-helpers";

import Image from "next/image";
import ProductImageView from "./ProductImageView";
import Link from "next/link";

const CartSummary = () => {
  const [isLoading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    setItemQuantity
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const options = []
    for (let quantity = 1; quantity <= 20; ++quantity)
      options.push(<option key={quantity} value={quantity}>{quantity}</option>)


  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);

    // console.log('cartDetails:', cartDetails);

    const da = {
      pickup: "Hotel Central",
      time: "18:00",
    };

    const cartData = JSON.stringify(cartDetails);

    const mergedata = {
      cartDetails,
      ...da,
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

  if (Object.keys(cartDetails).length === 0) {
    return (
      <div className="flex flex-col w-full mx-auto p-8 text-gray-800 bg-white shadow-lg pin-r pin-y lg:w-4/5">
        <div className="flex-1">
          <h2 className="font-semibold uppercase text-center">
          Winkelwagentje
          </h2>
          <h3>
          Je hebt nog geen keuze opgegeven, ga snel naar ons menu en kies iets lekkers en vers.
        </h3>
      </div>
      </div>
    );
  } else {
    return (
      
      <div className="flex flex-col w-full mx-auto p-8 text-gray-800 bg-white shadow-lg pin-r pin-y lg:w-4/5">
        <div className="flex-1">
          <h2 className="font-semibold uppercase text-center" suppressHydrationWarning>
            Hebben wij je bestelling zo compleet?
          </h2>
          <table className="w-full text-sm lg:text-base">
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Lekkers</th>
                <th className="lg:text-right text-left pl-5 lg:pl-0">
                  <span className="lg:hidden" title="Aantal">
                    Stuks
                  </span>
                  <span className="hidden lg:inline">Aantal</span>
                </th>
                {/* <th className="text-right">+/-</th> */}
                <th className="hidden text-right md:table-cell">Per stuk</th>
                <th className="text-right">Totaal</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cartDetails).map((item) => {
                const cartItem = cartDetails[item];
                // console.log(cartItem);

                const {
                  name,
                  sku,
                  quantity,
                  formattedValue,
                  price,
                  weight,
                  currency,
                } = cartItem;
                return (
                  <tr suppressHydrationWarning key={cartItem.sku}>
                    <td className="hidden pb-4 md:table-cell">
                    <div className="p-2">
                      <ProductImageView
                        className="h-10 w-10 rounded-full"
                        url={cartItem.image}
                        alt=""
                        width="60"
                        height="60"
                        layout="fill"
                      />
                      </div>
                    </td>
                    <td>
                      <a href={`/menu/${sku}`}>
                        <div className="mb-2 md:ml-4" suppressHydrationWarning>
                          <span className="font-semibold uppercase">{name}</span>
                        </div>
                        <small suppressHydrationWarning>{weight}</small>
                      </a>
                    </td>
                    {/* <td className="justify-center md:justify-end md:flex mt-6">
                      <div className="w-20 h-10">
                        <div className="relative flex flex-row w-full h-8">
                          <div
                            className="w-full font-semibold text-center text-gray-700 outline-none focus:outline-none hover:text-black focus:text-black"
                            suppressHydrationWarning
                          >
                            {quantity}
                          </div>
                        </div>
                      </div>
                    </td> */}
                    <td className="text-right">
                      <span
                        className="text-sm lg:text-base font-medium"
                        suppressHydrationWarning
                      >
                        <div className="relative">
          <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="quantity-select"
          defaultValue={quantity}
          onChange={(event) => {
            setItemQuantity(sku, +event.target.value)}
          }
        >
          {options}
        </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg>
          </div>
        </div>
{/* <select
className="text-sm lg:text-base font-medium"
            id="quantity-select"
            defaultValue={quantity}
            onChange={(event) => {
              setItemQuantity(sku, +event.target.value)}
            }
          >
            {options}
          </select> */}
                        
                      </span>
                    </td>
                    <td className="hidden text-right md:table-cell">
                      <span
                        className="text-sm lg:text-base font-medium"
                        suppressHydrationWarning
                      >
                        {formatCurrencyString({
                          value: price,
                          currency: currency,
                          language: "nl-NL",
                        })}
                      </span>
                    </td>
                    <td className="text-right">
                      <span
                        className="text-sm lg:text-base font-bold"
                        suppressHydrationWarning
                      >
                        {formattedValue}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr className="pb-6 mt-6 min-w-screen" />
          <div className="flex justify-between ">
          <div>
          <button onClick={() => clearCart()} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
              Leeg 
          </button>
            </div>
          <div className="text-right">
          <Link href="/bezorgen">
            <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
              Bestellen 
            </button>
            </Link>
        </div>
          </div>
      
        </div>
      </div>
      
    );
  }
};

export default CartSummary;
