export const parseTimeToMinutes = (time: string): number => {
    if (!time) return NaN;
    const normalized = time.trim().toLowerCase();
    const ampmMatch = normalized.match(/\s*(am|pm)$/);
    let timePart = normalized;
    let isPm = false;

    if (ampmMatch) {
        isPm = ampmMatch[1] === 'pm';
        timePart = normalized.replace(/\s*(am|pm)$/, '').trim();
    }

    const parts = timePart.split(':').map(Number);
    if (parts.length < 2 || parts.some(Number.isNaN)) return NaN;

    let [hours, minutes] = parts;
    if (ampmMatch) {
        if (hours === 12) {
            hours = isPm ? 12 : 0;
        } else if (isPm) {
            hours += 12;
        }
    }

    return hours * 60 + minutes;
};

export const calcHours = (start: string, end: string): number => {
    const startMinutes = parseTimeToMinutes(start);
    const endMinutes = parseTimeToMinutes(end);

    if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) return 0;

    let diffMinutes = endMinutes - startMinutes;
    if (diffMinutes <= 0) return 0;

    const diff = diffMinutes / 60;
    return Math.max(0, Math.round(diff * 100) / 100);
};

export const calcDurationMinutes = (start: string, end: string): number => {
    const startMin = parseTimeToMinutes(start);
    const endMin = parseTimeToMinutes(end);
    if (Number.isNaN(startMin) || Number.isNaN(endMin)) return 0;
    return Math.max(0, endMin - startMin);
};

export const calcOverlapMinutes = (start1: string, end1: string, start2: string, end2: string): number => {
    const s1 = parseTimeToMinutes(start1);
    const e1 = parseTimeToMinutes(end1);
    const s2 = parseTimeToMinutes(start2);
    const e2 = parseTimeToMinutes(end2);

    if (Number.isNaN(s1) || Number.isNaN(e1) || Number.isNaN(s2) || Number.isNaN(e2)) return 0;

    const overlapStart = Math.max(s1, s2);
    const overlapEnd = Math.min(e1, e2);

    return Math.max(0, overlapEnd - overlapStart);
};

export const formatTime = (hours: number): string => {
    if (hours === 0) return '—';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    const parts = [];
    if (h > 0) parts.push(`${h} hr${h > 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} min${m !== 1 ? 's' : ''}`);

    return parts.join(' ') || '0 mins';
};

export const getFirstName = (fullName?: string | null): string => {
    if (!fullName) return '';
    if (fullName.includes('@')) {
        if (fullName.toLowerCase().startsWith('admin')) return 'Middle Management';
        const prefix = fullName.split('@')[0];
        return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    if (fullName.includes(',')) {
        return fullName.split(',')[1]?.trim().split(' ')[0] ?? fullName;
    }
    return fullName.split(' ')[0];
};
