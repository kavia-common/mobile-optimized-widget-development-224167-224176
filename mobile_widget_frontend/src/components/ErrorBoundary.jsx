import React from "react";
import { logger } from "../utils/logger";

/**
 * PUBLIC_INTERFACE
 * ErrorBoundary
 * React error boundary to catch render errors and display a fallback UI.
 */
export class ErrorBoundary extends React.Component {
  /** This is a public function. */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /** This is a public function. */
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  /** This is a public function. */
  componentDidCatch(error, info) {
    logger.error("UI render error", { error: String(error), info });
  }

  /** This is a public function. */
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" aria-live="assertive" style={{ padding: 16 }}>
          <div className="card">
            <h2>Something went wrong</h2>
            <p className="subtitle">Please try reloading the app.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
