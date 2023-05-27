import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Index from '../components/dashboard';
export const router = createBrowserRouter([
  
  {
    path: "/",
    element: (
      <Login/>
    ),
  },
  {
    path: "/register",
    element: (
      <Register/>
    ),
  },
  {
    path: "/home",
    element: (
      <Index/>
    ),
  }
]);
