import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import GrantAccess from './components/GrantAccess';
import Search from './components/Search';
import Header from './components/Header';
import AddCriminal from './components/AddCriminal';
import Fingerprint from './components/Fingerprint';
import DNA from './components/DNA';
import Face from './components/Face';
import Error from './components/Error';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '*',
      element: <Error />,
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
      element: (
        <div>
          <Header />
          <Search />
        </div>
      ),
    },
    {
      path: '/addCriminal/:id',
      element: (
        <div>
          <Header />
          <AddCriminal />
        </div>
      ),
    },
    {
      path: '/fingerprint/:id',
      element: (
        <div>
          <Header />
          <Fingerprint />
        </div>
      ),
    },
    {
      path: '/dna/:id',
      element: (
        <div>
          <Header />
          <DNA />
        </div>
      ),
    },
    {
      path: '/face/:id',
      element: (
        <div>
          <Header />
          <Face />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
