import React from "react";

/**
 * PUBLIC_INTERFACE
 * PrimaryButton
 * Prominent CTA button with accessible labeling.
 */
export function PrimaryButton({ children, onClick, ariaLabel, disabled }) {
  /** This is a public function. */
  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * SecondaryButton
 * Secondary action button.
 */
export function SecondaryButton({ children, onClick, ariaLabel, disabled }) {
  /** This is a public function. */
  return (
    <button
      className="btn btn-secondary"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
