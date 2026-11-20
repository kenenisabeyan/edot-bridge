"use client";

import * as React from "react";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className = "",
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex h-11 items-center justify-center rounded-xl p-1 ${className}`}
      style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #3B4D7A" }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className = "", children, style, ...props }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      type="button"
      onClick={() => context?.onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
      style={{
        backgroundColor: isActive ? "#151B30" : "transparent",
        color: isActive ? "#FFFFFF" : "#3B4D7A",
        border: "none",
        cursor: "pointer",
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className = "", children, ...props }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;

  return (
    <div
      className={`focus-visible:outline-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
