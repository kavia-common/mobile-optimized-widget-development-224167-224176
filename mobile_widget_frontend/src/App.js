import React, { useCallback, useContext, useState } from "react";
import "./theme.css";
import "./App.css"; // Keep existing for dark mode toggle data-attr compatibility
import { Header } from "./components/Header";
import { BottomBar } from "./components/BottomBar";
import { Toast } from "./components/Toast";
import { WidgetCard } from "./components/WidgetCard";
import { Settings } from "./components/Settings";
import { AppProvider, AppContext } from "./context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Router } from "./Router";
import { getConfig } from "./utils/config";

// PUBLIC_INTERFACE
function AppShell() {
  /** This is a public function. */
  const { theme, setTheme } = useContext(AppContext);
  const [toast, setToast] = useState("");
  const [widgetState, setWidgetState] = useState({});

  const onPrimary = useCallback(() => {
    setToast("Saved changes");
  }, []);

  const onSecondary = useCallback(() => {
    setToast("Action postponed");
  }, []);

  return (
    <Router
      routes={{}}
    >
      {({ route, navigate, healthKey }) => (
        <div className="app-shell" data-theme={theme}>
          <Header
            title="Ocean Widget"
            right={
              <>
                <button
                  className="segment"
                  aria-label="Go to Home"
                  aria-pressed={route === "home"}
                  onClick={() => navigate("#home")}
                >
                  Home
                </button>
                <button
                  className="segment"
                  aria-label="Go to Settings"
                  aria-pressed={route === "settings"}
                  onClick={() => navigate("#settings")}
                >
                  Settings
                </button>
                <button
                  className="segment"
                  aria-label="Toggle theme"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? "Dark" : "Light"}
                </button>
                <button
                  className="segment"
                  aria-label="Open Health"
                  aria-pressed={route === healthKey}
                  onClick={() => navigate(`#${healthKey}`)}
                  title={`Health (${getConfig().healthPath})`}
                >
                  Health
                </button>
              </>
            }
          />

          <main className="main" role="main">
            {route === "home" && <WidgetCard onChange={setWidgetState} />}
            {route === "settings" && <Settings />}
            {route !== "home" && route !== "settings" && route !== healthKey && (
              <div className="card"><h2>Not found</h2></div>
            )}
          </main>

          {route === "home" && (
            <BottomBar
              onPrimary={onPrimary}
              onSecondary={onSecondary}
              primaryLabel="Save"
              secondaryLabel="Later"
            />
          )}

          <Toast message={toast} onClose={() => setToast("")} />
        </div>
      )}
    </Router>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** This is a public function. */
  // Honor telemetry disabled by simply not initializing any telemetry.
  // No external services are added.
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
