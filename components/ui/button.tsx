import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    
    const variants = {
      default: "bg-white text-neutral-900 hover:bg-neutral-100 font-semibold shadow-sm transition-colors",
      outline: "border border-[#2C344A] bg-[#161B26] text-white hover:bg-[#202738] hover:text-white transition-colors",
      ghost: "text-[#8C95A6] hover:bg-[#1C202C] hover:text-white transition-colors",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`;

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: `${classes} ${child.props.className || ""}`,
        ref,
        ...props,
        children: child.props.children,
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
