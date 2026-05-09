import { useState, useMemo, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Trash2, Plus, TableProperties, Clock } from 'lucide-react';
import { RecipientSelect } from './RecipientSelect';

export type AccomplishmentRow = {
    id: number | string;
    account: string;
    task: string;
    start: string;
    end: string;
    hours: number;
};

interface ARFormProps {
    initialData?: {
        date?: string;
        title?: string;
        recipient?: string;
        rows: AccomplishmentRow[];
    };
    onSubmit: (data: { date: string; title: string; recipient: string; rows: AccomplishmentRow[], idempotencyKey?: string }) => Promise<void>;
    onSaveDraft?: (data: { date: string; title: string; recipient: string; rows: AccomplishmentRow[], idempotencyKey: string }) => Promise<void>;
    submitLabel?: string;
    title: string;
    subtitle: string;
    isEdit?: boolean;
}

const calcHours = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const diff = (eh * 60 + em - (sh * 60 + sm)) / 60;
    return Math.max(0, Math.round(diff * 100) / 100);
};

const formatTime = (hours: number): string => {
    if (hours === 0) return '—';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    const parts = [];
    if (h > 0) parts.push(`${h} hr${h > 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} min${m !== 1 ? 's' : ''}`);

    return parts.join(' ') || '0 mins';
};

const today = new Date().toISOString().split('T')[0];

export const ARForm = ({
    initialData,
    onSubmit,
    onSaveDraft,
    submitLabel = 'Submit Report',
    title,
    subtitle,
    isEdit = false
}: ARFormProps) => {
    const [reportDate, setReportDate] = useState(initialData?.date || today);
    const [reportTitle, setReportTitle] = useState(initialData?.title || '');
    const [selectedRecipient, setSelectedRecipient] = useState(initialData?.recipient || '');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submittingRef = useRef(false); // <-- ADD THIS: Ref for synchronous check
    const [rows, setRows] = useState<AccomplishmentRow[]>(initialData?.rows || []);
    const [submissionKey] = useState(() => uuidv4());

    // Sync state if initialData changes (useful for Edit page loading)
    useEffect(() => {
        if (initialData) {
            setReportDate(initialData.date || today);
            setReportTitle(initialData.title || '');
            setSelectedRecipient(initialData.recipient || '');
            setRows(initialData.rows);
        }
    }, [initialData]);

    const totalHours = useMemo(
        () => rows.reduce((sum, r) => sum + r.hours, 0),
        [rows]
    );

    const updateRow = (
        id: number | string,
        field: keyof AccomplishmentRow,
        value: string
    ) => {
        setRows((prev) =>
            prev.map((r) => {
                if (r.id !== id) return r;
                const updated = { ...r, [field]: value };
                if (field === 'start' || field === 'end') {
                    updated.hours = calcHours(
                        field === 'start' ? value : r.start,
                        field === 'end' ? value : r.end
                    );
                }
                return updated;
            })
        );
    };

    const addRow = () => {
        const newId = Date.now(); // More unique for dynamic rows
        setRows([
            ...rows,
            { id: newId, account: '', task: '', start: '', end: '', hours: 0 },
        ]);
    };

    const removeRow = (id: number | string) => {
        setRows((prev) => prev.filter((r) => r.id !== id));
    };

    const handleFormSubmit = async () => {
        if (submittingRef.current) return;
        submittingRef.current = true;
        setIsSubmitting(true);

        try {
            // Generate a key ONLY for new submissions, not for edits.
            const key = isEdit ? undefined : submissionKey;
            await onSubmit({
                date: reportDate,
                title: reportTitle,
                recipient: selectedRecipient,
                rows,
                idempotencyKey: key
            });
            setShowConfirm(false);
        } catch (error) {
            console.error("Submission failed:", error);
            submittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = () => {
        if (submittingRef.current) return;
        submittingRef.current = true;
        setIsSubmitting(true);

        try {
            if (onSaveDraft) {
                onSaveDraft({
                    date: reportDate,
                    title: reportTitle,
                    recipient: selectedRecipient,
                    rows,
                    idempotencyKey: submissionKey
                }).catch(error => {
                    console.error("Save draft failed:", error);
                    submittingRef.current = false;
                    setIsSubmitting(false);
                });
            } else {
                // Fallback logging if no callback provided
                console.log('Draft saved', submissionKey);
            }
        } catch (error) {
            console.error("Save draft failed:", error);
            submittingRef.current = false;
            setIsSubmitting(false);
        }
        // On success, the ref remains `true`, permanently disabling the button for this instance.
    };

    return (
        <div className="animate-in fade-in duration-500 space-y-5">
            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 py-2 gap-4">
                <div className="flex items-center gap-4">
                    <TableProperties className="h-5 w-5 text-foreground" />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="text-[10px] uppercase font-bold text-foreground/60 tracking-widest text-left">
                            {subtitle}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {!isEdit && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={handleSaveDraft} // Changed from alert
                            disabled={isSubmitting} // Disable when submitting
                            style={isSubmitting ? { pointerEvents: 'none' } : {}}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Draft'}
                        </Button>
                    )}
                    <Button
                        size="sm"
                        className="h-8 shadow-sm"
                        onClick={() => setShowConfirm(true)}
                        disabled={rows.length === 0 || !selectedRecipient || isSubmitting}
                        style={isSubmitting ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                    >
                        {isSubmitting ? 'Submitting...' : submitLabel}
                    </Button>
                </div>
            </div>

            {/* ── Metadata Bar ── */}
            <Card className="border-border">
                <CardContent className="py-3 px-4">
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Input
                                value={reportTitle}
                                onChange={(e) => setReportTitle(e.target.value)}
                                placeholder="Report title (optional)"
                                className="h-9 w-full sm:max-w-md text-sm font-medium bg-muted/20 focus:bg-card transition-colors"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Date (*)</span>
                                <Input
                                    type="date"
                                    value={reportDate}
                                    onChange={(e) => setReportDate(e.target.value)}
                                    className="h-7 w-[140px] text-xs"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Dept</span>
                                <span className="text-xs font-medium">Engineering</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Supervisor (*)</span>
                                <RecipientSelect value={selectedRecipient} onChange={setSelectedRecipient} className="h-7 w-[180px] text-xs" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ── Table ── */}
            <Card className="border-border">
                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2.5 w-[44px]">#</th>
                                    <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2.5 w-[20%]">Account (*)</th>
                                    <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2.5 w-[14%]">Task (*)</th>
                                    <th className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2.5 w-[70px]">Start (*)</th>
                                    <th className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2.5 w-[70px]">End (*)</th>
                                    <th className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2.5 w-[70px]">Time</th>
                                    <th className="w-[44px] px-2 py-2.5" />
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-16">
                                            <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                                <TableProperties className="h-8 w-8 opacity-30" />
                                                <p className="text-sm">No items yet</p>
                                                <Button size="sm" variant="outline" onClick={addRow} className="gap-2">
                                                    <Plus className="h-3.5 w-3.5" /> Add row
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    rows.map((row, idx) => (
                                        <tr key={row.id} className="border-b border-border transition-colors hover:bg-muted/30 group">
                                            <td className="text-center px-3 py-1.5"><span className="text-xs text-muted-foreground font-medium">{idx + 1}</span></td>
                                            <td className="px-2 py-1.5">
                                                <Input
                                                    value={row.account}
                                                    onChange={(e) => updateRow(row.id, 'account', e.target.value)}
                                                    className="h-8 text-sm border-transparent bg-transparent hover:border-input focus:border-input focus:bg-card"
                                                />
                                            </td>
                                            <td className="px-2 py-1.5">
                                                <Textarea
                                                    value={row.task}
                                                    onChange={(e) => updateRow(row.id, 'task', e.target.value)}
                                                    className="min-h-8 h-auto text-sm border-transparent bg-transparent hover:border-input focus:border-input focus:bg-card resize-none py-1 px-2"
                                                    rows={1}
                                                />
                                            </td>
                                            <td className="px-2 py-1.5">
                                                <Input
                                                    type="time"
                                                    value={row.start}
                                                    onChange={(e) => updateRow(row.id, 'start', e.target.value)}
                                                    className="h-8 text-xs text-center border-transparent bg-transparent hover:border-input focus:border-input focus:bg-card [color-scheme:dark]"
                                                />
                                            </td>
                                            <td className="px-2 py-1.5">
                                                <Input
                                                    type="time"
                                                    value={row.end}
                                                    onChange={(e) => updateRow(row.id, 'end', e.target.value)}
                                                    className="h-8 text-xs text-center border-transparent bg-transparent hover:border-input focus:border-input focus:bg-card [color-scheme:dark]"
                                                />
                                            </td>
                                            <td className="px-3 py-1.5 text-center">
                                                <Badge variant="secondary" className="text-[10px] font-bold h-5 px-1.5 bg-muted-foreground/10 text-muted-foreground border-none">
                                                    {formatTime(row.hours)}
                                                </Badge>
                                            </td>
                                            <td className="px-2 py-1.5">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeRow(row.id)}
                                                    className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 bg-muted/20 border-t border-border flex items-center justify-between">
                        <Button variant="ghost" size="sm" onClick={addRow} className="h-8 gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
                            <Plus className="h-3.5 w-3.5" /> Add Task Line
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Total Logged Time</span>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-foreground/70" />
                                    <span className="text-sm font-black tracking-tight">{formatTime(totalHours)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ── Confirm Dialog ── */}
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <TableProperties className="h-6 w-6 text-primary" />
                        </div>
                        <DialogTitle className="text-center">{isEdit ? 'Update Report' : 'Submit Report'}</DialogTitle>
                        <DialogDescription className="text-center">
                            {isEdit
                                ? 'Are you sure you want to save these changes to your accomplishment report?'
                                : 'This will submit your accomplishment report for review to your supervisor.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-muted/50 rounded-lg p-4 mt-2">
                        <div className="flex justify-between items-center text-sm border-b border-border pb-2 mb-2">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{reportDate}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Total Time:</span>
                            <span className="font-bold text-primary">{formatTime(totalHours)}</span>
                        </div>
                    </div>
                    <DialogFooter className="mt-4 gap-2 sm:gap-0">
                        <Button variant="outline" className="flex-1 h-10 font-semibold" onClick={() => setShowConfirm(false)} disabled={isSubmitting}>Review</Button>
                        <Button 
                            className="flex-1 h-10 font-semibold" 
                            onClick={handleFormSubmit} 
                            disabled={isSubmitting}
                            style={isSubmitting ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                        >
                            {isSubmitting ? 'Submitting...' : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
