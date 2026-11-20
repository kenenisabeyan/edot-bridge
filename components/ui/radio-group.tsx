import * as React from "react";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, name, children, ...props }, ref) => {
    const defaultName = React.useId();
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange, name: name || defaultName }}>
        <div ref={ref} className={`grid gap-2 ${className || ""}`} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, style, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const checked = context.value === value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked && context.onValueChange) {
        context.onValueChange(value);
      }
    };

    return (
      <input
        type="radio"
        ref={ref}
        name={context.name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className={`aspect-square h-4 w-4 rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
        style={{
          border: `2px solid ${checked ? "#0EA5E9" : "#3B4D7A"}`,
          accentColor: "#0EA5E9",
          outline: "none",
          ...style
        }}
        {...props}
      />
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";
