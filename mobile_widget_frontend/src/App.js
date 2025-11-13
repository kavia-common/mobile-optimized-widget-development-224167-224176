import React, { useCallback, useContext, useMemo, useState } from "react";
import "./theme.css";
import "./App.css"; // Keep existing for dark mode toggle data-attr compatibility
import { Header } from "./components/Header";
import { BottomBar } from "./components/BottomBar";
import { Toast } from "./components/Toast";
import { WidgetCard } from "./components/WidgetCard";
import { Settings } from "./components/Settings";
import { AppProvider, AppContext } from "./context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { getConfig } from "./utils/config";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Health } from "./components/Health";

// PUBLIC_INTERFACE
function AppShell() {
  /** This is a public function. */
  const { theme, setTheme } = useContext(AppContext);
  const [toast, setToast] = useState("");
  const [widgetState, setWidgetState] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const onPrimary = useCallback(() => {
    setToast("Saved changes");
  }, []);

  const onSecondary = useCallback(() => {
    setToast("Action postponed");
  }, []);

  const cfg = getConfig();
  const healthPath = useMemo(() => cfg.healthPath, [cfg.healthPath]);

  const onHealth = useCallback(() => {
    navigate(healthPath);
  }, [navigate, healthPath]);

  // Focus management: move focus to main on route change
  const onMainRef = (el) => {
    if (!el) return;
    // delay to allow route content to render
    setTimeout(() => {
      try {
        el.setAttribute("tabindex", "-1");
        el.focus();
      } catch {}
    }, 0);
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <Header
        title="Ocean Widget"
        right={
          <>
            <NavLink
              to="/"
              className="segment"
              aria-label="Go to Home"
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              Home
            </NavLink>
            <NavLink
              to="/settings"
              className="segment"
              aria-label="Go to Settings"
              aria-current={location.pathname === "/settings" ? "page" : undefined}
            >
              Settings
            </NavLink>
            <button
              className="segment"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <NavLink
              to={healthPath}
              className="segment"
              aria-label="Open Health"
              aria-current={location.pathname === healthPath ? "page" : undefined}
              title={`Health (${cfg.healthPath})`}
              onClick={(e) => {
                e.preventDefault();
                onHealth();
              }}
            >
              Health
            </NavLink>
          </>
        }
      />

      <main className="main" role="main" ref={onMainRef}>
        <Routes>
          <Route path="/" element={<WidgetCard onChange={setWidgetState} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path={healthPath} element={<Health />} />
          <Route path="*" element={<div className="card"><h2>Not found</h2></div>} />
        </Routes>
      </main>

      {location.pathname === "/" && (
        <BottomBar
          onPrimary={onPrimary}
          onSecondary={onSecondary}
          primaryLabel="Save"
          secondaryLabel="Later"
        />
      )}

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
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
