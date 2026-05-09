import {
    calculateTotalHours,
    parseTimeToMinutes,
    calcOverlapMinutes
} from '../arReviewUtils';
import { ROLE_SUPER_ADMIN, ROLE_APPROVER, ROLE_VIEWER } from '@/auth/roles';

/**
 * ARReviewDetailUTILS.tsx
 * 
 * Centralized business logic for the AR Review Detail page.
 * Handles permission resolution, complex time calculations, and payload builders.
 */

/**
 * Resolves granular reviewer permissions based on user identity and report state.
 * 
 * @param identity - The current user's identity/claims.
 * @param permissions - ra-core permissions.
 * @param record - The current AR record being reviewed.
 * @returns A permissions object with boolean flags.
 */
export const resolveReviewPermissions = (identity: any, permissions: any) => {
    const isAdmin = permissions === ROLE_SUPER_ADMIN;
    const isApprover = identity?.roles?.includes(ROLE_APPROVER);
    const isManagement = identity?.roles?.includes(ROLE_VIEWER);

    const hasPermission = isAdmin || isApprover;
    const isPureManagement = isManagement && !isApprover && !isAdmin;

    return {
        isAdmin,
        isApprover,
        isManagement,
        hasPermission,
        isPureManagement,
    };
};

/**
 * Calculates the total hours for a review, accounting for task times, 
 * break durations, and overlaps between breaks and tasks.
 * 
 * @param accomplishments - List of tasks.
 * @param record - The main report record (containing break info).
 * @returns Total calculated hours as a number.
 */
export const calculateReviewTotalHours = (accomplishments: any[], record: any) => {
    if (!accomplishments) return { worked: 0, break: 0, total: 0 };

    const base = calculateTotalHours(accomplishments);

    let overlapMinutes = 0;
    let breakHours = 0;

    if (record?.breakStartTime && record?.breakEndTime) {
        const startMin = parseTimeToMinutes(record.breakStartTime);
        const endMin = parseTimeToMinutes(record.breakEndTime);
        breakHours = Math.max(0, (endMin - startMin) / 60);

        accomplishments.forEach((item: any) => {
            if (item.start && item.end) {
                overlapMinutes += calcOverlapMinutes(
                    record.breakStartTime,
                    record.breakEndTime,
                    item.start,
                    item.end
                );
            }
        });
    }

    const netWorked = Math.max(0, base - (overlapMinutes / 60));
    return {
        worked: netWorked,
        break: breakHours,
        total: netWorked + breakHours
    };
};

/**
 * Constructs the correction payload for the administrative update API.
 * 
 * @param record - The original record.
 * @param editedTasks - The modified task list from state.
 * @param editedBreak - The modified break info from state.
 * @returns A structured payload object.
 */
export const buildCorrectionPayload = (record: any, editedTasks: any[], editedBreak: any) => {
    return {
        Title: record.title,
        Date: record.date || record.reportDate,
        Status: record.status,
        BreakStartTime: editedBreak.start || null,
        BreakEndTime: editedBreak.end || null,
        BreakDurationMinutes: editedBreak.duration || 0,
        Accomplishments: editedTasks.map((t: any) => ({
            Client: t.project,
            TaskName: t.task,
            Particulars: t.notes || "",
            StartTime: t.start,
            EndTime: t.end
        }))
    };
};

/**
 * Generates user initials for avatar fallback.
 * 
 * @param name - Full name of the employee.
 * @returns A 2-character uppercase string.
 */
export const getReviewerInitials = (name: string): string => {
    if (!name) return '??';
    return name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
};

/**
 * Formats the primary status label for the review header.
 */
export {
    getARStatusLabel,
    getARStatusClass,
    isAlreadyApproved,
    canReviewerAct,
    getFirstNameFromFull,
    formatTime,
    formatTo12Hour,
    formatDateToWord,
    parseTimeToMinutes
} from '../arReviewUtils';
