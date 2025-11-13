import React, { useEffect, useState } from "react";
import { fetchSampleItems } from "../services/mockApi";
import { Skeleton } from "./Loading";

/**
 * PUBLIC_INTERFACE
 * WidgetCard
 * Card-like content with interactive elements.
 */
export function WidgetCard({ onChange }) {
  /** This is a public function. */
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [segment, setSegment] = useState("daily");
  const [items, setItems] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchSampleItems(ctrl.signal).then(setItems);
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    onChange && onChange({ name, enabled, segment });
  }, [name, enabled, segment, onChange]);

  return (
    <div className="card" role="region" aria-label="Widget">
      <h2>Widget</h2>
      <p className="subtitle">Configure your mobile widget.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label htmlFor="name" style={{ fontSize: 13, fontWeight: 600 }}>
          Name
        </label>
        <input
          id="name"
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a friendly name"
          aria-label="Widget name"
        />

        <div className="toggle" role="switch" aria-checked={enabled} aria-label="Enable widget">
          <input
            id="toggle"
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            aria-hidden="true"
          />
          <label htmlFor="toggle" className="track" aria-hidden="true">
            <span className="thumb" />
          </label>
          <span id="toggle-label" style={{ fontSize: 13 }}>{enabled ? "Enabled" : "Disabled"}</span>
        </div>

        <div role="group" aria-label="Frequency selection" className="segmented">
          {["daily","weekly","monthly"].map((opt) => (
            <button
              key={opt}
              type="button"
              className="segment"
              aria-pressed={segment === opt}
              onClick={() => setSegment(opt)}
            >
              {opt[0].toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>

        <div className="list" aria-label="Recommendations">
          {items === null ? (
            <>
              <Skeleton height={14} />
              <Skeleton height={14} />
              <Skeleton height={14} />
            </>
          ) : (
            items.map((it) => (
              <div key={it.id} className="list-item">
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(17,24,39,0.7)" }}>{it.detail}</div>
                </div>
                <button className="btn" aria-label={`Open ${it.title}`} style={{ padding: "6px 10px" }}>
                  Open
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
