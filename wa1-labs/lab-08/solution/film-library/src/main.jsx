import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FilmForm from "./components/FilmForm.jsx";

const router = createBrowserRouter([
  { path: "/*", element: <App /> },
  // { path: "/films/add", element: <FilmForm /> },
  // {path: '/film/:id', component: FilmPage},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
