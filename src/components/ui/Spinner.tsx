import * as React from "react";

export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 h-6 w-6 ${className}`}
      {...props}
    />
  );
}
