
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./app/components/ThemeProvider";
import Router from "./app/Router.tsx";
import "./styles/index.css";


createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Router />
  </ThemeProvider>
);




  