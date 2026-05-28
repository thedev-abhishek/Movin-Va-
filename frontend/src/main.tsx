
  import { createRoot } from "react-dom/client";
  import { ThemeProvider } from "next-themes";
import Router from "./app/Router.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Router />
  </ThemeProvider>
);



  