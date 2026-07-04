import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { ChatProvider } from "./context/ChatContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <App />
        <Toaster position="top-right" />
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);