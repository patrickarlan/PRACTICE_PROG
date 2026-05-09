import { isToday, isYesterday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import { CheckCircle2, Clock3, FileText, RotateCcw } from 'lucide-react';

export type TimeFilter = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'thisYear' | 'allTime';

export const timeFilterLabels: Record<TimeFilter, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  thisYear: 'This Year',
  allTime: 'All Time',
};

/**
 * Filters Accomplishment Reports based on a selected time range.
 */
export const filterArsByTime = (ars: any[], timeFilter: TimeFilter) => {
  return ars.filter(ar => {
    const date = ar.date ? new Date(ar.date) : new Date(ar.createdAt);
    switch (timeFilter) {
      case 'today': return isToday(date);
      case 'yesterday': return isYesterday(date);
      case 'thisWeek': return isThisWeek(date);
      case 'thisMonth': return isThisMonth(date);
      case 'thisYear': return isThisYear(date);
      case 'allTime':
      default: return true;
    }
  });
};

/**
 * Builds the high-level metric cards for the HR dashboard.
 */
export const buildAdminStats = (dashboard: any, isLoading: boolean, navigators: any) => {
  const admin = dashboard?.admin || {};
  const teamBreakdown = admin.teamBreakdown || [];
  
  return [
    { 
      label: "AR's Submitted", 
      value: isLoading ? '-' : (admin.totalSubmitted ?? 0).toString(), 
      sub: 'Total non-draft reports', 
      icon: FileText,
      iconColor: 'text-primary',
      onClick: navigators.toAll,
      teamStats: teamBreakdown.map((t: any) => ({ name: t.teamName, count: t.submitted }))
    },
    { 
      label: "AR's Pending", 
      value: isLoading ? '-' : (admin.totalPending ?? 0).toString(), 
      sub: 'Awaiting review', 
      icon: Clock3,
      iconColor: 'text-amber-500',
      onClick: navigators.toPending,
      teamStats: teamBreakdown.map((t: any) => ({ name: t.teamName, count: t.pending }))
    },
    { 
      label: "AR's Approved", 
      value: isLoading ? '-' : (admin.totalApproved ?? 0).toString(), 
      sub: 'Fully approved reports', 
      icon: CheckCircle2,
      iconColor: 'text-emerald-500',
      onClick: navigators.toApproved,
      teamStats: teamBreakdown.map((t: any) => ({ name: t.teamName, count: t.approved }))
    },
    { 
      label: "AR's Returned", 
      value: isLoading ? '-' : (admin.totalReturned ?? 0).toString(), 
      sub: 'Returned for revision', 
      icon: RotateCcw,
      iconColor: 'text-orange-500',
      onClick: navigators.toReturned,
      teamStats: teamBreakdown.map((t: any) => ({ name: t.teamName, count: t.returned }))
    },
  ];
};

/**
 * Constructs the progress bar data for team performance visualization.
 */
export const buildProgressStats = (
  submittedArs: any[], 
  pendingArs: any[], 
  returnedArs: any[], 
  approvedArs: any[], 
  totalEmployees: number
) => {
  const total = totalEmployees > 0 ? totalEmployees : 1;
  const submittedCount = submittedArs.length;
  const subTotal = submittedCount > 0 ? submittedCount : 1;

  return [
    { label: 'Submitted', done: submittedCount, total: total, color: 'bg-primary' },
    { label: 'Pending', done: pendingArs.length, total: subTotal, color: 'bg-amber-500' },
    { label: 'Returned', done: returnedArs.length, total: subTotal, color: 'bg-orange-500' },
    { label: 'Approved', done: approvedArs.length, total: subTotal, color: 'bg-emerald-500' },
  ];
};

/**
 * Sanitizes and filters the pending actions list to remove invalid entries.
 */
export const sanitizePendingActions = (actions: any[] = []) => {
  return actions.filter((entry: { employeeName: string }) => 
    entry.employeeName !== "Unknown" && entry.employeeName !== "UNKNOWN"
  );
};
