import { getConfig } from "./config";

const levels = ["silent","error","warn","info","debug","trace"];

function shouldLog(targetLevel) {
  const cfg = getConfig();
  const current = levels.indexOf(cfg.logLevel);
  const levelIndex = levels.indexOf(targetLevel);
  if (current < 0 || levelIndex < 0) return false;
  return current >= 0 && levelIndex <= current && cfg.logLevel !== "silent";
}

/**
 * PUBLIC_INTERFACE
 * logger
 * Structured logger that respects configured log level and avoids sensitive data.
 */
export const logger = {
  /** This is a public function. */
  error: (msg, meta = {}) => {
    if (shouldLog("error")) console.error("[ERR]", msg, scrub(meta));
  },
  /** This is a public function. */
  warn: (msg, meta = {}) => {
    if (shouldLog("warn")) console.warn("[WRN]", msg, scrub(meta));
  },
  /** This is a public function. */
  info: (msg, meta = {}) => {
    if (shouldLog("info")) console.info("[INF]", msg, scrub(meta));
  },
  /** This is a public function. */
  debug: (msg, meta = {}) => {
    if (shouldLog("debug")) console.log("[DBG]", msg, scrub(meta));
  },
  /** This is a public function. */
  trace: (msg, meta = {}) => {
    if (shouldLog("trace")) console.log("[TRC]", msg, scrub(meta));
  },
};

function scrub(obj) {
  try {
    const cloned = JSON.parse(JSON.stringify(obj || {}));
    const SENSITIVE_KEYS = ["password","token","secret","authorization","creditCard","ssn"];
    const mask = (o) => {
      if (o && typeof o === "object") {
        Object.keys(o).forEach((k) => {
          if (SENSITIVE_KEYS.some((s) => k.toLowerCase().includes(s))) {
            o[k] = "***";
          } else if (typeof o[k] === "object") {
            mask(o[k]);
          }
        });
      }
    };
    mask(cloned);
    return cloned;
  } catch {
    return {};
  }
}
