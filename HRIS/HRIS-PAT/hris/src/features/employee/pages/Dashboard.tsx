import { useNavigate } from 'react-router-dom';
import { useGetIdentity, useNotify } from 'ra-core';
import { useMemo, useEffect, useState } from 'react';
import {
    FileText,
    ClipboardList,
    LayoutDashboard,
    Users,
    Filter,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    getDashboardDisplayName,
    getGreetingStatus,
    getFormattedDashboardDate,
    resolveDashboardPermissions,
    getOverviewTitle,
    getPersonalStatsConfigs,
    getAdminStatsConfigs
} from './utils/DashboardUTILS';
import { useQuery } from '@tanstack/react-query';
import { ConnectionError } from '@/components';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StatCard, ActivityTimeline, SubmissionStatusPanel, RecentReportsCard, PendingActionsCard } from './components/DashboardComponents';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
    personal: {
        approved: number;
        pending: number;
        returned: number;
        draft: number;
        totalSubmitted: number;
    };
    admin?: {
        totalEmployees: number;
        totalSubmitted: number;
        totalPending: number;
        totalApproved: number;
        totalReturned: number;
        todaySubmitted: number;
        todayPending: number;
        todayApproved: number;
        todayReturned: number;
        pendingActions: Array<{
            id: number;
            employeeName: string;
            date: string;
            status: string;
            position: string;
        }>;
    };
    recentActivity: Array<{
        id: number;
        title: string;
        date: string;
        status: string;
        actionText: string;
        approvedByName?: string;
        returnedByName?: string;
        createdAt: string;
        isModifiedByAdmin?: boolean;
    }>;
}

export const Dashboard = () => {
    const navigate = useNavigate();
    const notify = useNotify();
    const { data: user } = useGetIdentity();
    const [range, setRange] = useState('today');
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';

    const { data: dashboard, isLoading, error } = useQuery<DashboardStats>({
        queryKey: ['dashboard-stats', range],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            try {
                const url = new URL(`${API_BASE}/api/Dashboard/stats`);
                if (range !== 'all') url.searchParams.append('range', range);

                const res = await fetch(url.toString(), {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error(`Server error (${res.status})`);
                const json = await res.json();
                return json.data;
            } catch (e) {
                throw new Error('Server is unreachable. Please check your connection or try again later.');
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (error) notify(error.message, { type: 'error' });
    }, [error, notify]);

    const greetingStatus = useMemo(() => getGreetingStatus(), []);
    const permissions = useMemo(() => resolveDashboardPermissions(user), [user]);
    const personalStats = useMemo(() => getPersonalStatsConfigs(dashboard), [dashboard]);
    const adminStats = useMemo(() => getAdminStatsConfigs(dashboard), [dashboard]);

    if (error) return <ConnectionError message={error.message} />;

    const renderHeader = () => (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <greetingStatus.Icon className="size-5 text-foreground/80 shrink-0" />
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground leading-tight">
                            {greetingStatus.text}, {getDashboardDisplayName(user)}
                        </h1>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest leading-none mt-1">{getFormattedDashboardDate()}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Time Filter Dropdown - Exact Admin Copy */}
                {(permissions.isSuperAdmin || permissions.isManagement || permissions.isApprover) && (
                    <Select value={range} onValueChange={setRange}>
                        <SelectTrigger className="w-[160px] h-10 bg-white border-border/40 text-[11px] font-black uppercase tracking-widest hover:bg-muted/10 transition-all shadow-md shadow-black/5 rounded-lg ring-0 focus:ring-0">
                            <div className="flex items-center gap-3">
                                <Filter className="size-3.5 text-emerald-600 fill-emerald-600/10" />
                                <SelectValue placeholder="Filter" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="border-border/40 shadow-2xl rounded-xl p-1">
                            <SelectItem value="today" className="text-[10px] font-black uppercase tracking-widest focus:bg-primary/5 rounded-lg">Today</SelectItem>
                            <SelectItem value="week" className="text-[10px] font-black uppercase tracking-widest focus:bg-primary/5 rounded-lg">This Week</SelectItem>
                            <SelectItem value="month" className="text-[10px] font-black uppercase tracking-widest focus:bg-primary/5 rounded-lg">This Month</SelectItem>
                            <SelectItem value="all" className="text-[10px] font-black uppercase tracking-widest focus:bg-primary/5 rounded-lg">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                )}

                {permissions.showPersonalWorkspace && (
                    <>
                        <Button variant="outline" size="sm" onClick={() => navigate('/my-ar')} className="h-8 px-4">
                            <ClipboardList className="mr-2 size-4" /> All Reports
                        </Button>
                        <Button size="sm" onClick={() => navigate('/ar-create')} className="h-8 px-4">
                            <FileText className="mr-2 size-4" /> New AR
                        </Button>
                    </>
                )}
            </div>
        </div>
    );


    const showTabs = permissions.showPersonalWorkspace && permissions.showAdministrativeWorkspace;

    const PersonalWorkspace = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <LayoutDashboard className="size-4 text-primary" />
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Personal Directory</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => <StatCard key={i} stat={null} onClick={() => { }} isLoading={true} />)
                    ) : (
                        personalStats.map((stat: any) => (
                            <StatCard
                                key={stat.label}
                                stat={stat}
                                onClick={() => {
                                    const filters: any = { status: stat.filter };
                                    if (range === 'today') {
                                        filters.reportDate = new Date().toISOString().split('T')[0];
                                    }
                                    navigate(`/my-ar?filter=${encodeURIComponent(JSON.stringify(filters))}`);
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentReportsCard
                    reports={dashboard?.recentActivity || []}
                    onNavigate={(id) => navigate(`/AccomplishmentReports/${id}`)}
                    onViewAll={() => navigate('/my-ar')}
                />
                <ActivityTimeline activities={dashboard?.recentActivity || []} isLoading={isLoading} />
            </div>
        </div>
    );

    const ApprovalWorkspace = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Admin Stats Grid */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <Users className="size-4 text-primary" />
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {getOverviewTitle(permissions)}
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => <StatCard key={i} stat={null} onClick={() => { }} isLoading={true} />)
                    ) : (
                        adminStats.map((stat: any) => (
                            <StatCard
                                key={`admin-stat-${stat.label}`}
                                stat={stat}
                                onClick={() => {
                                    const filters: any = {};
                                    if (stat.filter && stat.filter !== 'all') {
                                        filters.status = stat.filter;
                                    }
                                    if (range === 'today') {
                                        filters.reportDate = new Date().toISOString().split('T')[0];
                                    }
                                    navigate(`/team-ar?filter=${encodeURIComponent(JSON.stringify(filters))}`);
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SubmissionStatusPanel
                    adminStats={dashboard?.admin}
                    totalEmployees={dashboard?.admin?.totalEmployees || 0}
                    range={range}
                />
                <PendingActionsCard
                    actions={dashboard?.admin?.pendingActions || []}
                    onReview={(id) => navigate(`/ar-reviews/${id}`)}
                    onReviewAll={() => navigate(`/team-ar?filter=${encodeURIComponent(JSON.stringify({ status: "Pending" }))}`)}
                    isVertical={false}
                />
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-500 flex flex-col gap-6">
            {renderHeader()}

            {showTabs ? (
                <Tabs defaultValue="personal" className="w-full space-y-6">
                    <TabsList className="bg-muted/50 border border-border p-1 h-11">
                        <TabsTrigger value="personal" className="gap-2 px-6">
                            <LayoutDashboard className="size-3.5" />
                            Personal Workspace
                        </TabsTrigger>
                        <TabsTrigger value="approval" className="gap-2 px-6">
                            <ClipboardList className="size-3.5" />
                            Approval Hub
                            {dashboard?.admin?.totalPending ? (
                                <Badge variant="destructive" className="ml-1 h-4 min-w-4 p-0 flex items-center justify-center text-[9px] font-bold">
                                    {dashboard.admin.totalPending}
                                </Badge>
                            ) : null}
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="mt-0 focus-visible:outline-none">
                        <PersonalWorkspace />
                    </TabsContent>
                    <TabsContent value="approval" className="mt-0 focus-visible:outline-none">
                        <ApprovalWorkspace />
                    </TabsContent>
                </Tabs>
            ) : (
                <div className="flex flex-col gap-6">
                    {permissions.showPersonalWorkspace && <PersonalWorkspace />}
                    {permissions.showAdministrativeWorkspace && <ApprovalWorkspace />}
                </div>
            )}
        </div>
    );
};


