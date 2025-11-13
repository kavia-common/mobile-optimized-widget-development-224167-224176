const bool = (val) => String(val).toLowerCase() === "true";

/**
 * PUBLIC_INTERFACE
 * getConfig
 * Provides app configuration from environment variables with safe fallbacks.
 * Supabase (if used) expects:
 * - REACT_APP_SUPABASE_URL
 * - REACT_APP_SUPABASE_ANON_KEY
 * This function reads only REACT_APP_* variables and never crashes if missing.
 * It also normalizes and validates values where appropriate.
 */
export function getConfig() {
  /** This is a public function. */
  const env = {
    apiBase: process.env.REACT_APP_API_BASE || "",
    backendUrl: process.env.REACT_APP_BACKEND_URL || "",
    frontendUrl: process.env.REACT_APP_FRONTEND_URL || "",
    wsUrl: process.env.REACT_APP_WS_URL || "",
    nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
    telemetryDisabled: bool(process.env.REACT_APP_NEXT_TELEMETRY_DISABLED || "true"),
    enableSourceMaps: bool(process.env.REACT_APP_ENABLE_SOURCE_MAPS || "false"),
    port: parseInt(process.env.REACT_APP_PORT || "3000", 10),
    trustProxy: bool(process.env.REACT_APP_TRUST_PROXY || "false"),
    logLevel: (process.env.REACT_APP_LOG_LEVEL || "info").toLowerCase(),
    healthPath: process.env.REACT_APP_HEALTHCHECK_PATH || "/health",
    featureFlags: process.env.REACT_APP_FEATURE_FLAGS || "",
    experimentsEnabled: bool(process.env.REACT_APP_EXPERIMENTS_ENABLED || "false"),
  };

  const validLogLevels = ["silent","error","warn","info","debug","trace"];
  if (!validLogLevels.includes(env.logLevel)) {
    env.logLevel = "info";
  }

  // sanitize path
  if (!env.healthPath.startsWith("/")) {
    env.healthPath = `/${env.healthPath}`;
  }

  return env;
}
