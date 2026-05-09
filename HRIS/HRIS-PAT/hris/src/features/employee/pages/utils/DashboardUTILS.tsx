import {
    Sunrise,
    Sun,
    Moon,
    FileText,
    Clock,
    RotateCcw,
    ClipboardList
} from 'lucide-react';
import {
    ROLE_SUPER_ADMIN,
    ROLE_APPROVER,
    ROLE_VIEWER,
    ROLE_EMPLOYEE
} from "@/auth/roles";

/**
 * DashboardUTILS.tsx
 * 
 * Centralized logic for the Employee Dashboard.
 * Handles permissions, greetings, and role-based visibility guards.
 */

/**
 * Resolves the user's display name from their profile or identity, stripping email domains if necessary.
 * 
 * @param user - The user object containing full name or username.
 * @returns A formatted display name.
 */
export const getDashboardDisplayName = (user: any): string => {
    const name = user?.fullName || 'User';
    return name.includes('@') ? name.split('@')[0] : name;
};

/**
 * Generates a time-based greeting status with an associated Lucide icon.
 * 
 * @returns An object containing the greeting text and the corresponding Icon component.
 */
export const getGreetingStatus = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', Icon: Sunrise };
    if (hour < 18) return { text: 'Good afternoon', Icon: Sun };
    return { text: 'Good evening', Icon: Moon };
};

/**
 * Formats the current date for the dashboard header in a verbose format (e.g., Monday, May 1, 2026).
 * 
 * @returns A formatted date string.
 */
export const getFormattedDashboardDate = (): string => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Resolves granular dashboard permissions and visibility guards based on user roles and identity claims.
 * Logic splits the workspace into 'Personal' and 'Administrative' visibility flags.
 * 
 * @param user - The current authenticated user's identity/claims.
 * @returns A permission object containing boolean flags for roles and workspace visibility.
 */
export const resolveDashboardPermissions = (user: any) => {
    const identity = user as any;
    const roles = identity?.roles || [];

    const isSuperAdmin = roles.includes(ROLE_SUPER_ADMIN);
    const isApprover = roles.includes(ROLE_APPROVER);
    const isViewer = roles.includes(ROLE_VIEWER);
    const isEmployee = roles.includes(ROLE_EMPLOYEE) || (!isSuperAdmin && !isApprover && !isViewer);

    // Helper flags
    const isManagement = isViewer || isSuperAdmin; // Management visibility usually includes Admin
    const isMiddleManagement = isApprover && isViewer;
    const isTeamLead = isApprover && !isViewer && !isSuperAdmin;
    const isStandardUser = isEmployee && !isApprover && !isViewer && !isSuperAdmin;

    return {
        isApprover,
        isViewer,
        isManagement,
        isSuperAdmin,
        isMiddleManagement,
        isTeamLead,
        isStandardUser,
        // Visibility Guards
        // Personal workspace is hidden for SuperAdmin and Viewer
        showPersonalWorkspace: !isSuperAdmin && !isViewer,
        showAdministrativeWorkspace: isSuperAdmin || isApprover || isViewer
    };
};

/**
 * Resolves the appropriate title for the team overview section based on the user's highest resolved permission level.
 * 
 * @param permissions - The resolved permission flags from resolveDashboardPermissions.
 * @returns A descriptive section title.
 */
export const getOverviewTitle = (permissions: any): string => {
    if (permissions.isSuperAdmin) return "Super Admin Oversight";
    if (permissions.isMiddleManagement) return "Management Approval Hub";
    if (permissions.isManagement) return "Project Manager";
    return "Team Overview";
};

/**
 * Maps personal accomplishment report statistics to UI configuration objects.
 * 
 * @param dashboard - The raw dashboard statistics from the API.
 * @returns A collection of stat configuration objects.
 */
export const getPersonalStatsConfigs = (dashboard: any) => {
    if (!dashboard?.personal) return [];
    return [
        {
            label: "My Reports",
            value: dashboard.personal.totalSubmitted,
            subtitle: 'Total accomplishments',
            icon: FileText,
            color: 'text-primary',
            bg: 'bg-primary/5',
            filter: 'Pending,Approved,Returned'
        },
        {
            label: "My Pending",
            value: dashboard.personal.pending,
            subtitle: 'Awaiting review',
            icon: Clock,
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            filter: 'Pending'
        },
        {
            label: "My Returned",
            value: dashboard.personal.returned,
            subtitle: 'Action required',
            icon: RotateCcw,
            color: 'text-rose-500',
            bg: 'bg-rose-50',
            filter: 'Returned'
        },
        {
            label: "My Drafts",
            value: dashboard.personal.draft,
            subtitle: 'Unsubmitted',
            icon: ClipboardList,
            color: 'text-muted-foreground',
            bg: 'bg-muted/50',
            filter: 'Draft'
        },
    ];
};

/**
 * Maps administrative/global accomplishment report statistics to UI configuration objects.
 * 
 * @param dashboard - The raw dashboard statistics from the API.
 * @returns A collection of administrative stat configuration objects.
 */
export const getAdminStatsConfigs = (dashboard: any) => {
    if (!dashboard?.admin) return [];
    return [
        {
            label: "AR's Submitted",
            value: dashboard.admin.totalSubmitted,
            subtitle: 'Total non-draft reports',
            icon: FileText,
            color: 'text-primary',
            bg: 'bg-primary/5',
            filter: 'all'
        },
        {
            label: "AR's Pending",
            value: dashboard.admin.totalPending,
            subtitle: 'Awaiting review',
            icon: Clock,
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            filter: 'Pending'
        },
        {
            label: "AR's Approved",
            value: dashboard.admin.totalApproved,
            subtitle: 'Fully approved reports',
            icon: ClipboardList,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
            filter: 'Approved'
        },
        {
            label: "AR's Returned",
            value: dashboard.admin.totalReturned,
            subtitle: 'Returned for revision',
            icon: RotateCcw,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            filter: 'Returned'
        },
    ];
};
