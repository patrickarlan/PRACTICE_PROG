import * as React from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TimePickerProps {
  value?: string; // HH:mm or HH:mm:ss
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function TimePicker({ value = "09:00", onChange, className, disabled }: TimePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Internal state for hours, minutes, and period
  const { h24, m } = React.useMemo(() => {
    if (!value) return { h24: 9, m: 0 };
    const [h, min] = value.split(":").map(Number);
    return { h24: isNaN(h) ? 9 : h, m: isNaN(min) ? 0 : min };
  }, [value]);

  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const displayValue = value ? `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}` : "Select time";

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const h24Ref = React.useRef(h24);
  const mRef = React.useRef(m);

  React.useEffect(() => {
    h24Ref.current = h24;
    mRef.current = m;
  }, [h24, m]);

  const stopHold = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  React.useEffect(() => {
    return stopHold;
  }, [stopHold]);

  const updateTime = (newH24: number, newM: number) => {
    const h = Math.max(0, Math.min(23, newH24));
    const min = Math.max(0, Math.min(59, newM));
    h24Ref.current = h;
    mRef.current = min;
    const formatted = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    onChange?.(formatted);
  };

  const adjustHour = (amount: number) => {
    let nextH24 = h24Ref.current + amount;
    if (nextH24 > 23) nextH24 = 0;
    if (nextH24 < 0) nextH24 = 23;
    updateTime(nextH24, mRef.current);
  };

  const adjustMinute = (amount: number) => {
    let nextM = mRef.current + amount;
    if (nextM > 59) {
       nextM = 0;
       let nextH24 = h24Ref.current + 1;
       if (nextH24 > 23) nextH24 = 0;
       updateTime(nextH24, nextM);
    } else if (nextM < 0) {
       nextM = 59;
       let nextH24 = h24Ref.current - 1;
       if (nextH24 < 0) nextH24 = 23;
       updateTime(nextH24, nextM);
    } else {
       updateTime(h24Ref.current, nextM);
    }
  };

  const startHold = (action: () => void) => {
    stopHold();
    action();
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(action, 80);
    }, 400);
  };

  const setPeriod = (p: string) => {
    if (p === period) return;
    let nextH24 = h24Ref.current;
    if (p === "PM" && nextH24 < 12) nextH24 += 12;
    if (p === "AM" && nextH24 >= 12) nextH24 -= 12;
    updateTime(nextH24, mRef.current);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    let newH12 = val;
    if (newH12 < 1) newH12 = 1;
    if (newH12 > 12) newH12 = 12;
    let actual24 = newH12;
    if (period === "PM" && newH12 < 12) actual24 += 12;
    if (period === "AM" && newH12 === 12) actual24 = 0;
    updateTime(actual24, mRef.current);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    let newM = val;
    if (newM < 0) newM = 0;
    if (newM > 59) newM = 59;
    updateTime(h24Ref.current, newM);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div
          className={cn(
            "flex items-center h-8 w-full justify-start text-left font-normal px-2 gap-1.5 border border-transparent rounded-md hover:border-input focus:border-input hover:bg-muted/50 transition-colors cursor-pointer whitespace-nowrap",
            disabled && "opacity-50 cursor-default pointer-events-none",
            className
          )}
          onClick={() => { if (!disabled) setOpen(true); }}
        >
          <Clock className="size-3.5 text-muted-foreground shrink-0" />
          <div className="text-[11px] tabular-nums text-foreground/90 font-medium">
            {displayValue}
          </div>
        </div>
      </PopoverAnchor>
      <PopoverContent 
        className="w-auto p-3 bg-card border-border shadow-2xl" 
        align="center"
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent stealing focus from input when typing
      >
        <div className="flex items-center gap-2">
          {/* Hour Column */}
          <div className="flex flex-col items-center gap-1">
            <button 
              type="button"
              className="size-10 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity select-none"
              onPointerDown={(e) => { e.preventDefault(); startHold(() => adjustHour(1)); }}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
            >
              <ChevronUp className="size-5" />
            </button>
            <div className="flex items-center gap-2 border border-border rounded-md px-3 py-1.5 bg-muted/20 focus-within:border-primary focus-within:bg-card transition-colors">
              <input 
                type="text"
                className="bg-transparent text-2xl font-semibold tabular-nums w-8 text-center focus:outline-none p-0 border-none"
                value={String(h12).padStart(2, "0")}
                onChange={handleHourChange}
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <span className="text-[10px] uppercase font-bold text-muted-foreground select-none">hour</span>
            </div>
            <button 
              type="button"
              className="size-10 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity select-none"
              onPointerDown={(e) => { e.preventDefault(); startHold(() => adjustHour(-1)); }}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
            >
              <ChevronDown className="size-5" />
            </button>
          </div>

          <span className="text-2xl font-light text-muted-foreground self-center pb-1">:</span>

          {/* Minute Column */}
          <div className="flex flex-col items-center gap-1">
            <button 
              type="button"
              className="size-10 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity select-none"
              onPointerDown={(e) => { e.preventDefault(); startHold(() => adjustMinute(1)); }}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
            >
              <ChevronUp className="size-5" />
            </button>
            <div className="flex items-center gap-2 border border-border rounded-md px-3 py-1.5 bg-muted/20 focus-within:border-primary focus-within:bg-card transition-colors">
              <input 
                type="text"
                className="bg-transparent text-2xl font-semibold tabular-nums w-8 text-center focus:outline-none p-0 border-none"
                value={String(m).padStart(2, "0")}
                onChange={handleMinuteChange}
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <span className="text-[10px] uppercase font-bold text-muted-foreground select-none">min</span>
            </div>
            <button 
              type="button"
              className="size-10 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity select-none"
              onPointerDown={(e) => { e.preventDefault(); startHold(() => adjustMinute(-1)); }}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
            >
              <ChevronDown className="size-5" />
            </button>
          </div>

          {/* AM/PM Column */}
          <ToggleGroup 
            type="single" 
            value={period} 
            onValueChange={(val) => val && setPeriod(val)}
            className="flex flex-col gap-1.5 ml-2"
          >
            <ToggleGroupItem 
              value="AM" 
              className="h-8 w-12 text-[10px] font-bold border border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              AM
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="PM" 
              className="h-8 w-12 text-[10px] font-bold border border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              PM
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}

