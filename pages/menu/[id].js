import { useRouter } from 'next/router'


export default function MenuItem({ item, preview }) {
    const router = useRouter()
    
    if (!router.isFallback && !item?.sku) {
      return <ErrorPage statusCode={404} />
    }
    const formattedContent = JSON.stringify(item, null, 2)
    
    return (
        <>
            <pre>{formattedContent}</pre>
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