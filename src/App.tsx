import React from 'react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/AllRoutes';


function App() {
  return (
  <RouterProvider router={router} />
  )
}

export default App;
