/// <reference types="vite-plugin-svgr/client" />

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "src/authentication/pages/LoginPage/LoginPage.tsx";
import JournalPage from "src/journals/pages/JournalPage";
import StreamPage from "src/stream/pages/StreamPage";
import "src/index.css";
import SignUpPage from "./authentication/pages/SignUpPage/SignUpPage";
import RootPage from "./root/pages/RootPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login/",
    element: <LoginPage />,
  },
  {
    path: "/sign-up/",
    element: <SignUpPage />,
  },
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "stream/",
        element: <StreamPage />,
      },
      {
        path: "journals/:journalId/",
        element: <JournalPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="stream/" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
