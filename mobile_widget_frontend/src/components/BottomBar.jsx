import React from "react";
import { PrimaryButton, SecondaryButton } from "./Buttons";

/**
 * PUBLIC_INTERFACE
 * BottomBar
 * Sticky bottom action area with primary and secondary CTAs.
 */
export function BottomBar({ onPrimary, onSecondary, primaryLabel = "Continue", secondaryLabel = "Later", disabled }) {
  /** This is a public function. */
  return (
    <div className="bottom-bar" role="contentinfo" aria-label="Actions">
      <div className="bottom-actions">
        <SecondaryButton ariaLabel={secondaryLabel} onClick={onSecondary} disabled={disabled}>
          {secondaryLabel}
        </SecondaryButton>
        <PrimaryButton ariaLabel={primaryLabel} onClick={onPrimary} disabled={disabled}>
          {primaryLabel}
        </PrimaryButton>
      </div>
    </div>
  );
}
