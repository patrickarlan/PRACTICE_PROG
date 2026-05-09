/**
 * Custom exporter for Accomplishment Reports that fetches a flattened Excel file from the backend.
 */
let lastExportTime = 0;
const EXPORT_COOLDOWN = 10000; // 10 seconds

export const arExcelExporter = async (
    _data: any[],
    _fetchRelatedRecords: any,
    _dataProvider: any,
    _resource: string,
    listContext: any
) => {
    const { filterValues, selectedIds } = listContext;

    // Spam prevention logic
    const now = Date.now();
    const timeSinceLastExport = now - lastExportTime;

    if (timeSinceLastExport < EXPORT_COOLDOWN) {
        const remainingSeconds = Math.ceil((EXPORT_COOLDOWN - timeSinceLastExport) / 1000);
        if (listContext.notify) {
            listContext.notify(`Please wait ${remainingSeconds}s before exporting again.`, { type: 'warning' });
        }
        return;
    }

    lastExportTime = now;

    // Build the query parameters
    const queryParams = new URLSearchParams();

    if (selectedIds && selectedIds.length > 0) {
        queryParams.append('ids', selectedIds.join(','));
    } else {
        // Apply current filters if no specific IDs are selected
        Object.entries(filterValues).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value.toString());
            }
        });
    }

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';
    const token = localStorage.getItem('token');

    // Always use the AccomplishmentReports endpoint for exporting, 
    // even if called from ar-reviews or other related views.
    const url = `${API_BASE}/api/AccomplishmentReports/export?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });

        if (!response.ok) throw new Error('Export failed');

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;

        // Use a nice filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        link.setAttribute('download', `Accomplishment_Reports_${timestamp}.xlsx`);

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Excel Export Error:', error);
        throw error;
    }
};
