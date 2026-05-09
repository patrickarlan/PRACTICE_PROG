export interface AccomplishmentRow {
    id: number;
    account: string;
    task: string;
    start: string;
    end: string;
    hours: number;
}

export interface AccomplishmentReportData {
    id?: string;
    reportDate: string;
    title: string;
    receiverId: string;
    viewerId: string;
    status: string;
    returnFeedback?: string;
    returnedByName?: string;
    receiverName?: string;
    viewerName?: string;
    breakStartTime?: string;
    breakEndTime?: string;
    breakDurationMinutes?: number;
    accomplishments: AccomplishmentRow[];
}
