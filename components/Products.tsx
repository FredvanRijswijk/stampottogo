
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
// import products from '../data/products.json'
import { Heading, Box, Button } from 'theme-ui'
import useSwr from 'swr'
import Image from 'next/image'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Products = () => {
  const { data, error } = useSwr('/api/dishes', fetcher)
  const { addItem, removeItem, incrementItem } = useShoppingCart()

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
          <Button mr={2}
            className="cart-style-background"
            onClick={() => addItem(dishes)}
          >
            Add to cart
          </Button>
          <Button mr={2}
            className="cart-style-background"
            onClick={() => incrementItem(dishes.sku, 1)}
          >incr</Button>
          <Button variant='secondary'
            className="cart-style-background"
            onClick={() => removeItem(dishes.sku)}
          >
            Remove
          </Button>
        </div>
      ))}
    </section>
  )
}

export default Products