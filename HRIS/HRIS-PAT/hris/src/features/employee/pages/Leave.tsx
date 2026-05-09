import { CalendarDays, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Leave Management Page - Placeholder
 */
export const Leave = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-2 gap-4">
                <div className="flex items-center gap-4">
                    <CalendarDays className="h-5 w-5 text-foreground" />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-foreground">
                            Leave Management
                        </h1>
                        <p className="text-[10px] uppercase font-bold text-foreground/60 tracking-widest text-left">Time Off · Vacation & Sick Leaves</p>
                    </div>
                </div>
                <Button size="sm" className="h-8 shadow-sm">
                    Request Leave
                </Button>
            </div>

            {/* Placeholder Content */}
            <Card className="border border-border">
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-muted rounded-full p-4 mb-4">
                        <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Under Construction</h2>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                        The leave management system is being finalized. You'll soon be able to track your leave balance and submit requests with just a few clicks.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
