import { useMemo } from 'react';
import { useNotify, useRefresh, useRecordContext } from 'ra-core';
import { useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApprovers } from '../../hooks/useApprovers';
import { Employee } from './types';

export const SupervisorCell = () => {
    const record = useRecordContext<Employee>();
    const { data: claimsMap, isLoading: loading } = useApprovers();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const refresh = useRefresh();

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    if (!record) return null;

    const isApprover = record.isApprover === true;
    const isAdmin = record.isAdmin === true;
    const currentSupervisorId = record.supervisorId ?? "";

    const supervisorPool = useMemo(() => {
        if (!claimsMap) return [];

        const pool = isApprover
            ? [...(claimsMap.SuperAdmin || [])]
            : [...(claimsMap.Approver || [])];

        return pool.filter(u => u.id !== record.id);
    }, [claimsMap, isApprover, record.id]);

    const handleSupervisorChange = async (newSupervisorId: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/employees/${record.id}/supervisor`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ supervisorId: newSupervisorId })
            });
            if (!res.ok) throw new Error('Failed');
            notify('Supervisor updated', { type: 'success' });
            queryClient.invalidateQueries({ queryKey: ['employees', 'roles-map'] });
            refresh();
        } catch {
            notify('Failed to update supervisor', { type: 'error' });
        }
    };

    if (isAdmin) {
        return <span className="text-muted-foreground text-sm">—</span>;
    }

    const placeholderLabel = isApprover ? 'Assign Admin supervisor' : 'Assign Approver supervisor';

    return (
        <Select
            disabled={loading}
            value={currentSupervisorId}
            onValueChange={handleSupervisorChange}
        >
            <SelectTrigger className="w-full h-8 bg-transparent text-left">
                <SelectValue placeholder={loading ? 'Loading...' : placeholderLabel} />
            </SelectTrigger>
            <SelectContent>
                {supervisorPool.length === 0 ? (
                    <SelectItem value="none" disabled>
                        No supervisors available
                    </SelectItem>
                ) : (
                    supervisorPool.map(s => (
                        <SelectItem key={s.id} value={s.id}>
                            {s.userName}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
};
