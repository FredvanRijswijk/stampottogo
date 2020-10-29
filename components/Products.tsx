
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
  if (!data) return <div>Laden...</div>

  // console.log(data.dishes);
  

  return (
    <section className="products">
      {data.dishes.map((dishes) => (
        <div key={dishes.sku} className="product">
          <Image src={dishes.image} alt={dishes.name} width="320" height="320"/>
          <Heading as='h3'>{dishes.name}</Heading>
          <p className="price">
            {formatCurrencyString({
              value: dishes.price,
              currency: dishes.currency,
            })}
          </p>
          <button
          color="warning"
            onClick={() => addItem(dishes)}
          >
            Toevoegen
          </button>
          <button
            
            onClick={() => decrementItem(dishes.sku, 1)}
          />
          <button
            
            onClick={() => incrementItem(dishes.sku, 1)}
          />
          <button 
            onClick={() => removeItem(dishes.sku)}
          >
            Verwijderen
          </button>
        </div>
      ))}
    </section>
  )
}

export default Products