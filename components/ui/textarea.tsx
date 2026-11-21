import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full rounded-xl border border-[#3B4D7A]/30 bg-[#F1F4F9] px-4 py-3 text-sm text-[#151B30] placeholder:text-[#3B4D7A]/60 focus:border-[#0EA5E9] focus:bg-[#FFFFFF] focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
