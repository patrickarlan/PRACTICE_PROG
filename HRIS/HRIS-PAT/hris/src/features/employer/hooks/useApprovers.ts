import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Approver {
    id: string;
    userName: string;
    department?: string;
}

export interface RolesMap {
    Approver: Approver[];
    Management: Approver[];
    SuperAdmin: Approver[];
    Viewer?: Approver[];
}

export const useApprovers = () => {
    return useQuery<RolesMap>({
        queryKey: ['employees', 'roles-map'],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/employees/roles-map`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch roles map');
            }

            const json = await res.json();
            // Backend returns { success: true, data: { ... } }
            if (json && json.success && json.data) {
                return json.data;
            }
            return json;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
