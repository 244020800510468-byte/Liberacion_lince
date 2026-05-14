type SuccessMessageProps = {
  message: string | null | undefined;
  id?: string;
  className?: string;
  /** Panel admin: verde vivo */
  variant?: "default" | "admin";
};

export function SuccessMessage({
  message,
  id,
  className = "",
  variant = "default",
}: SuccessMessageProps) {
  if (!message) return null;
  const color =
    variant === "admin" ? "text-[#15803d]" : "text-lince-primary";
  return (
    <p id={id} role="status" className={`text-sm font-semibold ${color} ${className}`}>
      {message}
    </p>
  );
}
