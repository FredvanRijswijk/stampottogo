import { useRouter } from 'next/router'
import Image from 'next/image'
import { formatCurrencyString } from 'use-shopping-cart'
import ProductImageView from '../../components/ProductImageView'

export default function MenuItem({ item, preview }) {
    const router = useRouter()
    
    if (!router.isFallback && !item?.sku) {
      return (<><div>OEPS</div></>)
    }
    const { name = "", sku = "", price = "", description = "", image = "", currency="eur", attribution = "" } = item || {};

    if(image !== "") {
      return (
        <>
            <h1>{name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            <div key={sku} className="px-2 py-2 m-8 sm:m-1">
        <div className="bg-white border rounded-lg overflow-hidden">
              <ProductImageView 
              className="object-fill w-full"
              url={image} 
              name={attribution} 
              width="320" 
              height="320" />
              </div>
            

            <div>{description}</div>
            <div>{formatCurrencyString({
              value: price,
              currency: currency,
            })}</div></div>
            </div>

        </>
    )       
    }

    return (
      <>
          <h1>{name}</h1>
          <div>{description}</div>

      </>
  )
}

export async function getStaticProps({ params, preview = null }) {
    const { id } = params
    const data = await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/getDish?slug=${id}`).then((res) => res.json())
  
    return {
        props: {
          preview,
          item: {
            ...data?.dishes[0],
          },
        },
        revalidate: 20,
      }
  }
  
  export async function getStaticPaths() {
    const allItems = (await getAllPostsWithSlug()) || []
    return {
      paths: allItems.map((item) => `/menu/${item.sku}`),
      fallback: true,
    }
  }

  export async function getAllPostsWithSlug() {
    const response = await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/getDishes`).then((res) => res.json())
    return response?.dishes
  }