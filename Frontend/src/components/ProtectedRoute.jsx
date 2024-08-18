import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import GrantAccess from './GrantAccess';
import Unauthorised from './Unauthorised';

const ProtectedRoute = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const id = localStorage.getItem('id');
      try {
        const response = await axios.post('http://localhost:3000/role', {
          id: id
        });
        setRole(response.data.role);
        console.log(role)
      } catch (error) {
        console.error('Login error:', error);
        // alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (role === 'admin') {
    console.log("You are the chosen one!")
    return <div><GrantAccess /></div>;
  } else {
    console.log("You are not the chosen one XD")
    return <div><Unauthorised /></div>
  }
};

export default ProtectedRoute;