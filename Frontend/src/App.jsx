import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Landing from './components/Landing'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Landing />
      </div>
    ),
  },
  {
    path: '/login',
    element: (
      <div>
        <Login />
      </div>
    ),
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
