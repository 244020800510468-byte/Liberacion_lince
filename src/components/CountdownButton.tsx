"use client";

import { useEffect, useState } from "react";

type CountdownButtonProps = {
  children: React.ReactNode;
  durationSec: number;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export function CountdownButton({
  children,
  durationSec,
  onClick,
  type = "button",
  disabled,
  className = "",
}: CountdownButtonProps) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = window.setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [remaining]);

  const busy = remaining > 0;
  const isDisabled = disabled || busy;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={() => {
        onClick?.();
        setRemaining(durationSec);
      }}
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-[#FAFAFA] transition disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-200 ${className}`}
    >
      {busy ? `${children} (${remaining}s)` : children}
    </button>
  );
}
