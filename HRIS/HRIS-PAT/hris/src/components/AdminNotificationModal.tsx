import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert, LogOut, RefreshCw } from 'lucide-react';
import type { AdminNotification } from '@/hooks/useAdminNotifications';

interface AdminNotificationModalProps {
    notification: AdminNotification | null;
    onDismiss: () => void;
}

export function AdminNotificationModal({ notification, onDismiss }: AdminNotificationModalProps) {
    const handleRelogin = () => {
        // Clear session and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        window.location.href = '/login';
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <Dialog open={!!notification} onOpenChange={(open) => !open && onDismiss()}>
            <DialogContent
                className="sm:max-w-[420px]"
                // Prevent closing by clicking outside — user must take action
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
                        <ShieldAlert className="h-6 w-6 text-amber-500" />
                    </div>
                    <DialogTitle className="text-center text-base font-bold">
                        Permissions Updated
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm leading-relaxed pt-1">
                        {notification?.message}
                    </DialogDescription>
                </DialogHeader>

                <div className="my-2 p-3 rounded-lg bg-muted/40 border text-center">
                    <p className="text-[11px] text-muted-foreground">
                        Your current session may not reflect the new permissions.
                        Re-logging in will generate a fresh token with the updated access level.
                    </p>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1.5"
                        onClick={handleRefresh}
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh Page
                    </Button>
                    <Button
                        size="sm"
                        className="flex-1 gap-1.5 bg-amber-600 hover:bg-amber-700 text-white"
                        onClick={handleRelogin}
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Re-Login Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
