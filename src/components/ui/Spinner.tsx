import * as React from "react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className = "", size = "md", ...props }: SpinnerProps) {
  // Base classes for the circular loader
  const baseStyles = "animate-spin rounded-full border-solid border-t-transparent shrink-0";

  // Size mapping
  const sizes = {
    sm: "h-4 w-4 border-2 border-blue-600",
    md: "h-8 w-8 border-3 border-blue-600",
    lg: "h-12 w-12 border-4 border-blue-600",
  };

  const combinedClassName = `${baseStyles} ${sizes[size]} ${className}`;

  return (
    <div
      role="status"
      className={combinedClassName}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
