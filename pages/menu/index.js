import React from "react";
import Link from "next/link"

// posts will be populated at build time by getStaticProps()
function Menu({ posts }) {
    return (
      <ul>
        {posts.dishes.map((post) => (
          <li>
            <Link href={`/menu/${post.sku}`} >{post.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
  
  // This function gets called at build time on server-side.
  // It won't be called on client-side, so you can even do
  // direct database queries. See the "Technical details" section.
  export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(`${process.env.FIREBASE_CLOUD_FUNCTION_URL}/getDishes`)
    const posts = await res.json()

  
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
        revalidate: 20,
    }
  }
  
  export default Menu