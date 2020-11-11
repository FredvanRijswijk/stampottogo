import React, { useState, useEffect } from "react";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/api-helpers";

import Image from "next/image";
import ProductImageView from "./ProductImageView";
import Link from "next/link";

const CartSummaryShort = () => {
  const [isLoading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    setItemQuantity,
    totalPrice
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
      <div className="flex flex-col w-full mx-auto p-8 text-gray-800 bg-white shadow-lg pin-r pin-y">
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
      
      <div className="flex flex-col w-full mx-auto p-8 text-gray-800 bg-white shadow-lg pin-r pin-y">
        <div className="flex-2">
          <h2 className="font-semibold uppercase text-center" suppressHydrationWarning>
            Bon
          </h2>
          <table className="w-full text-sm lg:text-base">
            <thead>
              <tr className="h-12 uppercase">
                <th className="lg:text-right text-left pl-5 lg:pl-0">
                  <span className="lg:hidden" title="Aantal">
                    Stuks
                  </span>
                  <span className="hidden lg:inline">Aantal</span>
                </th>
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
                    
                        <div className="mb-2 md:ml-4" suppressHydrationWarning>
                          <span className="font-semibold uppercase">{name}</span>
                        </div>
                        <small suppressHydrationWarning>{weight}</small>
                    
                    {/* <td className="hidden text-right md:table-cell">
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
                    </td> */}
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
              Totaal: {formatCurrencyString({
                          value: totalPrice,
                          currency: 'eur',
                          language: "nl-NL",
                        })}
            </div>
          <div className="text-right">
          
        </div>
          </div>
      
        </div>
      </div>
      
    );
  }
};

export default CartSummaryShort;
