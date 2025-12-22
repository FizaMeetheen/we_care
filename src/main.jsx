import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContext from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "black",
            color: "white",
            borderRadius: "8px",
            padding: "12px 16px"
          }
        }}
      />
      <GoogleOAuthProvider clientId="1027325624528-jpv4to5nviv888aa7d7uh5jaidq42o9b.apps.googleusercontent.com">
        <AuthContext>
          <App />
        </AuthContext>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
