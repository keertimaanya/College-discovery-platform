import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({
  className = "",
  children,
  hoverable = false,
  onClick,
  ...props
}: CardProps) {
  // Base card styles: white background, light gray border, subtle shadow, rounded corners
  const baseStyles =
    "bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden transition-all duration-300";

  // Hover styles: subtle lift translation and soft deep shadow on hover
  const hoverStyles = hoverable
    ? "hover:-translate-y-1 hover:shadow-md hover:border-gray-300 cursor-pointer"
    : "";

  const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`;

  return (
    <div className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
