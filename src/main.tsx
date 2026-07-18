import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div style={{ padding: "2rem", fontFamily: "monospace", color: "#00ff41" }}>
          Something went wrong loading the page. Please refresh.
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
