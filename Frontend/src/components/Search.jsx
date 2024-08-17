import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Search = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      <h1 className='text-white m-10'>search for a criminal</h1>
      {
        (role === "admin") ? (
          <Link to={`/grant-access/${token}`}>
            <i className='cursor-pointer bg-white p-3 rounded-lg m-5'>Add access</i>
          </Link>
        ) : null
      }
    </div>
  )
}

export default Search
