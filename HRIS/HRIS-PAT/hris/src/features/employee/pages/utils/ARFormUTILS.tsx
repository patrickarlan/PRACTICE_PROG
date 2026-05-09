import { format } from 'date-fns';
import { AccomplishmentRow, calcHours } from '../../components/ARForm/index';

/**
 * Builds the payload for creating or updating an Accomplishment Report.
 */
export const buildARPayload = (
    reportDate: string,
    reportTitle: string,
    selectedRecipient: string,
    status: string,
    rows: AccomplishmentRow[],
    breakStart?: string,
    breakEnd?: string,
    breakDuration?: number,
    idempotencyKey?: string
) => {
    return {
        date: reportDate,
        title: reportTitle,
        receiverId: selectedRecipient,
        status,
        idempotencyKey: status === 'Draft' ? idempotencyKey : undefined,
        breakStartTime: breakStart || null,
        breakEndTime: breakEnd || null,
        breakDurationMinutes: breakDuration || 0,
        accomplishments: rows.map(r => ({
            client: r.account,
            taskName: r.task,
            particulars: "",
            startTime: r.start || null,
            endTime: r.end || null
        }))
    };
};

/**
 * Maps raw accomplishment data from the backend to the frontend's table row format.
 */
export const mapAccomplishmentsToRows = (accomplishments: any[]): AccomplishmentRow[] => {
    if (!accomplishments || !Array.isArray(accomplishments)) {
        return [{ id: 1, account: '', task: '', start: '', end: '', hours: 0 }];
    }

    return accomplishments.map((item: any, index: number) => ({
        id: item.reportId || index,
        account: item.project || '',
        task: item.task || item.notes || '',
        start: item.start || '',
        end: item.end || '',
        hours: item.hours ?? calcHours(item.start || '', item.end || '')
    }));
};

/**
 * Common formatting for the report date display.
 */
export const formatReportSubtitle = (date: string) => {
    try {
        return `Drafting for ${format(new Date(date || new Date()), 'MMMM d, yyyy')}`;
    } catch {
        return 'Drafting Report';
    }
};
