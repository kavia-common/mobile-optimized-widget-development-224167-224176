import React from "react";

export default function AuthError() {
  return (
    <div className="main" role="region" aria-label="Auth Error">
      <div className="card">
        <h2>Authentication Error</h2>
        <p className="subtitle">We couldn't complete the authentication flow. Please try again.</p>
      </div>
    </div>
  );
}
