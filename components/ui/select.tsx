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
      className={`flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300 cursor-pointer ${className || ""}`}
      {...props}
    >
      {children}
      <span className="ml-2 text-xs opacity-50">▼</span>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext);
  const displayValue = context.value && context.labels && context.labels[context.value] ? context.labels[context.value] : placeholder;
  return <span>{displayValue}</span>;
}

export function SelectContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(SelectContext);
  if (!context.open) return null;

  return (
    <div
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md animate-in fade-in-80 slide-in-from-top-1 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 w-full mt-1 ${className || ""}`}
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
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800 ${selected ? "bg-neutral-100 dark:bg-neutral-800 font-semibold" : ""} ${className || ""}`}
      {...props}
    >
      {selected && <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-xs">✓</span>}
      {children}
    </div>
  );
}
