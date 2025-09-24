import React from 'react'

const PageNotFound = () => {
  return (
    <div className='h-screen p-20 '>
        <h1 className='text-9xl text-center text-red-400 mt-30'>404</h1>
        <h3 className=' text-9xl text-center text-red-400 '>Page Not Found !</h3>
        <h4 className='text-6xl text-center mt-10 text-gray-600'>We couldn't find the page you <br /> were looking for.</h4>
    </div>
  )
}

export default PageNotFound