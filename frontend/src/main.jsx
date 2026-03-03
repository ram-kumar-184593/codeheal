import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="547742127368-k3od2qu02jcojlshn9a30d7gojg9q13r.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
