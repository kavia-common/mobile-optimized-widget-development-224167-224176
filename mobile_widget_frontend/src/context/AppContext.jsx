import React, { createContext, useEffect, useMemo, useState } from "react";
import { getConfig } from "../utils/config";
import { logger } from "../utils/logger";

/**
 * PUBLIC_INTERFACE
 * AppContext
 * Provides app-wide state: theme, feature flags, experiments.
 */
export const AppContext = createContext({
  theme: "light",
  setTheme: () => {},
  featureFlags: {},
  setFeatureFlags: () => {},
  experimentsEnabled: false,
  setExperimentsEnabled: () => {},
});

/**
 * PUBLIC_INTERFACE
 * AppProvider
 * Context provider reading defaults from env and persisting to localStorage.
 */
export function AppProvider({ children }) {
  /** This is a public function. */
  const cfg = getConfig();
  const storedTheme = localStorage.getItem("app_theme") || "light";
  const initialFlags = parseFlags(cfg.featureFlags);
  const storedFlags = safeParse(localStorage.getItem("app_flags")) || initialFlags;
  const storedExp = localStorage.getItem("app_experiments") === "true" || cfg.experimentsEnabled;

  const [theme, setTheme] = useState(storedTheme);
  const [featureFlags, setFeatureFlags] = useState(storedFlags);
  const [experimentsEnabled, setExperimentsEnabled] = useState(storedExp);

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("app_theme", theme);
    } catch (e) {
      logger.warn("Failed to persist theme", { e: String(e) });
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("app_flags", JSON.stringify(featureFlags));
    } catch (e) {
      logger.warn("Failed to persist flags", { e: String(e) });
    }
  }, [featureFlags]);

  useEffect(() => {
    try {
      localStorage.setItem("app_experiments", String(experimentsEnabled));
    } catch (e) {
      logger.warn("Failed to persist experiments", { e: String(e) });
    }
  }, [experimentsEnabled]);

  const value = useMemo(
    () => ({ theme, setTheme, featureFlags, setFeatureFlags, experimentsEnabled, setExperimentsEnabled }),
    [theme, featureFlags, experimentsEnabled]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function parseFlags(str) {
  // comma-separated keys set to true; e.g., "beta,new-ui"
  const res = {};
  if (!str) return res;
  String(str)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((k) => (res[k] = true));
  return res;
}

function safeParse(s) {
  try {
    return JSON.parse(s || "null");
  } catch {
    return null;
  }
}
