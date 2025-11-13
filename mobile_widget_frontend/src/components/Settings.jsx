import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

/**
 * PUBLIC_INTERFACE
 * Settings
 * Allows toggling theme, feature flags, and experiments.
 */
export function Settings() {
  /** This is a public function. */
  const { theme, setTheme, featureFlags, setFeatureFlags, experimentsEnabled, setExperimentsEnabled } =
    useContext(AppContext);

  const flagsList = useMemo(() => Object.keys(featureFlags || {}), [featureFlags]);

  const toggleFlag = (k) => {
    setFeatureFlags((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const addFlag = () => {
    const key = prompt("Enter new feature flag key (letters, numbers, hyphens)"); // simple local prompt
    if (!key) return;
    const cleaned = key.trim().toLowerCase();
    if (!/^[a-z0-9-]+$/.test(cleaned)) return;
    setFeatureFlags((prev) => ({ ...prev, [cleaned]: true }));
  };

  return (
    <div className="main" role="region" aria-label="Settings">
      <div className="card">
        <h2>Settings</h2>
        <p className="subtitle">Personalize your experience.</p>

        <div style={{ display: "grid", gap: 12 }}>
          <div className="list-item" aria-label="Theme selector">
            <div>
              <div style={{ fontWeight: 600 }}>Theme</div>
              <div style={{ fontSize: 12, color: "rgba(17,24,39,0.7)" }}>Choose light or dark</div>
            </div>
            <select
              aria-label="Theme dropdown"
              className="input"
              style={{ width: 120 }}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="list-item" role="switch" aria-checked={experimentsEnabled} aria-label="Experiments toggle">
            <div>
              <div style={{ fontWeight: 600 }}>Experiments</div>
              <div style={{ fontSize: 12, color: "rgba(17,24,39,0.7)" }}>Enable experimental features</div>
            </div>
            <button
              type="button"
              className="segment"
              aria-pressed={experimentsEnabled}
              onClick={() => setExperimentsEnabled(!experimentsEnabled)}
            >
              {experimentsEnabled ? "On" : "Off"}
            </button>
          </div>

          <div className="card" style={{ padding: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontWeight: 700 }}>Feature Flags</div>
              <button className="btn" onClick={addFlag} aria-label="Add feature flag">
                Add
              </button>
            </div>
            {flagsList.length === 0 ? (
              <div style={{ fontSize: 13, color: "rgba(17,24,39,0.7)" }}>No flags defined.</div>
            ) : (
              <div className="list">
                {flagsList.map((k) => (
                  <div key={k} className="list-item">
                    <div>
                      <div style={{ fontWeight: 600 }}>{k}</div>
                    </div>
                    <button
                      className="segment"
                      aria-pressed={featureFlags[k]}
                      onClick={() => toggleFlag(k)}
                    >
                      {featureFlags[k] ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
