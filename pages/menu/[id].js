import { useRouter } from 'next/router'
import Image from 'next/image'
import { formatCurrencyString } from 'use-shopping-cart'

export default function MenuItem({ item, preview }) {
    const router = useRouter()
    
    if (!router.isFallback && !item?.sku) {
      return (<><p>OEPS</p></>)
    }
    const { name = "", sku = "", price = "", description = "", image = "", currency="eur" } = item || {};

    if(image !== "") {
      return (
        <>
            <h1>{name}</h1>
            
            <Image src={image} alt={name} width="320" height="320" />
            <p>{description}</p>
            <p>{formatCurrencyString({
              value: price,
              currency: currency,
            })}</p>

        </>
    )       
    }

    return (
      <>
          <h1>{name}</h1>
          <p>{description}</p>

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