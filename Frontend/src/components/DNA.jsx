import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Search = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className='animate-fadeInUp'>
      <h1 className='text-white m-8'>search for a DNA</h1>
    </div>
  )
}

export default Search
