import React from 'react'

const EmptyCart = () => {
  return (
    <div className='text-center my-16 flex gap-5 flex-col w-[300px] justify-center mx-auto'>
<h1 className='text-2xl font-extrabold'>Your cart is empty</h1>
<button className='bg-black w-[200px]  mx-auto  text-base rounded-lg p-2 text-white'>Continue Shopping</button>
<h5 className='text-lg font-medium'>Have an account?</h5>
<h4>Log in to check out faster.</h4>
    </div>
  )
}

export default EmptyCart