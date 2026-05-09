import { ReceiptText, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Payslips Page - Placeholder
 */
export const Payslips = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-2 gap-4">
                <div className="flex items-center gap-4">
                    <ReceiptText className="h-5 w-5 text-foreground" />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-foreground">
                            My Payslips
                        </h1>
                        <p className="text-[10px] uppercase font-bold text-foreground/60 tracking-widest text-left">Payroll · Earnings & Deductions</p>
                    </div>
                </div>
            </div>

            {/* Placeholder Content */}
            <Card className="border border-border">
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-muted rounded-full p-4 mb-4">
                        <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">Coming Soon</h2>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                        We're currently working on the payroll module. Soon you'll be able to view and download your monthly payslips directly from here.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
