import { useState } from 'react';
import { useNotify, useRefresh } from 'ra-core';
import { useQueryClient } from '@tanstack/react-query';

export const useTeamLogic = () => {
    const [isPopulating, setIsPopulating] = useState(false);
    const notify = useNotify();
    const queryClient = useQueryClient();
    const refresh = useRefresh();

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handlePopulateAll = async () => {
        setIsPopulating(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/employees/populate-all`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || 'Failed');
            const count = json?.data?.updatedCount ?? 0;
            notify(
                count > 0
                    ? `✓ Populated ${count} employee(s) successfully.`
                    : 'All assignments are already up to date.',
                { type: count > 0 ? 'success' : 'info' }
            );
            queryClient.invalidateQueries({ queryKey: ['employees', 'roles-map'] });
            refresh();
        } catch (err) {
            const error = err as Error;
            notify(error?.message || 'Failed to populate', { type: 'error' });
        } finally {
            setIsPopulating(false);
        }
    };

    return {
        isPopulating,
        handlePopulateAll
    };
};
