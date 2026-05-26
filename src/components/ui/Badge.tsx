import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "blue" | "orange" | "gray";
}

export function Badge({ className = "", variant = "gray", children, ...props }: BadgeProps) {
  // Base classes for the badge
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-colors";

  // Color theme classes
  const variants = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    gray: "bg-gray-50 text-gray-600 border-gray-200",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
}
