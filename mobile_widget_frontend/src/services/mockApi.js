import { getConfig } from "../utils/config";
import { logger } from "../utils/logger";

/**
 * PUBLIC_INTERFACE
 * fetchSampleItems
 * Returns items from REACT_APP_API_BASE if configured; otherwise returns mock data.
 */
export async function fetchSampleItems(signal) {
  /** This is a public function. */
  const { apiBase } = getConfig();
  const path = "/items";
  if (apiBase) {
    try {
      const res = await fetch(safeJoin(apiBase, path), { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      logger.warn("Remote fetch failed, using mock data", { err: String(e) });
      return mockItems();
    }
  }
  return mockItems();
}

function safeJoin(base, path) {
  if (!base) return path;
  if (base.endsWith("/") && path.startsWith("/")) return base.slice(0, -1) + path;
  if (!base.endsWith("/") && !path.startsWith("/")) return `${base}/${path}`;
  return base + path;
}

function mockItems() {
  return [
    { id: "1", title: "Ocean Report", detail: "Latest stats and insights" },
    { id: "2", title: "Amber Alerts", detail: "Action items pending" },
    { id: "3", title: "System Health", detail: "All systems nominal" },
  ];
}
