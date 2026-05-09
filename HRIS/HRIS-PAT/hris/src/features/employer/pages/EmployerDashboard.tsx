import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetList, useNotify } from 'ra-core';
import { useQuery } from '@tanstack/react-query';
import { LayoutDashboard, LayoutGrid } from 'lucide-react';
import { ConnectionError } from '@/components';
import { 
  TimeFilter, 
  filterArsByTime, 
  buildAdminStats, 
  buildProgressStats, 
  sanitizePendingActions 
} from './utils/EmployerDashboardUTILS';
import { 
  DashboardHeader, 
  StatGrid, 
  ProgressSection, 
  PendingActionsSection 
} from './components/EmployerDashboardComponents';

export const EmployerDashboard = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');

  const { total: totalEmployees = 0, isPending: employeesLoading } = useGetList('employees', {
    pagination: { page: 1, perPage: 1 },
    filter: { role: 'Submitters', status: 'Active' }
  });

  const { data: ars = [], isPending: arsLoading } = useGetList('AccomplishmentReports', {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'createdAt', order: 'DESC' },
  });

  // Derived filtered data
  const filteredArs = useMemo(() => filterArsByTime(ars, timeFilter), [ars, timeFilter]);
  const pendingArs = useMemo(() => filteredArs.filter(ar => ar.status === 'Pending'), [filteredArs]);
  const approvedArs = useMemo(() => filteredArs.filter(ar => ar.status === 'Approved'), [filteredArs]);
  const returnedArs = useMemo(() => filteredArs.filter(ar => ar.status === 'Returned' || ar.status === 'Returned_Draft'), [filteredArs]);
  const submittedArs = useMemo(() => filteredArs.filter(ar => ar.status !== 'Draft'), [filteredArs]);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';

  const { data: dashboard, isLoading: dashboardLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${API_BASE}/api/Dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`Server error (${res.status})`);
        const json = await res.json();
        return json.data;
      } catch (err: any) {
        throw new Error(err.message || 'Server is unreachable.');
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (error) notify(error.message, { type: 'error' });
  }, [error, notify]);

  // Navigation Helpers
  // Navigation Helpers with Time Filter support
  const getFilterParams = (status: string) => {
    const filters: any = {};
    if (status && status !== 'all') {
      filters.status = status;
    }
    if (timeFilter === 'today') {
      filters.reportDate = new Date().toISOString().split('T')[0];
    } else if (timeFilter === 'yesterday') {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      filters.reportDate = d.toISOString().split('T')[0];
    }
    return `filter=${encodeURIComponent(JSON.stringify(filters))}`;
  };

  const navigators = {
    toAll: () => navigate(`/team-ar?${getFilterParams('all')}`),
    toPending: () => navigate(`/team-ar?${getFilterParams('Pending')}`),
    toApproved: () => navigate(`/team-ar?${getFilterParams('Approved')}`),
    toReturned: () => navigate(`/team-ar?${getFilterParams('Returned')}`),
  };

  const stats = useMemo(() => 
    buildAdminStats(dashboard, dashboardLoading || arsLoading, navigators), 
    [dashboard, dashboardLoading, arsLoading]
  );

  const progress = useMemo(() => 
    buildProgressStats(submittedArs, pendingArs, returnedArs, approvedArs, totalEmployees),
    [submittedArs, pendingArs, returnedArs, approvedArs, totalEmployees]
  );

  const pendingActions = useMemo(() => 
    sanitizePendingActions(dashboard?.admin?.pendingActions),
    [dashboard]
  );

  if (error) {
    return <ConnectionError message={error.message} icon={LayoutDashboard} />;
  }

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-6">
      <DashboardHeader 
        timeFilter={timeFilter} 
        setTimeFilter={setTimeFilter} 
      />

      <div className="flex items-center gap-2 mt-4 px-1">
        <LayoutGrid className="size-4 text-emerald-600" />
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
          Management
        </h2>
      </div>

      <StatGrid 
        stats={stats} 
        isLoading={dashboardLoading || employeesLoading || arsLoading} 
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProgressSection 
          progress={progress} 
          timeFilter={timeFilter} 
        />

        <PendingActionsSection 
          actions={pendingActions}
          isLoading={dashboardLoading || employeesLoading}
          onReviewAll={() => navigate(`/team-ar?${getFilterParams('Pending')}`)}
          onViewReview={(id) => navigate('/ar-reviews/' + id)}
          pendingCount={pendingArs.length}
          returnedCount={returnedArs.length}
        />
      </div>
    </div>
  );
};
