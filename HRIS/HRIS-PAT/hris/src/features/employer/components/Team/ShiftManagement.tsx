"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { TimePicker } from "@/components/TimePicker";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

import { Check } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  { label: "Mon", value: "mon" },
  { label: "Tue", value: "tue" },
  { label: "Wed", value: "wed" },
  { label: "Thu", value: "thu" },
  { label: "Fri", value: "fri" },
  { label: "Sat", value: "sat" },
  { label: "Sun", value: "sun" },
];

export function ShiftManagement() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [year, setYear] = useState("2026");

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const years = Array.from({ length: 10 }, (_, i) => `${2024 + i}`);

  return (
    <div className="flex flex-col gap-8">
      {/* Months + Year */}
      <section className="space-y-3">
        <div>
          <h3 className="text-sm font-medium">Schedule Period</h3>
          <p className="text-sm text-muted-foreground">
            Select applicable months and year.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Months */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:flex-1 justify-between font-normal px-3 min-w-0"
              >
                <span className="truncate block text-left overflow-hidden">
                  {selectedMonths.length > 0
                    ? `${selectedMonths.length} month${
                        selectedMonths.length > 1 ? "s" : ""
                      } selected`
                    : "Select months"}
                </span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[320px] max-w-[90vw] p-0">
              <Command>
                <CommandGroup>
                  {months.map((month) => {
                    const isSelected = selectedMonths.includes(month);

                    return (
                      <CommandItem
                        key={month}
                        onSelect={() => {
                          setSelectedMonths((prev) =>
                            isSelected
                              ? prev.filter((m) => m !== month)
                              : [...prev, month],
                          );
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {month}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Year */}
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>

            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Time */}
      <section className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Start Time</label>

            <TimePicker value={startTime} onChange={setStartTime} />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">End Time</label>

            <TimePicker value={endTime} onChange={setEndTime} />
          </div>
        </div>
      </section>

      {/* Weekdays */}
      <section className="space-y-3">
        <div>
          <h3 className="text-sm font-medium">Repeat Days</h3>
          <p className="text-sm text-muted-foreground">
            Choose which days this shift will be repeated.
          </p>
        </div>

        <ToggleGroup
          type="multiple"
          value={selectedDays}
          onValueChange={setSelectedDays}
          className="grid grid-cols-7 gap-2 w-full"
        >
          {weekdays.map((day) => (
            <ToggleGroupItem
              key={day.value}
              value={day.value}
              className="
                h-10 rounded-md border
                text-xs sm:text-sm
                data-[state=on]:bg-primary
                data-[state=on]:text-primary-foreground
              "
            >
              {day.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 border-t pt-5">
        <Button variant="ghost">Cancel</Button>

        <Button
          onClick={() => {
            console.log({
              months: selectedMonths,
              year,
              weekdays: selectedDays,
              startTime,
              endTime,
            });
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
