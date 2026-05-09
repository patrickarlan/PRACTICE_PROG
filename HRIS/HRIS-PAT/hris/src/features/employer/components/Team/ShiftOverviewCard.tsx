import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type ScheduleOverview = {
  shiftName: string;
  month: string[];
  weekdays: string[];
  year: string;
  startShift: string;
  endShift: string;
};

type ShiftOverviewCardProps = {
  data?: ScheduleOverview;
  isLoading?: boolean;
};

const ALL_MONTHS = [
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
];

const ALL_WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ShiftOverviewCard({ data, isLoading }: ShiftOverviewCardProps) {
  if (isLoading) {
    return <ShiftOverviewCardSkeleton />;
  }

  if (!data) {
    return (
      <div className="w-full h-full mx-auto">
        <div className="p-4">
          <div className="text-sm text-muted-foreground text-center py-6">
            No schedule created yet
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="min-w-[300px] min-h-[315px] shadow-md border-muted/40 rounded-xl m-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          {data.shiftName}
        </CardTitle>

        <Badge variant="outline" className="text-sm">
          {data.year}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 justify-between">
        {/* Months */}
        <Section
          title="Months"
          allItems={ALL_MONTHS}
          activeItems={data.month}
          className="min-h-[100px]"
        />

        {/* Weekdays */}
        <Section
          title="Weekdays"
          allItems={ALL_WEEKDAYS}
          activeItems={data.weekdays}
          className="min-h-[75px]"
        />

        {/* Time Range */}
        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
          <span className="text-sm font-medium">Shift Time</span>
          <span className="text-sm text-muted-foreground">
            {data.startShift} - {data.endShift}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ShiftOverviewCardSkeleton() {
  return (
    <Card className="min-w-[300px] min-h-[315px] shadow-md border-muted/40 rounded-xl m-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Months skeleton */}
        <div className="space-y-2 min-h-[100px]">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-wrap gap-2">
            {ALL_MONTHS.map((_, i) => (
              <Skeleton key={i} className="h-6 w-10 rounded-full" />
            ))}
          </div>
        </div>

        {/* Weekdays skeleton */}
        <div className="space-y-2 min-h-[75px]">
          <Skeleton className="h-4 w-24" />
          <div className="flex flex-wrap gap-2">
            {ALL_WEEKDAYS.map((_, i) => (
              <Skeleton key={i} className="h-6 w-10 rounded-full" />
            ))}
          </div>
        </div>

        {/* Time skeleton */}
        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

/* Reusable section for arrays */
function Section({
  title,
  allItems,
  activeItems,
  className,
}: {
  title: string;
  allItems: string[];
  activeItems: string[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="text-sm text-muted-foreground">{title}</div>

      <div className="flex flex-wrap gap-2">
        {allItems.map((item) => {
          const isActive = activeItems.includes(item);

          return (
            <Badge
              key={item}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "text-sm transition",
                !isActive && "text-muted-foreground opacity-50",
              )}
            >
              {item}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
