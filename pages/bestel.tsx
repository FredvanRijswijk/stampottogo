import { NextPage } from 'next'
import Layout from '../components/Layout'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'

import { jsx, Styled } from 'theme-ui'


const OrderPage: NextPage = () => {

  const [user] = ['5211']

  return (
    <Layout menu="">
      <div className="page-container">
        <h1>Bestel</h1>

        {/* {user ? <Cart><CartSummary /></Cart> : 'Geen toegang tot bestellen'} */}
      
        <Cart>
          <CartSummary />
          <Products />
        </Cart>
      </div>
    </Layout>
  )
}

export default OrderPage