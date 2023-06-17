import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from './App';
import Dashboard from './Features/Dashboard/Dashboard';
import Foods from './Features/Food/Foods';
import Exercise from './Features/Exercise/Exercise';

import SignIn from './Features/Auth/Components/SignIn/SignIn';
import SignUp from './Features/Auth/Components/SignUp/SignUp';

export const router = createBrowserRouter([
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
        path: "/foods",
        element: <Foods />,
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
