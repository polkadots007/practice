import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
);
