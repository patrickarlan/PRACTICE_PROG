import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Clock, AlertTriangle } from 'lucide-react';
import { TimePicker } from '@/components/TimePicker';
import { Badge } from '@/components/ui/badge';
import { AccomplishmentRow } from './types';
import { calcHours, calcOverlapMinutes } from './utils';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from '@/components/ui/tooltip';

interface AccomplishmentTableProps {
    rows: AccomplishmentRow[];
    setRows: React.Dispatch<React.SetStateAction<AccomplishmentRow[]>>;
    isReadOnly?: boolean;
    headerContent?: React.ReactNode;
    title?: string;
    setTitle?: (val: string) => void;
    breakStart?: string;
    setBreakStart?: (val: string) => void;
    breakEnd?: string;
    setBreakEnd?: (val: string) => void;
    breakDuration?: number;
    setBreakDuration?: (val: number) => void;
    showValidation?: boolean;
}

/**
 * Handles the tabular entry for accomplishment tasks, including validation states,
 * character limits, and layout refinements for wrapping text.
 */
export const AccomplishmentTable = ({
    rows, setRows, isReadOnly, headerContent, title, setTitle,
    breakStart, setBreakStart, breakEnd, setBreakEnd, breakDuration,
    showValidation
}: AccomplishmentTableProps) => {
    const addRow = () => {
        const nextId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
        setRows([...rows, { id: nextId, account: '', task: '', start: '', end: '', hours: 0 }]);
    };

    const removeRow = (id: number) => {
        if (rows.length === 1) {
            setRows([{ id: 1, account: '', task: '', start: '', end: '', hours: 0 }]);
        } else {
            setRows(rows.filter((r) => r.id !== id));
        }
    };

    const { redRowIds, yellowRowIds } = useMemo(() => {
        const reds = new Set<number>();
        const yellows = new Set<number>();

        // Task-Task Overlaps
        for (let i = 0; i < rows.length; i++) {
            for (let j = i + 1; j < rows.length; j++) {
                const r1 = rows[i];
                const r2 = rows[j];
                if (r1.start && r1.end && r2.start && r2.end) {
                    const overlap = calcOverlapMinutes(r1.start, r1.end, r2.start, r2.end);
                    if (overlap > 0) {
                        yellows.add(r1.id);
                        reds.add(r2.id);
                    }
                }
            }
        }
        return { redRowIds: reds, yellowRowIds: yellows };
    }, [rows]);

    const updateRow = (id: number, field: keyof AccomplishmentRow, value: string | number) => {
        setRows((prev) =>
            prev.map((r) => {
                if (r.id !== id) return r;
                const updated = { ...r, [field]: value };
                if (field === 'start' || field === 'end') {
                    updated.hours = calcHours(updated.start, updated.end);
                }
                return updated;
            })
        );
    };

    const totalRawHours = rows.reduce((sum, r) => sum + r.hours, 0);

    // Calculate how much of the break overlaps with actual tasks
    let breakOverlapMinutes = 0;
    let breakDurationHours = 0;
    if (breakStart && breakEnd) {
        breakDurationHours = calcHours(breakStart, breakEnd);
        rows.forEach(r => {
            if (r.start && r.end) {
                breakOverlapMinutes += calcOverlapMinutes(breakStart, breakEnd, r.start, r.end);
            }
        });
    }

    const netWorkedHours = totalRawHours - (breakOverlapMinutes / 60);
    const totalReportHours = netWorkedHours + breakDurationHours;



    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                {headerContent && (
                    <div className="flex items-center gap-4">
                        {headerContent}
                    </div>
                )}
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                {(title !== undefined || setTitle !== undefined) && (
                    <div className="px-4 py-2.5 border-b border-border bg-card flex items-start gap-3 flex-wrap sm:flex-nowrap">
                        <div className="flex items-start gap-3 flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap transition-colors mt-1">Report Title:</label>
                            <div className="flex-1 flex items-start gap-2 group/title">
                                <Textarea
                                    placeholder="e.g. Daily Accomplishment Report"
                                    value={title}
                                    onChange={e => setTitle?.(e.target.value)}
                                    readOnly={isReadOnly}
                                    maxLength={64}
                                    rows={1}
                                    className={`flex-1 min-h-[24px] py-0.5 resize-none text-[10px] font-bold uppercase tracking-wider bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none p-0 text-foreground placeholder:text-muted-foreground/50 transition-all ${showValidation && !title ? 'ring-1 ring-destructive/50 rounded px-2' : ''
                                        }`}
                                />
                                <span className="text-[9px] font-bold text-muted-foreground/30 tabular-nums whitespace-nowrap mt-1 opacity-0 group-focus-within/title:opacity-100 transition-opacity duration-200">
                                    {(title || '').length}/64
                                </span>
                            </div>
                        </div>


                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b">
                                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-[20ch] min-w-[160px]">Account/Project</th>
                                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground min-w-[300px]">Task and Deliverables</th>
                                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-[120px]">Start</th>
                                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-[120px]">End</th>
                                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-[80px] text-center">Hours</th>
                                {!isReadOnly && <th className="px-4 py-3 w-[50px]"></th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {rows.map((row) => {
                                const hasOverlap = redRowIds.has(row.id) || yellowRowIds.has(row.id);
                                const rowContent = (
                                    <tr key={row.id} className={`group border-b border-border/40 transition-colors ${redRowIds.has(row.id) ? 'bg-destructive/5' : yellowRowIds.has(row.id) ? 'bg-amber-500/5' : 'hover:bg-muted/20'}`}>
                                        <td className="px-3 py-3 align-top">
                                            <div className="relative group/account w-[20ch]">
                                                <Textarea
                                                    placeholder="Project name..."
                                                    value={row.account}
                                                    onChange={(e) => updateRow(row.id, 'account', e.target.value)}
                                                    readOnly={isReadOnly}
                                                    maxLength={64}
                                                    className={`min-h-[36px] pr-12 py-2 resize-none bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none text-sm font-medium transition-all break-words ${showValidation && !row.account ? 'ring-1 ring-destructive/40 rounded-md' : ''
                                                        }`}
                                                />
                                                {!isReadOnly && (
                                                    <span className="absolute bottom-1 right-2 text-[9px] font-bold text-muted-foreground/40 pointer-events-none opacity-0 group-focus-within/account:opacity-100 group-focus-within/account:text-primary/40 transition-all duration-200">
                                                        {(row.account || '').length}/64
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 align-top">
                                            <div className="relative group/task max-w-[300ch]">
                                                <Textarea
                                                    placeholder="What did you work on?"
                                                    value={row.task}
                                                    onChange={(e) => updateRow(row.id, 'task', e.target.value)}
                                                    readOnly={isReadOnly}
                                                    maxLength={300}
                                                    className={`min-h-[36px] pr-12 py-2 resize-none bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/20 shadow-none text-sm transition-all break-words ${showValidation && !row.task ? 'ring-1 ring-destructive/40 rounded-md' : ''
                                                        }`}
                                                />
                                                {!isReadOnly && (
                                                    <span className="absolute bottom-1 right-2 text-[9px] font-bold text-muted-foreground/40 pointer-events-none opacity-0 group-focus-within/task:opacity-100 group-focus-within/task:text-primary/40 transition-all duration-200">
                                                        {(row.task || '').length}/300
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 align-top">
                                            <TimePicker
                                                value={row.start}
                                                onChange={(val) => updateRow(row.id, 'start', val)}
                                                disabled={isReadOnly}
                                                className={`h-9 transition-all ${showValidation && !row.start ? 'border-destructive/60' : ''
                                                    } ${redRowIds.has(row.id) ? 'border-destructive/60 bg-destructive/10 ring-1 ring-destructive/10' : yellowRowIds.has(row.id) ? 'border-amber-500/60 bg-amber-500/10 ring-1 ring-amber-500/10' : ''}`}
                                            />
                                        </td>
                                        <td className="px-3 py-3 align-top">
                                            <TimePicker
                                                value={row.end}
                                                onChange={(val) => updateRow(row.id, 'end', val)}
                                                disabled={isReadOnly}
                                                className={`h-9 transition-all ${showValidation && (!row.end || row.hours <= 0) ? 'border-destructive/60' : ''
                                                    } ${redRowIds.has(row.id) ? 'border-destructive/60 bg-destructive/10 ring-1 ring-destructive/10' : yellowRowIds.has(row.id) ? 'border-amber-500/60 bg-amber-500/10 ring-1 ring-amber-500/10' : ''}`}
                                            />
                                        </td>
                                        <td className="px-3 py-3 align-top">
                                            <div className="h-9 flex items-center justify-center">
                                                <span className={`text-sm font-bold transition-colors ${showValidation && row.hours <= 0 ? 'text-destructive/80' : 'text-foreground'
                                                    }`}>
                                                    {row.hours > 0 ? row.hours : '—'}
                                                </span>
                                            </div>
                                        </td>
                                        {!isReadOnly && (
                                            <td className="px-3 py-3 align-top w-[50px]">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeRow(row.id)}
                                                    className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        )}
                                    </tr>
                                );

                                if (hasOverlap) {
                                    return (
                                        <TooltipProvider key={row.id}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    {rowContent}
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className={`${redRowIds.has(row.id) ? 'bg-destructive text-destructive-foreground' : 'bg-amber-500 text-amber-950'} text-[11px] font-bold border-none shadow-lg py-2 px-3 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200`}>
                                                    <AlertTriangle className="h-3.5 w-3.5" />
                                                    {redRowIds.has(row.id) ? 'This task causes an overlap with a previous task' : 'This task is being overlapped by a subsequent task'}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    );
                                }
                                return rowContent;
                            })}

                            {/* BREAK ROW */}
                            {(setBreakStart || breakStart) && (
                                <tr className="bg-muted/30 border-t border-border/50 transition-colors hover:bg-muted/40">
                                    <td className="px-3 py-3 align-middle">
                                        <div className={cn(
                                            "flex items-center gap-2 px-3 h-9 rounded border w-fit transition-all",
                                            showValidation && (!breakStart || !breakEnd) 
                                                ? "bg-destructive/10 border-destructive/50 text-destructive shadow-[0_0_8px_rgba(239,68,68,0.2)]" 
                                                : "bg-primary/5 border-primary/10 text-primary/80"
                                        )}>
                                            <Clock className="h-3.5 w-3.5" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                                                BREAK <span className="text-destructive">*</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        <p className="text-[11px] text-muted-foreground font-medium italic px-2">Scheduled daily break / rest period (required)</p>
                                    </td>
                                    <td className="px-3 py-3 align-top">
                                        <TimePicker
                                            value={breakStart || ''}
                                            onChange={val => setBreakStart?.(val)}
                                            disabled={isReadOnly}
                                            className={cn("h-9", showValidation && !breakStart && "border-destructive/60 ring-1 ring-destructive/10")}
                                        />
                                    </td>
                                    <td className="px-3 py-3 align-top">
                                        <TimePicker
                                            value={breakEnd || ''}
                                            onChange={val => setBreakEnd?.(val)}
                                            disabled={isReadOnly}
                                            className={cn("h-9", showValidation && !breakEnd && "border-destructive/60 ring-1 ring-destructive/10")}
                                        />
                                    </td>
                                    <td className="px-3 py-3 align-top">
                                        <div className="h-9 flex items-center justify-center">
                                            <span className="text-sm font-bold text-foreground">
                                                {breakDuration && breakDuration > 0 ? (breakDuration / 60).toFixed(2).replace(/\.00$/, '') : '—'}
                                            </span>
                                        </div>
                                    </td>
                                    {!isReadOnly && <td className="px-3 py-3 w-[50px]"></td>}
                                </tr>
                            )}

                            {!isReadOnly && (
                                <tr className="hover:bg-transparent transition-colors">
                                    <td colSpan={6} className="px-3 py-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={addRow}
                                            className="h-8 w-fit text-muted-foreground hover:text-primary hover:bg-primary/5 gap-2 font-bold text-[10px] uppercase tracking-wider ml-1"
                                        >
                                            <Plus className="h-4 w-4 text-primary" />
                                            Add Task
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="bg-muted/5 border-t-2 border-border">
                                <td colSpan={4} className="px-6 py-4">
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Worked Hours</span>
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Break Hours</span>
                                        <div className="h-px w-24 bg-border/50 my-1" />
                                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Total Report Hours</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <div className="flex flex-col gap-2 items-center">
                                        <span className={cn(
                                            "text-sm font-bold transition-colors tabular-nums",
                                            netWorkedHours >= 7.999 
                                                ? "text-emerald-600" 
                                                : showValidation 
                                                    ? "text-destructive underline decoration-2 underline-offset-4" 
                                                    : "text-foreground"
                                        )}>
                                            {netWorkedHours.toFixed(2)}
                                        </span>
                                        <span className="text-sm font-bold text-muted-foreground tabular-nums">
                                            {breakDurationHours.toFixed(2)}
                                        </span>
                                        <div className="h-px w-8 bg-border/50 my-1" />
                                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold text-[13px] h-6 px-3 tracking-wider tabular-nums rounded-sm">
                                            {totalReportHours.toFixed(2)}
                                        </Badge>
                                    </div>
                                </td>
                                {!isReadOnly && <td></td>}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};
