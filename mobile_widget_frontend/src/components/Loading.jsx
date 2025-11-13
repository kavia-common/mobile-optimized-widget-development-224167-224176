import React from "react";

/**
 * PUBLIC_INTERFACE
 * Skeleton
 * Simple skeleton loader block.
 */
export function Skeleton({ width = "100%", height = 16, style = {} }) {
  /** This is a public function. */
  return <span className="skeleton" style={{ width, height, ...style }} aria-hidden="true" />;
}
