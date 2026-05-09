import type { DataProvider, RaRecord } from 'ra-core';
import { initMockApi, isMockResource, getAll, getOne, create, update, remove, removeMany } from './mockApi';

// Initialize localStorage-backed mock data on app startup.
// Seeds from data.json on first visit; persists all mutations across refreshes.
initMockApi();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to attach Bearer token to requests
const httpClient = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);
    if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
    }

    const token = localStorage.getItem('token');
    const isAuthEndpoint = url.includes('/api/auth/') || url.includes('/login');

    // If we have no token and it's a protected route, fail early to prevent 401 spam during logout
    if (!token && !isAuthEndpoint) {
        const error = new Error('Unauthorized: No token found') as Error & { status?: number };
        error.status = 401;
        throw error;
    }

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    options.headers = headers;

    let response;
    try {
        response = await fetch(url, options);
    } catch (e) {
        // This usually happens when the server is dead or there's a CORS issue
        const error = new Error('Server is unreachable. Please check your connection or try again later.') as Error & { status?: number };
        error.status = 0; // Use 0 to represent a network/connectivity error
        throw error;
    }

    if (!response.ok) {
        let errorBody: { message?: string; title?: string; errors?: any } = {};
        try {
            errorBody = await response.json();
            console.error("API ERROR BODY:", errorBody);
        } catch (_e) {
            // Not JSON
        }

        let errorMsg = errorBody.message || errorBody.title || `Server error (${response.status})`;
        if (errorBody.errors && typeof errorBody.errors === 'object') {
            // Append specific field errors to the message
            const fieldErrors = Object.entries(errorBody.errors)
                .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(', ')}`)
                .join(' | ');
            errorMsg += ` - ${fieldErrors}`;
        }

        const error = new Error(errorMsg) as Error & { status?: number; body?: unknown };
        error.status = response.status;
        error.body = errorBody;
        throw error;
    }

    const json = await response.json();

    // Check if response is wrapped in ApiResponse<T>
    if (json && typeof json === 'object' && 'success' in json && 'data' in json) {
        if (!json.success) {
            const error = new Error(json.message || 'API operation failed') as Error & { status?: number; body?: unknown };
            error.status = response.status;
            error.body = json;
            throw error;
        }
        return { status: response.status, headers: response.headers, body: json.data };
    }

    return { status: response.status, headers: response.headers, body: json };
};

// --- Mock resource filter helpers ---
/* 
// Mock data for accomplishmentreports - Kept for reference
const MOCK_ARS = [
    {
        id: 1, date: 'Mar 25, 2026', submitted: 'Mar 25, 2026, 5:30 PM', items: '3 items (8 hrs)', status: 'submitted', tasks: [
            { project: 'HRIS Redesign', desc: 'Frontend development', hrs: 4 },
            { project: 'Internal Tools', desc: 'API integration', hrs: 3 },
            { project: 'Meetings', desc: 'Daily standup & planning', hrs: 1 }
        ]
    },
    {
        id: 2, date: 'Mar 24, 2026', submitted: 'Mar 24, 2026, 5:15 PM', items: '5 items (8 hrs)', status: 'approved', tasks: [
            { project: 'HRIS Redesign', desc: 'UI polish', hrs: 5 },
            { project: 'Meetings', desc: 'Client sync', hrs: 3 }
        ]
    },
    {
        id: 3, date: 'Mar 23, 2026', submitted: 'Mar 23, 2026, 6:00 PM', items: '4 items (8 hrs)', status: 'approved', tasks: [
            { project: 'HRIS Redesign', desc: 'Initial setup', hrs: 8 }
        ]
    }
];
*/

function filterArs(data: Record<string, unknown>[], filter: Record<string, unknown>): Record<string, unknown>[] {
    const { q, status, date, reportDate } = filter || {};

    if (q) {
        const normalized = q.toString().toLowerCase();
        data = data.filter((item) => {
            const idValue = item.id?.toString().toLowerCase() ?? '';
            const titleValue = (item.title || item.reportTitle || item.items || '').toString().toLowerCase();
            const statusValue = (item.status || '').toString().toLowerCase();
            const dateValue = (item.date || item.reportDate || item.submitted || '').toString().toLowerCase();
            return (
                idValue.includes(normalized) ||
                titleValue.includes(normalized) ||
                statusValue.includes(normalized) ||
                dateValue.includes(normalized)
            );
        });
    }

    if (status) {
        data = data.filter(item => item.status === status);
    }

    const filterDate = date || reportDate;
    if (filterDate) {
        data = data.filter((item) => {
            const rawDate = item.date || item.reportDate || item.submitted;
            if (!rawDate) return false;
            const parsed = new Date(rawDate as any);
            if (!isNaN(parsed.getTime())) {
                return parsed.toISOString().split('T')[0] === filterDate;
            }
            return rawDate.toString().toLowerCase().includes(filterDate.toString().toLowerCase());
        });
    }

    return data;
}


function filterUsers(data: { claims: string[] }[], filter: Record<string, unknown>): { claims: string[] }[] {
    const { claims_contains } = filter || {};
    if (claims_contains) {
        const filterClaims = Array.isArray(claims_contains) ? claims_contains : [claims_contains];
        data = data.filter(u => u.claims.some((c: string) => filterClaims.includes(c)));
    }
    return data;
}

const MOCK_FILTERS: Record<string, (data: any[], filter: any) => any[]> = {
    'accomplishmentreports': filterArs as (data: any[], filter: any) => any[],
    'users': filterUsers as (data: any[], filter: any) => any[],
};

// --- DataProvider ---

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        // Mock resources — read from localStorage
        if (isMockResource(resource)) {
            let data = getAll(resource);
            const filterFn = MOCK_FILTERS[resource];
            if (filterFn) {
                data = filterFn(data, params.filter);
            }
            const total = data.length;
            const { page = 1, perPage = 10 } = params.pagination || {};
            const start = (page - 1) * perPage;
            const end = page * perPage;
            data = data.slice(start, end);
            return { data, total };
        }

        // Real API resources
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field, order } = params.sort || { field: 'id', order: 'ASC' };
        const { q, ...filters } = params.filter || {};

        // Strip empty string values (e.g. from "All" dropdown option) so they aren't sent to API
        const cleanedFilters = Object.fromEntries(
            Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== undefined)
        );

        const queryParams: Record<string, string> = {
            _start: ((page - 1) * perPage).toString(),
            _end: (page * perPage).toString(),
            _page: page.toString(),
            _perPage: perPage.toString(),
            _sort: field,
            _order: order,
            ...cleanedFilters
        };
        if (q) queryParams.q = q;

        const query = new URLSearchParams(queryParams);
        const resourcePath = resource === 'messages' ? 'notifications' : resource;
        const requestUrl = `${API_BASE}/api/${resourcePath}?${query}`;
        console.log(`[DataProvider] Fetching: ${requestUrl}`);
        const response = await httpClient(requestUrl);

        let data = response.body || [];

        // Map backend ID to React Admin required "id"
        data = data.map((item: { reportId?: string | number; id?: string | number; createdAt?: string; accomplishments?: { hours?: number }[]; title?: string; userName?: string; email?: string; position?: string; department?: string; notificationId?: string | number; isRead?: boolean; body?: string; eventType?: string; linkTo?: string }) => {
            if (resource === 'AccomplishmentReports' || resource === 'accomplishmentreports' || resource === 'ar-reviews') {
                const accomplishments = (item.accomplishments || []) as { hours?: number }[];
                const taskHrs = accomplishments.reduce((sum: number, a) => sum + (a.hours || 0), 0);
                const taskCount = accomplishments.length;

                // For the list view, we just sum them. Overlap is handled in Detail view.
                const breakHrs = ((item as any).breakDurationMinutes || 0) / 60;
                const totalHrs = taskHrs + breakHrs;

                return {
                    ...item,
                    id: item.reportId,
                    submitted: item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A',
                    items: `${taskCount} item${taskCount !== 1 ? 's' : ''} (${totalHrs.toFixed(2)} hrs)`,
                    title: item.title || 'Untitled Report'
                };
            }

            if (item.reportId && !item.id) {
                return { ...item, id: item.reportId };
            }
            if (resource === 'messages' || resource === 'notifications') {
                const isRead = item.isRead;
                return {
                    ...item,
                    id: item.id || item.notificationId,
                    read: isRead,
                    title: item.title,
                    text: item.body,
                    date: item.createdAt,
                    sender: "HRIS System",
                    linkTo: item.linkTo,
                    tags: isRead ? ['archive'] : ['inbox'],
                    type: (item.eventType === 'Approved' || item.eventType === 'Returned' || item.eventType === 'Submitted' || item.eventType === 'Resubmitted' || item.eventType === 'Viewed') ? 'report' : 'system'
                };
            }
            // Ensure 'id' exists for React Admin (Fallback for casing or custom naming)
            const id = item.id || (item as any).Id || item.reportId || (item as any).userId;

            if (resource === 'ApprovalTeams') {
                return {
                    ...item,
                    id,
                    approvers: (item as any).approvers?.map((a: any) => ({
                        ...a,
                        userName: a.user?.fullName || a.user?.userName || a.userName || 'Unknown User'
                    }))
                };
            }

            return { ...item, id };
        });

        // Basic client-side search (backup)
        if (q && resource === 'employees') {
            data = data.filter((item: { userName?: string; email?: string; position?: string; department?: string }) =>
                `${item.userName} ${item.email} ${item.position} ${item.department}`.toLowerCase().includes(q.toLowerCase())
            );
        }

        // Phase 11 Task 4 & 5: Hierarchical Team Sorting and Filter Synchronization
        if (resource === 'employees') {
            const getPriority = (emp: any) => {
                const isSuperAdmin = emp.roles?.includes('SuperAdmin') || emp.roles?.includes('HR Management');
                const isManagement = !!emp.isManagement;
                const isApprover = !!emp.isApprover;

                if (isSuperAdmin) return 1;
                if (isManagement && !isApprover) return 2;
                if (isManagement && isApprover) return 3;
                if (!isManagement && isApprover) return 4;
                return 5;
            };

            // Filter logic (Task 5)
            const roleFilter = filters.role;
            if (roleFilter) {
                data = data.filter((emp: any) => {
                    const priority = getPriority(emp);
                    const map: Record<string, number> = {
                        'SuperAdmin': 1,
                        'Management': 2,
                        'Middle Management': 3,
                        'Approver': 4,
                        'Standard': 5
                    };
                    return priority === map[roleFilter];
                });
            }

            // Sort logic (Task 4)
            data.sort((a: any, b: any) => {
                const pA = getPriority(a);
                const pB = getPriority(b);
                if (pA !== pB) return pA - pB;
                // Secondary sort by name
                return (a.userName || "").localeCompare(b.userName || "");
            });
        }

        const total = parseInt(response.headers.get('x-total-count') || data.length.toString(), 10);

        return {
            data,
            total,
        };
    },

    getOne: async (resource, params) => {
        if (isMockResource(resource)) {
            const record = getOne(resource, params.id);
            return { data: record };
        }

        const response = await httpClient(`${API_BASE}/api/${resource}/${params.id}`);
        let data = response.body;

        if (data && (resource === 'AccomplishmentReports' || resource === 'accomplishmentreports' || resource === 'ar-reviews')) {
            const accomplishments = (data.accomplishments || []) as { hours?: number }[];
            const taskHrs = accomplishments.reduce((sum: number, a) => sum + (a.hours || 0), 0);
            const breakHrs = (data.breakDurationMinutes || 0) / 60;
            const totalHrs = taskHrs + breakHrs;

            data = {
                ...data,
                id: data.reportId,
                submitted: data.createdAt ? new Date(data.createdAt).toLocaleString() : 'N/A',
                items: `${accomplishments.length} item(s) (${totalHrs.toFixed(2)} hrs)`,
            };
        }


        if (data && resource === 'ar-reviews' && !data.id && data.reportId) {
            data = { ...data, id: data.reportId };
        }

        return { data };
    },

    getMany: async (resource, params) => {
        if (isMockResource(resource)) {
            const data = params.ids.map(id => getOne(resource, id)).filter(Boolean);
            return { data };
        }

        const query = params.ids.map(id => `id=${id}`).join('&');
        const response = await httpClient(`${API_BASE}/api/${resource}?${query}`);
        return { data: response.body };
    },

    getManyReference: async (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field: sortField, order: sortOrder } = params.sort || { field: 'id', order: 'ASC' };

        const query = new URLSearchParams({
            [params.target]: params.id.toString(),
            _start: ((page - 1) * perPage).toString(),
            _end: (page * perPage).toString(),
            _sort: sortField,
            _order: sortOrder,
        });

        const response = await httpClient(`${API_BASE}/api/${resource}?${query}`);
        const total = parseInt(
            response.headers.get('x-total-count') || response.body.length || '0'
        );

        return {
            data: response.body,
            total,
        };
    },

    create: async (resource, params) => {
        if (isMockResource(resource)) {
            const record = create(resource, params.data);
            return { data: record };
        }

        const response = await httpClient(`${API_BASE}/api/${resource}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params.data),
        });

        const data = response.body;
        // Ensure the record has an 'id' for React Admin
        if (data && typeof data === 'object' && !data.id) {
            if (data.reportId) data.id = data.reportId;
            else if (data.userId) data.id = data.userId;
            else if (data.id === undefined) data.id = Math.random();
        }

        return { data };
    },

    update: async (resource, params) => {
        if (isMockResource(resource)) {
            const updated = update(resource, params.id, params.data as RaRecord);
            return { data: updated };
        }

        // Custom handle for marking notifications as read
        if (resource === 'messages' || resource === 'notifications') {
            const isReadAll = params.id === 'read-all';
            const patchPath = isReadAll
                ? `${API_BASE}/api/notifications/read-all`
                : `${API_BASE}/api/notifications/${params.id}/read`;

            await httpClient(patchPath, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            return { data: { ...params.data, id: params.id } };
        }

        const customPath = params.meta?.customPath;
        const useStatusEndpoint = !customPath && params.meta?.skipStatusRoute !== true && params.data && params.data.status;
        const path = customPath
            ? `${API_BASE}/api/${resource}/${params.id}/${customPath}`
            : useStatusEndpoint
                ? `${API_BASE}/api/${resource}/${params.id}/status`
                : `${API_BASE}/api/${resource}/${params.id}`;

        const response = await httpClient(path, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params.data),
        });

        const data = response.body;
        if (data && typeof data === 'object' && !data.id) {
            data.id = params.id;
        }

        return { data };
    },

    updateMany: async (resource, params) => {
        if (isMockResource(resource)) {
            const updated = params.ids.map(id => update(resource, id, params.data as RaRecord));
            return { data: updated };
        }

        const results = await Promise.all(
            params.ids.map(id =>
                httpClient(`${API_BASE}/api/${resource}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(params.data),
                })
            )
        );
        return { data: results.map(r => r.body) };
    },

    delete: async (resource, params) => {
        if (isMockResource(resource)) {
            const deleted = remove(resource, params.id);
            return { data: deleted };
        }

        const response = await httpClient(`${API_BASE}/api/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: response.body };
    },

    deleteMany: async (resource, params) => {
        if (isMockResource(resource)) {
            const deleted = removeMany(resource, params.ids);
            return { data: deleted };
        }

        const results = await Promise.all(
            params.ids.map(id =>
                httpClient(`${API_BASE}/api/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        );
        return { data: results.map(r => r.body) };
    },
};
