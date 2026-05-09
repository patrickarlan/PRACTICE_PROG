import {
    ChevronRight,
    FileText,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

/**
 * A reusable statistical card component for the dashboard.
 */
export const StatCard = ({ stat, onClick, isLoading = false }: { stat: any, onClick: () => void, isLoading?: boolean }) => {
    if (isLoading) {
        return (
            <Card className="border border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="size-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-16 mb-1" />
                    <Skeleton className="h-3 w-32" />
                </CardContent>
            </Card>
        );
    }

    const Icon = stat.icon;
    return (
        <Card
            className="border border-border group hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
            onClick={onClick}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 group-hover:text-primary transition-colors">
                    {stat.label}
                </CardTitle>
                <div className={`p-1.5 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`size-4 ${stat.color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest mt-1">{stat.subtitle}</p>
            </CardContent>
        </Card>
    );
};

/**
 * An oval-shaped quick action panel for Team Leads.
 */
export const QuickActionOval = ({ stat, onClick }: { stat: any, onClick: () => void }) => {
    const Icon = stat.icon;
    return (
        <div
            onClick={onClick}
            className="group relative flex items-center gap-4 p-2 pr-6 rounded-full border border-border bg-card hover:bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98]"
        >
            <div className={cn(
                "flex items-center justify-center size-10 rounded-full shrink-0 transition-all duration-500 group-hover:rotate-[360deg]",
                stat.bg
            )}>
                <Icon className={cn("size-5", stat.color)} />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/70 truncate leading-tight group-hover:text-primary transition-colors">
                    {stat.label}
                </span>
                <div className="flex items-baseline gap-1.5">
                    <span className={cn("text-lg font-black leading-none tracking-tight", stat.color)}>
                        {stat.value}
                    </span>
                    <span className="text-[8px] font-bold text-muted-foreground/40 uppercase truncate">
                        {stat.subtitle}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center size-6 rounded-full bg-muted/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <ChevronRight className="size-3 text-muted-foreground" />
            </div>
        </div>
    );
};

/**
 * A vertical timeline component for recent activities.
 */
export const ActivityTimeline = ({ activities, isLoading }: { activities: any[], isLoading: boolean }) => {
    return (
        <Card className="border border-border min-h-[400px] flex flex-col">
            <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="relative flex flex-col gap-6">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <Skeleton className="size-3 rounded-full" />
                                    {idx < 2 && <div className="w-0.5 h-8 bg-border mt-2" />}
                                </div>
                                <div className="pt-0.5 flex flex-col gap-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        ))
                    ) : activities.length ? (
                        activities.slice(0, 5).map((item, idx) => {
                            const isApproved = item.status === 'Approved';
                            const isReturned = item.status === 'Returned' || item.status === 'Returned_Draft';

                            return (
                                <div key={`timeline-${item.id}`} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "size-3 rounded-full border-2",
                                            isApproved ? 'bg-emerald-500 border-emerald-500' :
                                                isReturned ? 'bg-orange-500 border-orange-500' :
                                                    'bg-background border-muted-foreground'
                                        )} />
                                        {idx < Math.min(activities.length, 5) - 1 && <div className="w-0.5 h-8 bg-border mt-2" />}
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-sm font-medium text-foreground leading-tight">{item.actionText}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-sm text-muted-foreground text-center py-4">
                            No recent activity
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * A panel showing the daily AR submission status with progress bars.
 */
export const SubmissionStatusPanel = ({ 
    adminStats, 
    totalEmployees,
    className,
    range = 'today'
}: { 
    adminStats: any, 
    totalEmployees: number,
    className?: string,
    range?: string
}) => {
    const isToday = range === 'today';
    const rangeLabel = range === 'all' ? 'All Time' : range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'Today';

    if (!adminStats) {
        return (
            <Card className={cn("border border-border overflow-hidden", className)}>
                <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 pb-4">
                    <div className="flex flex-col gap-0.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48 mt-1" />
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 pt-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-8" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn("border border-border overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 pb-4">
                <div className="flex flex-col gap-0.5">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">AR Submission Status</CardTitle>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">
                        {isToday ? 'Daily performance monitoring' : `${rangeLabel} oversight`}
                    </p>
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest h-5">{rangeLabel}</Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-6">
                <TooltipProvider delayDuration={200}>
                    {[
                        { label: 'Submitted', done: adminStats.totalSubmitted || 0, total: totalEmployees || 1, color: 'bg-primary' },
                        { label: 'Pending', done: adminStats.totalPending || 0, total: adminStats.totalSubmitted || 1, color: 'bg-amber-500' },
                        { label: 'Returned', done: adminStats.totalReturned || 0, total: adminStats.totalSubmitted || 1, color: 'bg-orange-500' },
                        { label: 'Approved', done: adminStats.totalApproved || 0, total: adminStats.totalSubmitted || 1, color: 'bg-emerald-500' },
                    ].map((item) => {
                        const percent = Math.min(100, Math.round((item.done / item.total) * 100)) || 0;
                        const tooltipText = item.label === 'Submitted'
                            ? "Reports sent by staff members today."
                            : `${item.done} out of ${adminStats.totalSubmitted || 0} submitted reports are currently ${item.label.toLowerCase()}.`;

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
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50 border border-border/50">
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
};

/**
 * A card displaying the user's most recent reports.
 */
export const RecentReportsCard = ({ reports, onNavigate, onViewAll }: { reports: any[], onNavigate: (id: number) => void, onViewAll: () => void }) => {
    return (
        <Card className="border border-border min-h-[400px] flex flex-col flex-1 shadow-sm">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Recent Reports</CardTitle>
                <Button variant="ghost" size="sm" onClick={onViewAll} className="h-8 text-[10px] font-bold uppercase tracking-widest">View all →</Button>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex flex-col gap-3">
                    {reports.length ? (
                        reports.slice(0, 5).map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => onNavigate(item.id)}>
                                <div>
                                    <p className="text-sm font-bold">{item.title}</p>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{item.date}</p>
                                </div>
                                <Badge variant="outline" className={cn("font-bold text-[10px] uppercase tracking-wider", item.status === 'Approved' && "bg-emerald-50 text-emerald-600 border-emerald-200")}>
                                    {item.status}
                                </Badge>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <FileText className="size-8 text-muted-foreground mb-3 opacity-20" />
                            <p className="text-sm font-medium text-muted-foreground">No reports found</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * A card displaying team actions that require administrative review.
 * Synchronized with the high-end Employer Dashboard design.
 */
import { Clock3, CheckCircle2 } from 'lucide-react';

export const PendingActionsCard = ({
    actions,
    onReview,
    onReviewAll,
    isVertical = false
}: {
    actions: any[],
    onReview: (id: number) => void,
    onReviewAll: () => void,
    isVertical?: boolean
}) => {
    const pendingCount = actions.filter(a => a.status === 'Pending').length;
    const returnedCount = actions.filter(a => a.status === 'Returned' || a.status === 'Returned_Draft').length;

    return (
        <Card className={cn(
            "relative border border-border bg-card overflow-hidden group hover:border-amber-500/30 transition-all duration-500",
            isVertical && "flex-1"
        )}>
            {/* Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-amber-500/15 blur-[50px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-500/10 blur-[40px]" />
            </div>

            <CardHeader className="relative z-10 flex flex-row items-center justify-between border-b bg-amber-500/[0.03] dark:bg-amber-500/[0.05] pb-4">
                <div className="flex items-center gap-2">
                    <Clock3 className="size-4 text-amber-600 animate-pulse" />
                    <div>
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-900/80 dark:text-amber-500/90">Pending Actions</CardTitle>
                        <p className="text-[10px] uppercase font-bold text-amber-700/50 dark:text-amber-500/40 tracking-tighter leading-none mt-0.5">Requires HR Intervention</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500/10 text-muted-foreground hover:text-amber-600 transition-colors h-8"
                    onClick={onReviewAll}
                >
                    Review all
                </Button>
            </CardHeader>
            <CardContent className="relative z-10 pt-6 flex flex-col gap-4 flex-1">
                {actions.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {actions.slice(0, 5).map((entry) => (
                            <div
                                key={entry.id}
                                className="group relative flex items-center justify-between p-3 rounded-xl border border-amber-200/50 bg-white shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all cursor-pointer active:scale-[0.98]"
                                onClick={() => onReview(entry.id)}
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
                                    <span className={`min-w-[80px] text-center px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${entry.status === 'Pending'
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
};
