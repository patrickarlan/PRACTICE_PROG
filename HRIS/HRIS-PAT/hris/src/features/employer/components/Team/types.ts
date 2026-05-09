// Removed unused ROLE_EMPLOYEE import

export interface Employee {
    id: string;
    email: string;
    userName: string;
    fullName?: string;
    phoneNumber?: string;
    position: string;
    department: string;
    departmentId?: number;
    employeeId?: number;
    status: string;
    roles?: string[];
    isManagement?: boolean;
    isApprover?: boolean;
    isAdmin?: boolean;
    accessLevel?: string;
    supervisorId?: string;
    supervisorName?: string;
    viewerId?: string;
    viewerName?: string;
    approvalTeamId?: number;
    substituteId?: string;
    isDeactivated?: boolean;
    approvalTeams?: { teamId: number; teamName: string; role: string }[];
}

export const ROLE_OPTIONS = [
    { id: 'SuperAdmin', name: 'SUPERADMIN' },
    { id: 'Creator', name: 'CREATOR' },
    { id: 'Approver', name: 'APPROVER' },
    { id: 'Viewer', name: 'VIEWER' }
];

export const STATUS_OPTIONS = [
    { id: 'Active', name: 'Active' },
    { id: 'On Leave', name: 'On Leave' },
];
