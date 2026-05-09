import { useMemo } from 'react';
import { useNotify, useRefresh, useRecordContext } from 'ra-core';
import { useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Approver, useApprovers } from '../../hooks/useApprovers';
import { Employee } from './types';

export const ViewerCell = () => {
    const record = useRecordContext<Employee>();
    const { data: claimsMap, isLoading: loading } = useApprovers();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const refresh = useRefresh();

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    if (!record) return null;

    const isAdmin = record.isAdmin === true;
    const currentViewerId = record.viewerId ?? "";

    const viewerPool = useMemo(() => {
        if (!claimsMap) return [];
        return (claimsMap.Viewer || []).filter((u: Approver) => u.id !== record.id);
    }, [claimsMap, record.id]);

    const handleViewerChange = async (newViewerId: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/employees/${record.id}/viewer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ viewerId: newViewerId })
            });
            if (!res.ok) throw new Error('Failed');
            notify('Viewer updated', { type: 'success' });
            queryClient.invalidateQueries({ queryKey: ['employees', 'roles-map'] });
            refresh();
        } catch {
            notify('Failed to update viewer', { type: 'error' });
        }
    };

    if (isAdmin) {
        return <span className="text-muted-foreground text-sm">—</span>;
    }

    return (
        <Select
            disabled={loading}
            value={currentViewerId}
            onValueChange={handleViewerChange}
        >
            <SelectTrigger className="w-full h-8 bg-transparent text-left">
                <SelectValue placeholder={loading ? 'Loading...' : 'Assign Viewer'} />
            </SelectTrigger>
            <SelectContent>
                {viewerPool.length === 0 ? (
                    <SelectItem value="none" disabled>
                        No viewers available
                    </SelectItem>
                ) : (
                    viewerPool.map((s: Approver) => (
                        <SelectItem key={s.id} value={s.id}>
                            {s.userName}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
};
