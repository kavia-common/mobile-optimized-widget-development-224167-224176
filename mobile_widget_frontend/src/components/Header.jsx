import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header
 * Fixed header with app title and optional actions (e.g., navigation).
 */
export function Header({ title, right }) {
  /** This is a public function. */
  return (
    <header className="header" role="banner">
      <div className="header-inner" aria-label="Application Header">
        <div className="header-logo" aria-hidden="true" />
        <div className="header-title" aria-label="App title">
          {title}
        </div>
        <div className="header-actions" aria-label="Header actions">
          {right}
        </div>
      </div>
    </header>
  );
}
