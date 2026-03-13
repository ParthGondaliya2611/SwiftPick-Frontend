import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            theme="dark"
            autoClose={1500}
          />
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </React.StrictMode>
);
