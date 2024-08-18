import React, { useEffect, useState } from 'react'

const Search = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className='animate-fadeInUp'>
      <h1 className='text-white m-8'>Add a criminal</h1>
    </div>
  )
}

export default Search
