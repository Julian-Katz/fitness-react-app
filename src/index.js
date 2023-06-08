import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';

import Food from './Routes/Food/Food';
import App from './App';
import Dashboard from './Routes/Dashboard/Dashboard';
import Exercise from './Routes/Exercise/Exercise';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found 404</div>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/food",
        element: <Food />,
      },
      {
        path: "/exercise",
        element: <Exercise />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
