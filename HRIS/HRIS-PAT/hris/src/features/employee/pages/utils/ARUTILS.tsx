import { AccomplishmentRow, getFirstName, calcOverlapMinutes } from '../../components/ARForm/index';

/**
 * ARUTILS.tsx
 * 
 * Shared utility functions for Accomplishment Report features (Create/Edit).
 */

/**
 * Validates the entire Accomplishment Report form.
 * Ensures required fields (date, title, rows) are filled and checks for time overlaps between tasks.
 * 
 * @param reportDate - The ISO date string of the report.
 * @param reportTitle - The title string of the report.
 * @param rows - The collection of task rows to validate.
 * @returns An object containing validity status and an optional error message.
 */
export const validateARForm = (
    reportDate: string,
    reportTitle: string,
    rows: AccomplishmentRow[],
    breakStart?: string,
    breakEnd?: string
): { isValid: boolean; error?: string } => {
    // 1. Basic Field Validation
    const hasBasicFields = !!reportDate && !!reportTitle && rows.length > 0;
    if (!hasBasicFields) return { isValid: false, error: 'Please fill in all required fields marked in red.' };

    const rowsValid = rows.every(r => 
        r.account && r.task && r.start && r.end && r.hours > 0
    );
    if (!rowsValid) return { isValid: false, error: 'Please fill in all required fields marked in red.' };

    // 2. Break Validation (Required)
    if (!breakStart || !breakEnd) {
        return { isValid: false, error: 'Break time is required. Please set your lunch/break period.' };
    }

    // 3. 8-Hour Validation (Net Task Hours, excluding break overlaps)
    const totalRawTaskHours = rows.reduce((sum, row) => sum + row.hours, 0);
    let totalBreakOverlapMinutes = 0;
    if (breakStart && breakEnd) {
        rows.forEach(r => {
            if (r.start && r.end) {
                totalBreakOverlapMinutes += calcOverlapMinutes(breakStart, breakEnd, r.start, r.end);
            }
        });
    }
    const netWorkedHours = totalRawTaskHours - (totalBreakOverlapMinutes / 60);

    if (netWorkedHours < 7.999) { // Using a small tolerance for floating point
        return { 
            isValid: false, 
            error: `Total worked hours must be at least 8.0 hours. Current net total: ${netWorkedHours.toFixed(2)} hours (Break time deducted from overlapping tasks).` 
        };
    }

    // 4. Overlap Validation
    for (let i = 0; i < rows.length; i++) {
        for (let j = i + 1; j < rows.length; j++) {
            if (rows[i].start && rows[i].end && rows[j].start && rows[j].end) {
                if (calcOverlapMinutes(rows[i].start, rows[i].end, rows[j].start, rows[j].end) > 0) {
                    return { 
                        isValid: false, 
                        error: 'Some tasks overlap with each other. Please correct the time windows before submitting.' 
                    };
                }
            }
        }
    }

    return { isValid: true };
};

/**
 * Resolves the appropriate reviewer fallback based on department hierarchy and permissions.
 * Priority: Dept Approver -> Middle Management (Approver + Management) -> Super Admin.
 * 
 * @param rolesMap - The map of users categorized by their roles.
 * @param identity - The identity of the user submitting the report.
 * @returns The resolved reviewer user object or null.
 */
export const resolveFallbackReviewer = (rolesMap: any, identity: any) => {
    if (!rolesMap || !identity) return null;

    const userDept = (identity.department || '').trim().toLowerCase();

    // 1. Dept Approver only (no Viewer role) in same dept
    const deptApprovers = (rolesMap.Approver || []).filter((u: any) => {
        const approverDept = (u.department || '').trim().toLowerCase();
        return approverDept === userDept && u.id !== identity.id && approverDept !== 'viewer';
    });
    if (deptApprovers.length > 0) return deptApprovers[0];

    // 2. Middle Management (must have BOTH Approver + Viewer roles)
    const middleMgmt = (rolesMap.Viewer || []).filter((u: any) => {
        const isApprover = (rolesMap.Approver || []).some((a: any) => a.id === u.id);
        return isApprover && u.id !== identity.id;
    });
    if (middleMgmt.length > 0) return middleMgmt[0];

    // 3. Super Admin
    const superAdmins = (rolesMap.SuperAdmin || []).filter((u: any) => u.id !== identity.id);
    if (superAdmins.length > 0) return superAdmins[0];

    return null;
};

/**
 * Resolves the display label for the report recipient, utilizing supervisor names or fallback reviewers.
 * 
 * @param receiverNameDisplay - The raw receiver name from the API.
 * @param identity - The identity of the report owner.
 * @param fallbackReviewer - The resolved fallback reviewer if the primary receiver is unassigned.
 * @returns A formatted first-name label for the recipient.
 */
export const getRecipientLabel = (
    receiverNameDisplay: string,
    identity: any,
    record?: any
): string => {
    // 1. If record already has a team assigned (from backend fetch)
    if (record?.approverTeam && record.approverTeam !== 'No Team Assigned') {
        return record.approverTeam;
    }

    // 2. If it's a new report, use the owner's assigned team from identity
    if (identity?.teamName) return identity.teamName;

    // 3. Fallback logic for legacy/unassigned reports
    const apiName = (receiverNameDisplay || '').trim();
    if (apiName && apiName !== 'Reviewer' && apiName !== '') return getFirstName(apiName);
    
    // If we're here, it means no team is assigned to the identity
    return 'No Assigned Team';
};
