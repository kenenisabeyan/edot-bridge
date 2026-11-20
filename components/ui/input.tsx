import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-11 w-full rounded-xl border border-[#2C344A] bg-[#0D1016] px-4 py-2 text-sm text-white placeholder:text-[#8C95A6] focus:border-[#566AF6] focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
