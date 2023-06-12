import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './store';
import { Provider } from 'react-redux';

import App from './App';
import Dashboard from './Features/Dashboard/Dashboard';
import Food from './Features/Food/Food';
import AddFood from './Features/Food/AddFood';
import Exercise from './Features/Exercise/Exercise';

import SignIn from './Features/SignIn/SignIn';
import SignUp from './Features/SignUp/SignUp';

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
        path: "/add-food",
        element: <AddFood />,
      },
      {
        path: "/exercise",
        element: <Exercise />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
