import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import AuthPage from "./app/AuthPage.tsx";
import "./styles/index.css";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const routerBasename = base === "" ? undefined : base;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={routerBasename}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  </BrowserRouter>
);
  