import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-11 w-full rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] px-4 py-2 text-sm text-[#151B30] placeholder:text-[#3B4D7A]/60 focus:border-[#0EA5E9] focus:bg-[#FFFFFF] focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
