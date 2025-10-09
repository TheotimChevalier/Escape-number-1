import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage/HomePage';
import StartPage from "./pages/StartPage/StartPage";
import GameOver from './pages/GameOver/GameOver';
import Felicitation from './pages/Felicitation/Felicitation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,

      },

      {
        path: '/start',
        element: <StartPage />,

      },
      {
        path: '/game-over',
        element: <GameOver />,
      },
      {
        path: '/felicitation',
        element: <Felicitation />,
      },
    ],
  },
]);

export default function Routes() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}