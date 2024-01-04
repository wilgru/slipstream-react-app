/// <reference types="vite-plugin-svgr/client" />
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "src/authentication/pages/LoginPage/LoginPage.tsx";
import { ContextProvider } from "src/common/context/ContextProvider";
import HomePage from "src/home/pages/homePage.tsx";
import "src/index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ContextProvider>
        <HomePage />
      </ContextProvider>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
