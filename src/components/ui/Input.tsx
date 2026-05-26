import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", icon, ...props }, ref) => {
    // Input base styles: borders, transitions, heights, and deep blue focus rings
    const inputBaseStyles =
      "flex h-11 w-full rounded-lg border border-gray-300 bg-white py-2 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50";

    // Pad left specifically if a leading icon exists
    const paddingStyles = icon ? "pl-10 pr-4" : "px-4";

    const combinedInputClass = `${inputBaseStyles} ${paddingStyles} ${className}`;

    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={combinedInputClass}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
