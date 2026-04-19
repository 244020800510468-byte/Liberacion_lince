type SuccessMessageProps = {
  message: string | null | undefined;
  id?: string;
  className?: string;
};

export function SuccessMessage({ message, id, className = "" }: SuccessMessageProps) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="status"
      className={`text-sm font-semibold text-lince-primary ${className}`}
    >
      {message}
    </p>
  );
}
