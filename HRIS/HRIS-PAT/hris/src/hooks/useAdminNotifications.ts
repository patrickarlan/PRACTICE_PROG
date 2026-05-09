import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export interface AdminNotification {
    type: 'role' | 'claims';
    message: string;
}

/**
 * Connects to the backend SignalR hub and listens for admin-pushed notifications.
 * Returns the latest notification (if any) so the UI can display a re-login prompt.
 */
export function useAdminNotifications() {
    const [notification, setNotification] = useState<AdminNotification | null>(null);
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_BASE}/hubs/notifications`, {
                // Pass the JWT via query string (required for WebSocket auth)
                accessTokenFactory: () => token,
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Warning)
            .build();

        connection.on('permissions_changed', (data: AdminNotification) => {
            setNotification(data);
        });

        connection.start().catch(() => {
            // Silently fail — notifications are a nice-to-have, not critical
        });

        connectionRef.current = connection;

        return () => {
            connection.stop();
        };
    }, []);

    const dismiss = () => setNotification(null);

    return { notification, dismiss };
}
