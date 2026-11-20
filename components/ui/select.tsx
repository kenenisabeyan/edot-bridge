import * as React from "react";

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  labels?: Record<string, string>;
  registerLabel?: (value: string, label: string) => void;
}

const SelectContext = React.createContext<SelectContextValue>({});

export function Select({ value, onValueChange, children }: { value?: string; onValueChange?: (value: string) => void; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [labels, setLabels] = React.useState<Record<string, string>>({});

  const registerLabel = React.useCallback((val: string, label: string) => {
    setLabels(prev => {
      if (prev[val] === label) return prev;
      return { ...prev, [val]: label };
    });
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, labels, registerLabel }}>
      <div ref={ref} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => context.setOpen?.(!context.open)}
      className={`flex h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      style={{
        backgroundColor: "#F1F4F9",
        border: `1.5px solid ${context.open ? "#0EA5E9" : "#3B4D7A"}`,
        color: "#151B30"
      }}
      {...props}
    >
      {children}
      <span
        style={{
          marginLeft: 8, fontSize: 11, color: "#3B4D7A",
          transform: context.open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s"
        }}
      >
        ▼
      </span>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext);
  const displayValue = context.value && context.labels && context.labels[context.value] ? context.labels[context.value] : placeholder;
  return (
    <span style={{ color: displayValue === placeholder ? "#3B4D7A" : "#151B30" }}>
      {displayValue}
    </span>
  );
}

export function SelectContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(SelectContext);
  if (!context.open) return null;

  return (
    <div
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-xl shadow-lg w-full mt-1 ${className || ""}`}
      style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #3B4D7A" }}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

export function SelectItem({ className, value, children, ...props }: { value: string } & React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(SelectContext);
  const selected = context.value === value;

  React.useEffect(() => {
    if (context.registerLabel && typeof children === "string") {
      context.registerLabel(value, children);
    }
  }, [value, children, context.registerLabel]);

  const handleClick = () => {
    if (context.onValueChange) {
      context.onValueChange(value);
    }
    context.setOpen?.(false);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-8 pr-3 text-sm outline-none transition-colors ${className || ""}`}
      style={{
        backgroundColor: selected ? "#F1F4F9" : "transparent",
        color: selected ? "#151B30" : "#151B30",
        fontWeight: selected ? 700 : 400
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F1F4F9"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = selected ? "#F1F4F9" : "transparent"; }}
      {...props}
    >
      {selected && (
        <span
          className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-xs"
          style={{ color: "#0EA5E9" }}
        >
          ✓
        </span>
      )}
      {children}
    </div>
  );
}
