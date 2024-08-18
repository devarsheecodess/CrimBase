import React from 'react'

const Error = () => {
  return (
    <div className='flex justify-center items-center mt-10 flex-col'>
      <i class="fa-solid fa-ban text-9xl text-red-500"></i>
      <h1 className='text-2xl font-bold text-[#86EFAC] mt-10'>You are not authorized to access this page <i class=" text-[#86EFAC] ml-2 fa-solid fa-triangle-exclamation"></i></h1>
    </div>
  )
}

export default Error
