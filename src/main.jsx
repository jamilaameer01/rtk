import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { blogs } from "./redux/api.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider api={blogs}>
      <App />
    </ApiProvider>
  </StrictMode>
);
