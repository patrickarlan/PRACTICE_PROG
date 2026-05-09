/**
 * Utilities and Components for Approval Team Management
 */
import { useGetList } from 'ra-core';

export interface Approver {
    userId: string;
    userName: string;
    order: number;
}

export interface ApprovalTeamMember {
    userId: string;
    joinedAt?: string;
}

export interface ApprovalTeam {
    id: number | string;
    name: string;
    departmentId?: number;
    approvers: Approver[];
    members: ApprovalTeamMember[];
}

/**
 * Ensures approvers are always sorted by their 'order' field.
 */
export const sortApprovers = (approvers: Approver[]): Approver[] => {
    return [...approvers].sort((a, b) => a.order - b.order);
};

/**
 * Component to render the sequential flow of approver avatars.
 */
export const ApproverSequence = ({ approvers }: { approvers: Approver[] }) => {
    // Fetch employees for name lookup fallback (cached by React Admin)
    const { data: employees } = useGetList('employees', 
        { pagination: { page: 1, perPage: 1000 } },
        { enabled: !!approvers?.some(a => !a.userName) }
    );

    if (!approvers || approvers.length === 0) {
        return (
            <span className="text-[10px] uppercase font-bold text-muted-foreground/50 tracking-widest">
                No Approvers
            </span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {sortApprovers(approvers).map((approver, index) => {
                // Smart Name Lookup: Prefer record userName, fallback to employee list
                const emp = employees?.find(e => e.id === approver.userId);
                const displayName = approver.userName || emp?.fullName || emp?.userName || 'Unknown';

                const initials = displayName
                    ?.split(' ')
                    .filter(Boolean)
                    .map((n: string) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2) || '?';

                return (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className={`size-8 rounded-full border flex items-center justify-center text-[10px] font-black shadow-sm tracking-tighter cursor-help transition-all hover:scale-110 ${
                                index === 0 
                                    ? 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20' 
                                    : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
                            }`}
                            title={`${index === 0 ? 'Primary' : 'Backup'} - ${displayName}`}
                        >
                            {initials}
                        </div>
                        {index < approvers.length - 1 && (
                            <span className="text-muted-foreground/30 font-black text-lg mx-0.5">·</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

/**
 * Validates that an approval team has a name and at least one approver.
 */
export const validateApprovalTeam = (values: Partial<ApprovalTeam>) => {
    const errors: any = {};
    if (!values.name) errors.name = 'Team name is required';
    if (!values.approvers || values.approvers.length === 0) {
        errors.approvers = 'At least one approver is required';
    } else {
        const approverErrors: any[] = [];
        values.approvers.forEach((a, index) => {
            const error: any = {};
            if (!a.userId) error.userId = 'User is required';
            if (a.order === undefined || a.order === null) error.order = 'Order is required';
            if (Object.keys(error).length > 0) approverErrors[index] = error;
        });
        if (approverErrors.length > 0) errors.approvers = approverErrors;
    }
    return errors;
};
