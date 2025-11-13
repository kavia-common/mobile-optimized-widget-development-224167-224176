import React from "react";
import { getConfig } from "../utils/config";

/**
 * PUBLIC_INTERFACE
 * Health
 * Simple health status component showing minimal app info.
 */
export function Health() {
  /** This is a public function. */
  const cfg = getConfig();
  return (
    <div className="main" role="region" aria-label="Health">
      <div className="card">
        <h2>Health</h2>
        <p className="subtitle">Status: OK</p>
        <div style={{ fontSize: 13, display: "grid", gap: 6 }}>
          <div><strong>Env:</strong> {cfg.nodeEnv}</div>
          <div><strong>API Base:</strong> {cfg.apiBase || "(mock)"}</div>
          <div><strong>Log Level:</strong> {cfg.logLevel}</div>
          <div><strong>Experiments:</strong> {String(cfg.experimentsEnabled)}</div>
        </div>
      </div>
    </div>
  );
}
