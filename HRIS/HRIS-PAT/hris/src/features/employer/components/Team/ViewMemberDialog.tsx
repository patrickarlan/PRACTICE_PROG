import { useNavigate } from 'react-router-dom';
import { useGetList } from 'ra-core';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Employee } from './types';

interface ViewMemberDialogProps {
    record: Employee;
    open: boolean;
    onClose: () => void;
}

export const ViewMemberDialog = ({ record, open, onClose }: ViewMemberDialogProps) => {
    const navigate = useNavigate();
    const { data: arData } = useGetList('AccomplishmentReports', {
        pagination: { page: 1, perPage: 200 },
        filter: {},
    });

    const memberArs = (arData ?? []).filter((ar: any) =>
        ar.userId === record.id ||
        ar.fullName === record.userName
    ).filter((ar: any) => ar.status !== 'Draft');

    const initials = (record.fullName ?? record.userName ?? '?')
        .split(/[\s,]+/).filter(Boolean)
        .map((p: string) => p[0]).join('').slice(0, 2).toUpperCase();

    const statusColor = (status: string) => {
        switch (status) {
            case 'Approved':       return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            case 'Pending':        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'Returned':
            case 'Returned_Draft': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
            default:               return 'bg-muted/50 text-muted-foreground border-border';
        }
    };

    return (
        <Dialog open={open} onOpenChange={v => !v && onClose()}>
            <DialogContent className="sm:max-w-[520px] max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <DialogTitle className="text-base font-bold leading-tight truncate">{record.fullName ?? record.userName}</DialogTitle>
                                <span className="text-[9px] font-mono text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 tracking-tighter">
                                    #{record.id?.toString().substring(0, 8)}
                                </span>
                            </div>
                            <DialogDescription className="text-xs mt-0.5 truncate">{record.email}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    <div className="space-y-3">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-1.5">
                            <UserCircle className="h-3.5 w-3.5" /> Credentials
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Position',   value: record.position   || '—' },
                                { label: 'Department', value: record.department || '—' },
                                { label: 'Access',     value: record.accessLevel || '—' },
                                { label: 'Email',      value: record.email      || '—' },
                            ].map(({ label, value }) => (
                                <div key={label} className="bg-muted/30 rounded-lg p-3 border border-border/50">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">{label}</p>
                                    <p className="text-sm font-semibold text-foreground truncate">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5" /> Accomplishment Reports
                            <span className="ml-auto bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {memberArs.length}
                            </span>
                        </p>
                        {memberArs.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground text-sm border border-dashed border-border/50 rounded-lg bg-muted/10">
                                No submitted reports found for this member.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {memberArs.map((ar: any) => (
                                    <div
                                        key={ar.id}
                                        className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border/50 bg-muted/20"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold truncate text-foreground">
                                                {ar.title || ar.reportDate || '—'}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground mt-0.5">
                                                {ar.reportDate ?? ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={cn(
                                                'text-[10px] font-bold px-2 py-0.5 rounded border uppercase',
                                                statusColor(ar.status)
                                            )}>
                                                {ar.status === 'Approved' 
                                                    ? (ar.approvedByName ? `Approved by ${ar.approvedByName}` : 'Approved') 
                                                    : (ar.status === 'Returned' || ar.status === 'Returned_Draft')
                                                        ? (ar.returnedByName ? `Returned by ${ar.returnedByName}` : 'Returned')
                                                        : ar.status}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-6 px-2 text-[10px] font-bold"
                                                onClick={() => { onClose(); navigate(`/ar-reviews/${ar.id}`); }}
                                            >
                                                {ar.status === 'Approved' ? 'Open' : 'Review'}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-6 py-4 border-t shrink-0 flex justify-end">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
