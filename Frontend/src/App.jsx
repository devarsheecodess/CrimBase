import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import GrantAccess from './components/GrantAccess';
import Search from './components/Search';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/grant-access/:id',
      element: (
        <ProtectedRoute>
          <GrantAccess />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/unauthorized',
      element: (
        <div>
          <h1>You can’t view this page</h1>
        </div>
      ),
    },
    {
      path: '/search/:id',
      element: <Search />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
