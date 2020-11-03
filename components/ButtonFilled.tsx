import React from 'react'
import Link from 'next/link'

const Button = ({ ...props }) => {
    const {
        title
         = {},
      } = props
    return (
        <>
        <div className="inline-flex rounded-md shadow">
        <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium square-md text-white bg-gray-900 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
          {props.title}
        </a>
      </div>
        </>
    )
}

export default  Button