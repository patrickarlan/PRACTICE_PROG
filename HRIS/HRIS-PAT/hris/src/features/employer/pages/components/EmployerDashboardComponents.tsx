import { Filter, LayoutDashboard, Clock3, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TimeFilter, timeFilterLabels } from '../utils/EmployerDashboardUTILS';

/**
 * Header component for the HR Dashboard with title and time filter.
 */
export const DashboardHeader = ({ timeFilter, setTimeFilter }: { 
    timeFilter: TimeFilter, 
    setTimeFilter: (v: TimeFilter) => void 
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-2 gap-4">
    <div className="flex items-center gap-4">
      <LayoutDashboard className="size-5 text-foreground" />
      <div>
        <h1 className="text-lg font-bold tracking-tight text-foreground">HR Administrative Dashboard</h1>
        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left">
          Real-time Insights · Team Progress · Global Monitoring
        </p>
      </div>
    </div>
    
    <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
      <SelectTrigger className="w-[180px] bg-white dark:bg-card border-border shadow-sm font-bold text-[11px] uppercase tracking-widest text-foreground hover:border-primary/40 transition-all">
        <div className="flex items-center gap-2">
          <Filter className="size-3 text-primary" />
          <SelectValue placeholder="Select timeframe" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(timeFilterLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

/**
 * Grid of metric boxes showing core AR statistics.
 */
export const StatGrid = ({ stats, isLoading }: { stats: any[], isLoading: boolean }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat) => {
      const Icon = stat.icon;
      const bgMap: Record<string, string> = {
        "text-primary": "bg-primary/5",
        "text-amber-500": "bg-amber-50",
        "text-emerald-500": "bg-emerald-50",
        "text-orange-500": "bg-orange-50"
      };
      
      return (
        <Card 
          key={stat.label} 
          className="border border-border group hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
          onClick={stat.onClick}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 group-hover:text-primary transition-colors">
              {stat.label}
            </CardTitle>
            <div className={`p-1.5 rounded-lg ${bgMap[stat.iconColor] || 'bg-muted/50'} group-hover:scale-110 transition-transform`}>
              <Icon className={`size-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="flex flex-col gap-1">
                <p className={`text-2xl font-bold ${stat.iconColor}`}>{stat.value}</p>
                
                {/* Team Breakdown Breakdown (Only show if multiple teams exist) */}
                {stat.teamStats && stat.teamStats.length > 1 && (
                  <div className="flex flex-col gap-1 mt-1 mb-2 border-t border-border/40 pt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    {stat.teamStats.map((team: any) => (
                      <div key={team.name} className="flex items-center justify-between group/item">
                        <span className="text-[9px] font-bold uppercase text-muted-foreground/60 group-hover/item:text-foreground transition-colors truncate max-w-[140px]">
                          {team.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`text-[10px] font-black ${stat.iconColor}`}>
                            {team.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest mt-1">{stat.sub}</p>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

/**
 * Progress visualization for AR submission status.
 */
export const ProgressSection = ({ progress, timeFilter }: { progress: any[], timeFilter: TimeFilter }) => (
  <Card className="border border-border">
    <CardHeader className="flex flex-col space-y-0 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-foreground">AR Submission Status</CardTitle>
          <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-tighter">Daily Performance Monitoring</p>
        </div>
        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight bg-muted/20">{timeFilterLabels[timeFilter]}</Badge>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-6">
      <TooltipProvider delayDuration={200}>
        {progress.map((item) => {
          const percent = Math.min(100, Math.round((item.done / item.total) * 100)) || 0;
          const tooltipText = item.label === 'Submitted' 
            ? "Reports sent by employees and team leads today."
            : `${item.done} out of ${progress[0].done} submitted reports are currently ${item.label.toLowerCase()}.`;

          return (
            <div key={item.label} className="flex flex-col gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between cursor-help group/item">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover/item:text-primary transition-colors">{item.label}</span>
                    <span className="text-[10px] font-bold text-foreground">
                      {item.done} / {item.total}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black text-white border-none shadow-2xl text-xs font-bold max-w-[240px] px-4 py-3 leading-snug">
                  {tooltipText}
                </TooltipContent>
              </Tooltip>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40 border border-border/10">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${item.color}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </TooltipProvider>
    </CardContent>
  </Card>
);

/**
 * List of reports requiring HR intervention.
 */
export const PendingActionsSection = ({ 
    actions, 
    isLoading, 
    onReviewAll, 
    onViewReview,
    pendingCount,
    returnedCount
}: { 
    actions: any[], 
    isLoading: boolean, 
    onReviewAll: () => void,
    onViewReview: (id: string | number) => void,
    pendingCount: number,
    returnedCount: number
}) => (
  <Card className="relative border border-border bg-card overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity duration-500">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-amber-500/15 blur-[50px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-500/10 blur-[40px]" />
    </div>

    <CardHeader className="relative z-10 flex flex-row items-center justify-between border-b bg-amber-500/[0.03] dark:bg-amber-500/[0.05] pb-4">
      <div className="flex items-center gap-2">
        <Clock3 className="size-4 text-amber-600 animate-pulse" />
        <div>
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-900/80 dark:text-amber-500/90">Pending Actions</CardTitle>
          <p className="text-[10px] uppercase font-bold text-amber-700/50 dark:text-amber-500/40 tracking-tighter">Requires HR Intervention</p>
        </div>
      </div>
      <Button 
          variant="ghost" 
          size="sm" 
          className="text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500/10 text-muted-foreground hover:text-amber-600 transition-colors"
          onClick={onReviewAll}
      >
        Review all
      </Button>
    </CardHeader>
    <CardContent className="relative z-10 pt-6">
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      ) : actions.length > 0 ? (
        <div className="flex flex-col gap-3">
          {actions.map((entry) => (
            <div 
              key={entry.id}
              className="group relative flex items-center justify-between p-3 rounded-xl border border-amber-200/50 bg-white shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all cursor-pointer active:scale-[0.98]"
              onClick={() => onViewReview(entry.id)}
            >
              <div className="flex flex-col">
                <p className="text-sm font-bold text-foreground leading-tight group-hover:text-amber-600 transition-colors uppercase tracking-tight">{entry.employeeName}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{entry.position || 'Employee'}</p>
              </div>
              
              <div className="flex items-center gap-6">
                  <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tighter">Report Date</span>
                      <span className="text-[11px] font-bold text-foreground">{entry.date}</span>
                  </div>
                  <span className={`min-w-[80px] text-center px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                    entry.status === 'Pending'
                      ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : 'bg-orange-50 text-orange-600 border-orange-200'
                  }`}>
                    {entry.status === 'Returned_Draft' ? 'Returned' : entry.status}
                  </span>
              </div>
            </div>
          ))}

          <div className="mt-2 flex items-center gap-2">
              {pendingCount > 0 && (
                  <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                      <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">{pendingCount} Pending</span>
                  </div>
              )}
              {returnedCount > 0 && (
                  <div className="px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20">
                      <span className="text-[9px] font-black text-orange-700 uppercase tracking-widest">{returnedCount} Returned</span>
                  </div>
              )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-amber-200/50 rounded-2xl bg-amber-50/30">
          <CheckCircle2 className="size-8 text-amber-300 mb-2" />
          <p className="text-xs font-bold text-amber-800/40 uppercase tracking-widest text-center">Inbox Zero · No Pending Reports</p>
        </div>
      )}
    </CardContent>
  </Card>
);
