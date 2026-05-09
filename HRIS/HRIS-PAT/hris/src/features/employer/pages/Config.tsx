import { Plus, Settings2 } from "lucide-react";
import { ConfigManagement } from "../components/Team";
import { ShiftManagement } from "../components/Team/ShiftManagement";
import { ShiftOverviewCard } from "../components/Team/ShiftOverviewCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Config = () => {
  const isLoading = false; // Simulate loading state
  const schedules = [
    {
      shiftName: "Morning Shift",
      month: ["Jan", "Feb", "Mar"],
      weekdays: ["Mon", "Tue", "Wed"],
      year: "2026",
      startShift: "8:00 AM",
      endShift: "5:00 PM",
    },
    {
      shiftName: "Morning Shift",
      month: ["Apr", "May"],
      weekdays: ["Thu", "Fri"],
      year: "2026",
      startShift: "9:00 AM",
      endShift: "6:00 PM",
    },
    {
      shiftName: "Afternoon Shift",
      month: ["Jun", "Jul", "Aug"],
      weekdays: ["Mon", "Wed", "Fri"],
      year: "2026",
      startShift: "7:00 AM",
      endShift: "3:00 PM",
    },
    {
      shiftName: "Morning Shift",
      month: ["Sep", "Oct"],
      weekdays: ["Tue", "Thu"],
      year: "2026",
      startShift: "10:00 AM",
      endShift: "7:00 PM",
    },
    {
      shiftName: "Morning Shift",
      month: ["Nov"],
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      year: "2026",
      startShift: "8:30 AM",
      endShift: "4:30 PM",
    },
    {
      shiftName: "Full Shift",
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      year: "2026",
      startShift: "6:00 AM",
      endShift: "2:00 PM",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-2 gap-4">
        <div className="flex items-center gap-4">
          <Settings2 className="h-5 w-5 text-foreground" />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              System Configuration
            </h1>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left">
              Organizational Structure · Positions · Departments
            </p>
          </div>
        </div>
      </div>

      <ConfigManagement />

      {/* ---------------------Shift Management Overview--------------------- */}
      <div className=" w-full">
        <Card className="h-full flex overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4 shrink-0">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold tracking-tight">
                Employee Shift Schedule
              </CardTitle>

              {/* Optional description */}
              {/* 
              <CardDescription>
                View and manage employee shift coverage
              </CardDescription> */}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <DialogHeader className="border-b px-6 py-4">
                  <DialogTitle className="text-lg font-semibold">
                    Create Shift Schedule
                  </DialogTitle>
                </DialogHeader>

                <div className="px-6 py-5">
                  <ShiftManagement />
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="flex gap-2">
                {isLoading
                  ? Array.from({ length: 5 }).map((_) => (
                    <ShiftOverviewCard isLoading={true} />
                  ))
                  : schedules.map((schedule, index) => (
                    <ShiftOverviewCard key={index} data={schedule} />
                  ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
