import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '/pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/home',
        element: <HomePage/>,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);