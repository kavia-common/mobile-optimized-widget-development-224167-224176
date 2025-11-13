import React, { useEffect, useMemo, useState } from "react";
import { getConfig } from "./utils/config";
import { Health } from "./components/Health";

function useHashRoute(defaultRoute = "home") {
  const [route, setRoute] = useState(() => (window.location.hash.replace("#", "") || defaultRoute));
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || defaultRoute);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [defaultRoute]);
  const navigate = (to) => {
    if (!to.startsWith("#")) to = `#${to}`;
    window.location.hash = to;
  };
  return [route, navigate];
}

/**
 * PUBLIC_INTERFACE
 * Router
 * Minimal hash-based router with dynamic health path support.
 */
export function Router({ children, routes }) {
  /** This is a public function. */
  const cfg = getConfig();
  const healthKey = useMemo(() => cfg.healthPath.replace(/^\//, ""), [cfg.healthPath]);
  const [route, navigate] = useHashRoute("home");

  useEffect(() => {
    // Ensure a default route
    if (!window.location.hash) {
      window.location.hash = "#home";
    }
  }, []);

  const rendered =
    route === healthKey ? (
      <Health />
    ) : routes[route] ? (
      routes[route]
    ) : (
      routes["404"] || <div className="main"><div className="card"><h2>Not found</h2></div></div>
    );

  return typeof children === "function" ? children({ route, navigate, healthKey }) : rendered;
}
