import { useState } from 'react'
import LoginSignUp from './pages/LoginSignup/LoginSignUp'
import SignupPage from './pages/SignupPage/SignupPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage/Home';
function App() {
const router = createBrowserRouter([
  {
    path:'/',
    element: <LoginSignUp/>
  },
  {
    path:'/signup',
    element:<SignupPage/>
  },
  {
    path:'/home/:name',
    element:<Home/>
  }
])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
