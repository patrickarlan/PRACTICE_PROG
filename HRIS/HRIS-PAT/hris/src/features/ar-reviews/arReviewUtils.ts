/**
 * arReviewUtils.ts
 * -----------------
 * Shared business logic utilities for Accomplishment Report (AR) review workflows.
 *
 * PURPOSE: Keep all AR review rules (status labels, action guards, display names)
 *          in one place so backend-facing frontend developers can find and modify
 *          them without digging through component files.
 *
 * CONVENTION: Functions here are pure / side-effect-free. They receive data from
 *             the API response and return display strings or booleans.
 */

import type { Identifier } from "ra-core";

/** Shape of a report record returned by the AR Review API */
export interface ARRecord {
    status?: string;
    approvedByName?: string;
    returnedByName?: string;
    reportId?: Identifier;
    id?: Identifier;
    employee?: string;
    receiverName?: string;
    viewerName?: string;
    viewedAt?: string;
    viewedByName?: string;
    returnFeedback?: string;
    feedbackHistory?: Array<{ message?: string; authorName?: string; action?: string; timestamp?: string }>;
}

/**
 * Returns a human-readable status label for a report.
 * Includes the first name of the reviewer when available.
 *
 * Examples:
 *   "Approved by Joren"
 *   "Returned by Admin"
 *   "Pending"
 */
export function getARStatusLabel(record?: ARRecord | null): string {
    if (!record) return 'Pending';
    const status = record.status?.toLowerCase();

    if (status === 'approved') {
        return record.approvedByName
            ? `App. by ${getFirstNameFromFull(record.approvedByName)}`
            : 'Approved';
    }

    if (status === 'returned' || status === 'returned_draft') {
        return record.returnedByName
            ? `Returned by ${getFirstNameFromFull(record.returnedByName)}`
            : 'Returned';
    }

    if (status === 'pending') return 'Pending';
    if (status === 'draft') return 'Draft';

    return record.status ?? 'Pending';
}

/**
 * Returns the CSS class string for a status badge variant.
 * Covers Approved, Pending, Returned, Draft states.
 */
export function getARStatusClass(status: string | undefined): string {
    const s = (status ?? '').toLowerCase();
    if (s === 'approved') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (s === 'pending') return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    if (s === 'returned' || s === 'returned_draft')
        return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
    if (s === 'draft') return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    return 'bg-muted/50 text-muted-foreground border-border';
}

/**
 * Returns true if the "Approve" action button should be hidden.
 * A report should NOT be approvable again once it is already approved.
 */
export function isAlreadyApproved(record?: ARRecord | null): boolean {
    if (!record) return false;
    return record.status?.toLowerCase() === 'approved';
}

/**
 * Returns true if an action-capable user (admin or approver) can still
 * perform the approve / return actions on a given report.
 *
 * Rules:
 *  - The report must NOT be in "Approved" state.
 *  - The report must NOT be in a "Draft" state (employees own that).
 */
export function canReviewerAct(record?: ARRecord | null): boolean {
    if (!record) return false;
    const s = record.status?.toLowerCase() ?? '';
    return s !== 'approved' && s !== 'draft';
}

/**
 * Returns the first name portion of a full name string.
 * E.g.  "Brequillo, Patrick Ranoco" → "Brequillo"
 *        "John Doe"                  → "John"
 */
export function getFirstNameFromFull(fullName?: string): string {
    if (!fullName) return '';

    // If comma delimited "Surname, First Name", take the second part as first name
    if (fullName.includes(',')) {
        const parts = fullName.split(',');
        if (parts.length > 1) {
            return parts[1].trim().split(' ')[0];
        }
    }

    // Otherwise return the first word
    return fullName.trim().split(' ')[0];
}

/**
 * Calculates total hours from an array of accomplishments.
 * Deducts 1 hour break if the window overlaps 12:00-13:00.
 */
export function calculateTotalHours(accomplishments: { start?: string; end?: string }[]): number {
    const totalMinutes = accomplishments.reduce((sum: number, item) => {
        const start = parseTimeToMinutes(item.start);
        const end = parseTimeToMinutes(item.end);

        if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return sum;

        const duration = end - start;
        return sum + Math.max(0, duration);
    }, 0);

    return Math.max(0, Math.round((totalMinutes / 60) * 100) / 100);
}

export function formatTime(hours: number): string {
    if (!hours || hours === 0) return '—';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    const parts = [];
    if (h > 0) parts.push(`${h} hr${h > 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} min${m !== 1 ? 's' : ''}`);

    return parts.join(' ') || '0 mins';
}

export function parseTimeToMinutes(time?: string): number {
    if (!time) return NaN;
    const normalized = time.trim();
    const parts = normalized.split(':');
    const hour = Number(parts[0]);
    const minute = Number(parts[1]);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return NaN;
    return hour * 60 + minute;
}

export function formatTo12Hour(time?: string): string {
    if (!time) return '—';
    const minutes = parseTimeToMinutes(time);
    if (Number.isNaN(minutes)) return time;

    const hour = Math.floor(minutes / 60) % 24;
    const minute = minutes % 60;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const normalizedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${normalizedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

export function formatDateToWord(dateStr?: string): string {
    if (!dateStr) return '—';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

/**
 * Calculates the overlap in minutes between two time windows.
 */
export function calcOverlapMinutes(start1?: string, end1?: string, start2?: string, end2?: string): number {
    const s1 = parseTimeToMinutes(start1);
    const e1 = parseTimeToMinutes(end1);
    const s2 = parseTimeToMinutes(start2);
    const e2 = parseTimeToMinutes(end2);

    if (Number.isNaN(s1) || Number.isNaN(e1) || Number.isNaN(s2) || Number.isNaN(e2)) return 0;

    const overlapStart = Math.max(s1, s2);
    const overlapEnd = Math.min(e1, e2);

    return Math.max(0, overlapEnd - overlapStart);
}
