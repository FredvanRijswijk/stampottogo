
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
// import products from '../data/products.json'
import { Heading } from 'theme-ui'
import useSwr from 'swr'
import Image from 'next/image'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Products = () => {

  const { data, error } = useSwr('/api/dishes', fetcher)
  const { addItem, removeItem, incrementItem, decrementItem } = useShoppingCart()

  if (error) return <div>Oeps er ging iets mis</div>
  if (!data) return <div>Ben even kijk in de keuken wat voor lekkers ze aan het maken zijn, momentje </div>

  // console.log(data.dishes);
  

  return (
    <>
      {data.dishes.map((dishes) => (
        <>
        <div className="px-2 py-2 m-8 sm:m-1">
        <div key={dishes.sku} className="bg-white border rounded-lg overflow-hidden">
          <Image src={dishes.image} alt={dishes.name} layout="fill" className="object-fill w-full"/>
          <div className="p-6">
          <h2 className="font-semibold text-xl uppercase">{dishes.name}</h2>
          <div className="flex justify-between">
            <div className="text-gray-600 text-sm">{dishes.weight}</div>
            <div className="text-gray-900 text-lg font-bold">{formatCurrencyString({
              value: dishes.price,
              currency: dishes.currency,
              language: 'nl-NL'
            })}</div>
          </div>
          <div className="mt-2 leading-tight">
            {dishes.description}
          </div>
          <div className="mt-4">
          <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            onClick={() => addItem(dishes)}
          >
            Toevoegen
          </button>
          {/* <button
            
            onClick={() => decrementItem(dishes.sku, 1)}
          />
          <button
            
            onClick={() => incrementItem(dishes.sku, 1)}
          />
          <button 
            onClick={() => removeItem(dishes.sku)}
          >
            Verwijderen
          </button> */}
          </div>
          </div>
        </div>
        </div>
        </>
      ))}
      </> 
  )
}

export default Products