import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Toast
 * Temporary notification message that disappears after a timeout.
 */
export function Toast({ message, duration = 2500, onClose }) {
  /** This is a public function. */
  const [open, setOpen] = useState(Boolean(message));

  useEffect(() => {
    if (!message) return;
    setOpen(true);
    const id = setTimeout(() => {
      setOpen(false);
      onClose && onClose();
    }, duration);
    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  if (!open || !message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}
