import React, { useEffect } from "react";
import { Health } from "./components/Health";
import { getConfig } from "./utils/config";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Router (Deprecated)
 * This shim preserves backward-compatibility for legacy imports.
 * It redirects to react-router-dom routes and logs a console warning.
 */
export function Router({ children }) {
  /** This is a public function. */
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.warn("Router.jsx is deprecated. The app now uses react-router-dom.");
  }, []);
  const cfg = getConfig();
  const navigate = useNavigate();
  const location = useLocation();
  const healthKey = cfg.healthPath.replace(/^\//, "");

  const route = location.pathname === "/" ? "home" :
                location.pathname === "/settings" ? "settings" :
                location.pathname.replace(/^\//, "");

  const wrappedChildren =
    typeof children === "function"
      ? children({
          route,
          // keep navigate signature similar to previous hash router
          navigate: (to) => {
            if (to.startsWith("#")) {
              const p = to.slice(1);
              if (p === "home") navigate("/");
              else if (p === "settings") navigate("/settings");
              else navigate(`/${p}`);
            } else {
              navigate(to);
            }
          },
          healthKey,
        })
      : <Health />;

  return <>{wrappedChildren}</>;
}
