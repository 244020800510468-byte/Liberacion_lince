type ErrorMessageProps = {
  message: string | null | undefined;
  id?: string;
  className?: string;
};

export function ErrorMessage({ message, id, className = "" }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className={`text-sm font-medium text-[#EF4444] ${className}`}
    >
      {message}
    </p>
  );
}
