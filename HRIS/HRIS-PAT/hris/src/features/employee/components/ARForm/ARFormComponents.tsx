import { FileText, Pencil, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { getARStatusLabel, getARStatusClass } from '@/features/ar-reviews/arReviewUtils';

/**
 * Header component for AR creation and editing.
 */
export const ARFormHeader = ({ 
    title, 
    dateSubtitle, 
    status, 
    isModifiedByAdmin, 
    approvedByName, 
    returnerName 
}: { 
    title: string, 
    dateSubtitle: string, 
    status?: string, 
    isModifiedByAdmin?: boolean,
    approvedByName?: string,
    returnerName?: string
}) => {
    const statusBadge = (statusValue: string) => {
        const fakeRecord = { status: statusValue, approvedByName, returnedByName: returnerName };
        const label = getARStatusLabel(fakeRecord);
        const colorClass = getARStatusClass(statusValue);
        return (
            <Badge className={`${colorClass} border uppercase text-[10px] font-bold`}>
                {label}
            </Badge>
        );
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-2 gap-4">
            <div className="flex items-center gap-4">
                <FileText className="size-5 text-foreground" />
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                        {title}
                        {isModifiedByAdmin && (
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 font-bold text-[10px] uppercase tracking-wider px-2 h-6 flex items-center gap-1">
                                <Pencil className="h-3 w-3" />
                                Modified by Admin
                            </Badge>
                        )}
                        {status && statusBadge(status)}
                    </h1>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground/80 tracking-widest leading-none mt-1">
                        {dateSubtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

/**
 * Feedback banner for returned reports.
 */
export const ARFeedbackBanner = ({ feedback, returnerName }: { feedback: string, returnerName: string }) => (
    <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex gap-4 animate-in slide-in-from-top-2 duration-300">
        <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <MessageSquare className="h-5 w-5" />
        </div>
        <div>
            <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                Feedback from {returnerName || 'Reviewer'}
            </h4>
            <p className="text-sm text-rose-800/80 leading-relaxed mt-1">
                "{feedback}"
            </p>
            <p className="text-[10px] text-rose-700/60 font-medium mt-2 uppercase tracking-wider">
                Please address the comments above and resubmit.
            </p>
        </div>
    </div>
);

/**
 * Shared action bar for form controls.
 */
export const ARFormToolbar = ({ 
    reportDate, 
    setReportDate, 
    recipientLabel, 
    isReadOnly, 
    showValidation,
    children 
}: { 
    reportDate: string, 
    setReportDate: (v: string) => void, 
    recipientLabel: string, 
    isReadOnly?: boolean,
    showValidation: boolean,
    children: React.ReactNode
}) => (
    <div className="flex justify-between items-center flex-wrap gap-3 bg-card px-4 py-3 rounded-xl border border-border shadow-sm transition-all">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Date:</label>
                <Input
                    type="date"
                    value={reportDate}
                    onChange={e => setReportDate(e.target.value)}
                    max={format(new Date(), 'yyyy-MM-dd')}
                    readOnly={isReadOnly}
                    className={`h-7 w-32 bg-transparent border-none focus-visible:ring-0 shadow-none p-0 text-sm font-bold transition-all ${showValidation && !reportDate ? 'ring-1 ring-destructive/40 rounded px-1' : ''}`}
                />
            </div>
            <div className="h-4 w-[1px] bg-border/60" />
            <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Approver Team:</label>
                <span className="text-sm font-bold text-primary uppercase">{recipientLabel}</span>
            </div>
        </div>
        <div className="flex items-center gap-2">
            {children}
        </div>
    </div>
);

/**
 * Confirmation dialogs for submission and deletion.
 */
export const ARConfirmDialogs = ({
    showConfirm,
    setShowConfirm,
    showDeleteConfirm,
    setShowDeleteConfirm,
    recipientLabel,
    reportTitle,
    onConfirmSubmit,
    onConfirmDelete,
    isSubmitting
}: {
    showConfirm: boolean,
    setShowConfirm: (v: boolean) => void,
    showDeleteConfirm?: boolean,
    setShowDeleteConfirm?: (v: boolean) => void,
    recipientLabel: string,
    reportTitle: string,
    onConfirmSubmit: () => void,
    onConfirmDelete?: () => void,
    isSubmitting: boolean
}) => (
    <>
        <Dialog open={showConfirm} onOpenChange={(open) => !isSubmitting && setShowConfirm(open)}>
            <DialogContent onPointerDownOutside={(e) => isSubmitting && e.preventDefault()} onEscapeKeyDown={(e) => isSubmitting && e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Submit Accomplishment Report?</DialogTitle>
                    <DialogDescription>
                        This will send your report to the <span className="font-bold text-primary uppercase">{recipientLabel}</span> for review.
                        You won't be able to edit it while it's pending.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={isSubmitting}>Go Back</Button>
                    <Button onClick={onConfirmSubmit} disabled={isSubmitting} className="min-w-[140px]">
                        {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {showDeleteConfirm && setShowDeleteConfirm && onConfirmDelete && (
            <Dialog open={showDeleteConfirm} onOpenChange={(open) => !isSubmitting && setShowDeleteConfirm(open)}>
                <DialogContent onPointerDownOutside={(e) => isSubmitting && e.preventDefault()} onEscapeKeyDown={(e) => isSubmitting && e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Accomplishment Report?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. The report <span className="font-bold text-foreground">"{reportTitle || 'Untitled'}"</span> will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isSubmitting}>Cancel</Button>
                        <Button
                            onClick={onConfirmDelete}
                            disabled={isSubmitting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 min-w-[140px]"
                        >
                            {isSubmitting ? 'Deleting...' : 'Delete Report'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
    </>
);
