import {
    ArrowLeft,
    ClipboardCheck,
    Pencil,
    Layers,
    Save,
    MessageSquare,
    CheckCircle,
    Undo2,
    Check,
    Eye,
    Clock,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
    getARStatusLabel,
    getARStatusClass,
    formatTime,
    formatTo12Hour,
    formatDateToWord,
    parseTimeToMinutes,
    getFirstNameFromFull,
    isAlreadyApproved
} from '../utils/ARReviewDetailUTILS';

/**
 * ARReviewComponents.tsx
 * 
 * Modular UI components for the AR Review Detail page.
 */

interface ReviewHeaderProps {
    isModifyMode: boolean;
    setIsModifyMode: (val: boolean) => void;
    isAdmin: boolean;
    onBack: () => void;
}

export const ReviewHeader = ({ isModifyMode, setIsModifyMode, isAdmin, onBack }: ReviewHeaderProps) => (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full hover:bg-muted">
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-bold tracking-tight text-foreground">Review Accomplishment Report</h1>
            </div>
        </div>
        {isAdmin && (
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                <Label htmlFor="modify-mode" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground cursor-pointer">Modify Mode</Label>
                <Switch id="modify-mode" checked={isModifyMode} onCheckedChange={setIsModifyMode} className="data-[state=checked]:bg-amber-500 scale-90" />
            </div>
        )}
    </div>
);

interface ReviewTableProps {
    record: any;
    accomplishments: any[];
    isModifyMode: boolean;
    editedTasks: any[];
    setEditedTasks: (val: any[]) => void;
    editedBreak: any;
    setEditedBreak: (val: any) => void;
    totalHours: { worked: number; break: number; total: number };
    isSubmitting: boolean;
    handleSaveCorrection: () => void;
}

export const ReviewTable = ({
    record,
    accomplishments,
    isModifyMode,
    editedTasks,
    setEditedTasks,
    editedBreak,
    setEditedBreak,
    totalHours,
    isSubmitting,
    handleSaveCorrection
}: ReviewTableProps) => (
    <Card className="border-border/40 shadow-sm overflow-hidden bg-card flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
            <Table>
                <TableHeader className="bg-muted/50 sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent border-border/40">
                        <TableHead className="w-[50px] text-center text-[11px] font-bold uppercase tracking-wider">#</TableHead>
                        <TableHead className="w-[20ch] min-w-[160px] text-[11px] font-bold uppercase tracking-wider">Account / Client</TableHead>
                        <TableHead className="text-[11px] font-bold uppercase tracking-wider min-w-[300px]">Task Description</TableHead>
                        <TableHead className="w-[110px] text-center text-[11px] font-bold uppercase tracking-wider">Window</TableHead>
                        <TableHead className="w-[90px] text-center text-[11px] font-bold uppercase tracking-wider">Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accomplishments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic text-sm">No accomplishments logged.</TableCell>
                        </TableRow>
                    ) : (
                        accomplishments.map((item: any, idx: number) => {
                            const startMin = parseTimeToMinutes(item.start);
                            const endMin = parseTimeToMinutes(item.end);
                            const hrs = !Number.isNaN(startMin) && !Number.isNaN(endMin) ? Math.max(0, (endMin - startMin) / 60) : 0;
                            return (
                                <TableRow key={idx} className="group hover:bg-muted/10 border-border/20 transition-colors">
                                    <TableCell className="text-center font-medium text-muted-foreground/60 text-xs">{idx + 1}</TableCell>
                                    <TableCell>
                                        {isModifyMode ? (
                                            <Input className="h-8 text-xs font-bold w-[20ch]" value={item.project} onChange={e => {
                                                const newTasks = [...editedTasks];
                                                newTasks[idx].project = e.target.value;
                                                setEditedTasks(newTasks);
                                            }} />
                                        ) : (
                                            <p className="font-bold text-foreground text-sm break-words whitespace-normal w-[20ch]">{item.project}</p>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {isModifyMode ? (
                                            <Textarea className="min-h-[40px] text-xs resize-y max-w-[300ch]" value={item.task || item.notes || ''} onChange={e => {
                                                const newTasks = [...editedTasks];
                                                newTasks[idx].task = e.target.value;
                                                setEditedTasks(newTasks);
                                            }} />
                                        ) : (
                                            <div className="text-sm text-foreground/80 leading-relaxed py-2 whitespace-pre-wrap break-words max-w-[300ch]">
                                                {item.task || item.notes || '—'}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {isModifyMode ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <Input type="time" className="h-7 text-xs px-2 w-24" value={item.start} onChange={e => {
                                                    const newTasks = [...editedTasks];
                                                    newTasks[idx].start = e.target.value;
                                                    setEditedTasks(newTasks);
                                                }} />
                                                <Input type="time" className="h-7 text-xs px-2 w-24" value={item.end} onChange={e => {
                                                    const newTasks = [...editedTasks];
                                                    newTasks[idx].end = e.target.value;
                                                    setEditedTasks(newTasks);
                                                }} />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <span className="text-xs font-medium text-foreground/70">{formatTo12Hour(item.start)}</span>
                                                <span className="text-xs font-medium text-foreground/70">{formatTo12Hour(item.end)}</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className="bg-muted/30 text-foreground/70 font-bold text-[11px] uppercase tabular-nums border-none h-5">{formatTime(hrs)}</Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}

                    {/* BREAK ROW */}
                    {((record.breakStartTime && record.breakEndTime) || record.breakDurationMinutes > 0) && (
                        <TableRow className="bg-muted/20 border-t border-border/50 transition-colors hover:bg-muted/30">
                            <TableCell className="text-center font-medium text-muted-foreground/60 text-xs">—</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 px-3 h-8 bg-primary/5 rounded border border-primary/10 w-fit">
                                    <Clock className="h-3.5 w-3.5 text-primary/70" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 whitespace-nowrap">BREAK</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <p className="text-[11px] text-muted-foreground font-medium italic">Scheduled daily break / rest period</p>
                            </TableCell>
                            <TableCell className="text-center">
                                {isModifyMode ? (
                                    <div className="flex flex-col items-center gap-1">
                                        <Input type="time" className="h-7 text-xs px-2 w-24" value={editedBreak.start} onChange={e => setEditedBreak({ ...editedBreak, start: e.target.value })} />
                                        <Input type="time" className="h-7 text-xs px-2 w-24" value={editedBreak.end} onChange={e => setEditedBreak({ ...editedBreak, end: e.target.value })} />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-medium text-foreground/70">{formatTo12Hour(record.breakStartTime)}</span>
                                        <span className="text-xs font-medium text-foreground/70">{formatTo12Hour(record.breakEndTime)}</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge variant="outline" className="bg-muted/40 text-foreground/70 font-bold text-[11px] uppercase tabular-nums border-none h-5">
                                    {formatTime((isModifyMode ? editedBreak.duration : record.breakDurationMinutes || 0) / 60)}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        {accomplishments.length > 0 && (
            <div className="p-3 bg-card border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5" /> {accomplishments.length} Items Logged
                    </span>
                    <div className="flex items-center gap-4 border-l border-border/50 pl-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Worked Hours</span>
                            <span className="text-xs font-bold text-foreground tabular-nums">{formatTime(totalHours.worked)}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Break</span>
                            <span className="text-xs font-bold text-muted-foreground tabular-nums">{formatTime(totalHours.break)}</span>
                        </div>
                        <div className="flex flex-col items-end border-l border-border/50 pl-3 ml-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Total Report</span>
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 font-bold text-[11px] h-5 px-2 tracking-wider tabular-nums rounded-sm border-none shadow-none">{formatTime(totalHours.total)}</Badge>
                        </div>
                    </div>
                </div>
                {isModifyMode && (
                    <div className="w-full md:w-auto flex justify-end">
                        <Button size="sm" onClick={handleSaveCorrection} disabled={isSubmitting} className="h-8 font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20">
                            {isSubmitting ? "Saving..." : <><Save className="h-3.5 w-3.5 mr-1.5" /> Save Corrections</>}
                        </Button>
                    </div>
                )}
            </div>
        )}
    </Card>
);

interface ReviewSidebarProps {
    record: any;
    initials: string;
    totalHours: { worked: number; break: number; total: number };
    canAction: boolean;
    isPureManagement: boolean;
    feedback: string;
    setFeedback: (val: string) => void;
    hasPermission: boolean;
    isSubmitting: boolean;
    setShowApproveConfirm: (val: boolean) => void;
    setShowReturnConfirm: (val: boolean) => void;
    notify: any;
}

export const ReviewSidebar = ({
    record,
    initials,
    totalHours,
    canAction,
    isPureManagement,
    feedback,
    setFeedback,
    hasPermission,
    isSubmitting,
    setShowApproveConfirm,
    setShowReturnConfirm,
    notify
}: ReviewSidebarProps) => (
    <div className="w-full lg:w-[360px] flex flex-col gap-3 shrink-0 overflow-auto">
        <Card className="border-border/40 shadow-sm overflow-hidden bg-card shrink-0">
            <div className="px-4 py-3 flex items-center justify-between bg-card border-b border-border">
                <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-8 w-8 border border-border/30 shadow-sm">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <h2 className="text-sm font-bold text-foreground truncate leading-none mb-1">{record.employee}</h2>
                        <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold text-[10px] uppercase tracking-wider py-0 px-1.5 h-4">{record.role || 'Team Member'}</Badge>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className={cn("border-none font-bold text-[10px] uppercase tracking-wider px-2 h-5 flex items-center gap-1 shrink-0", getARStatusClass(record?.status))}>
                        {getARStatusLabel(record)}
                    </Badge>
                    {record?.isModifiedByAdmin && (
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="text-amber-600">
                                        <Pencil className="h-3 w-3" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="left" className="bg-amber-600 text-white text-[10px] font-bold border-none">Modified by Admin</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border/20 border-b border-border/20">
                <div className="px-3 py-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Date</p>
                    <p className="text-xs font-bold text-foreground">{formatDateToWord(record.reportDate)}</p>
                </div>
                <div className="px-3 py-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Worked Hours</p>
                    <p className="text-xs font-bold text-foreground tabular-nums">{formatTime(totalHours.worked)}</p>
                </div>
            </div>
            {record.breakDurationMinutes > 0 && (
                <div className="grid grid-cols-2 divide-x divide-border/20 border-b border-border/20">
                    <div className="px-3 py-2.5 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Break Window</p>
                        <p className="text-xs font-bold text-foreground/80">
                            {record.breakStartTime ? formatTo12Hour(record.breakStartTime) : '—'} to {record.breakEndTime ? formatTo12Hour(record.breakEndTime) : '—'}
                        </p>
                    </div>
                    <div className="px-3 py-2.5 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">Total Report Hours</p>
                        <p className="text-xs font-bold text-primary tabular-nums">{formatTime(totalHours.total)}</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col">
                <div className="px-3 py-2 text-center border-t border-border/20">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Approver Team</p>
                    <p className="text-xs font-bold text-primary truncate px-1 uppercase">{record.approverTeam || 'No Team Assigned'}</p>
                </div>
            </div>
        </Card>


        <Card className="border-border/40 shadow-sm flex flex-col bg-card overflow-hidden flex-1 min-h-0">
            <div className="bg-card px-4 py-2.5 border-b border-border flex items-center gap-2 shrink-0">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground/70">Review Feedback</h3>
            </div>
            <div className="p-3.5 flex flex-col gap-3.5 flex-1 overflow-auto">
                {record.returnFeedback && (
                    <div className="p-3 bg-destructive/5 border-l-2 border-destructive/30 rounded-r text-[13px] leading-relaxed italic text-foreground/80 shrink-0">
                        <p className="font-bold uppercase text-[10px] mb-1 not-italic text-destructive tracking-wider">Previous Feedback</p>
                        "{record.returnFeedback}"
                    </div>
                )}
                {canAction ? (
                    <div className="flex-1 flex flex-col relative min-h-[120px] group/feedback">
                        <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Add feedback for the employee..." className="flex-1 bg-background border-border/40 focus:border-primary/40 transition-all rounded-lg text-sm p-3 pb-8 shadow-inner resize-none focus-visible:ring-0" />
                        <div className="absolute bottom-2 right-3 text-[10px] font-bold tracking-wider text-muted-foreground/40 uppercase pointer-events-none opacity-0 group-focus-within/feedback:opacity-100 transition-opacity duration-200">{feedback.trim().length} Chars</div>
                    </div>
                ) : isPureManagement ? (
                    <div className="flex-1 flex items-center justify-center p-6 text-center border-2 border-dashed border-muted rounded-xl">
                        <div className="flex flex-col items-center gap-2">
                            <Eye className="h-8 w-8 text-muted-foreground/40" />
                            <p className="text-xs font-medium text-muted-foreground">Management Access<br /><span className="text-[10px] opacity-60">Use the button below to acknowledge you have reviewed this report.</span></p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-6 text-center border-2 border-dashed border-muted rounded-xl">
                        <div className="flex flex-col items-center gap-2">
                            <AlertCircle className="h-8 w-8 text-muted-foreground/40" />
                            <p className="text-xs font-medium text-muted-foreground">{record && isAlreadyApproved(record) ? "Report Approved" : "View Only Access"}<br /><span className="text-[10px] opacity-60">{record && isAlreadyApproved(record) ? "This report has been finalized and can no longer be modified." : "You do not have permission to approve or return this report."}</span></p>
                        </div>
                    </div>
                )}
            </div>
            {hasPermission && (
                <div className="p-3.5 bg-card border-t border-border flex flex-col gap-2 shrink-0">
                    <Button
                        size="lg"
                        className={cn("w-full h-10 font-bold text-[11px] uppercase tracking-widest shadow-md transition-all active:scale-[0.98]", record && (isAlreadyApproved(record) || record.status?.toLowerCase() === 'returned') ? "bg-primary/60 text-primary-foreground cursor-not-allowed opacity-80" : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20")}
                        onClick={() => { if (record && !isAlreadyApproved(record) && record.status?.toLowerCase() !== 'returned') setShowApproveConfirm(true); }}
                        disabled={isSubmitting || (record ? (isAlreadyApproved(record) || record.status?.toLowerCase() === 'returned') : false)}
                    >
                        <Check className="h-4 w-4 mr-2" />
                        {record && isAlreadyApproved(record) ? `( Approved by ${getFirstNameFromFull(record.approvedByName || 'Admin')} )` : record && record.status?.toLowerCase() === 'returned' ? `( Returned by ${getFirstNameFromFull(record.returnedByName || 'Admin')} )` : 'Approve Report'}
                    </Button>
                    {record && !isAlreadyApproved(record) && (
                        <Button variant="ghost" size="lg" className="w-full h-9 font-bold text-[11px] uppercase tracking-widest text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all" onClick={() => { if (!feedback.trim()) { notify('Please provide feedback before returning for revision', { type: 'warning' }); return; } setShowReturnConfirm(true); }} disabled={isSubmitting}>
                            <Undo2 className="h-4 w-4 mr-2" /> Return for Revision
                        </Button>
                    )}
                </div>
            )}
        </Card>
    </div>
);

interface ReviewDialogsProps {
    record: any;
    showApproveConfirm: boolean;
    setShowApproveConfirm: (val: boolean) => void;
    showReturnConfirm: boolean;
    setShowReturnConfirm: (val: boolean) => void;
    isSubmitting: boolean;
    handleApprove: () => void;
    handleReturn: () => void;
}

export const ReviewDialogs = ({
    record,
    showApproveConfirm,
    setShowApproveConfirm,
    showReturnConfirm,
    setShowReturnConfirm,
    isSubmitting,
    handleApprove,
    handleReturn
}: ReviewDialogsProps) => (
    <>
        <Dialog open={showApproveConfirm} onOpenChange={setShowApproveConfirm}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-primary p-6 text-primary-foreground flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"><CheckCircle className="h-6 w-6 text-white" /></div>
                    <DialogTitle className="text-xl font-bold tracking-tight text-white mb-2">Confirm Approval</DialogTitle>
                    <DialogDescription className="text-white/80 text-sm">You are about to approve the report for <span className="font-bold text-white underline underline-offset-4 decoration-white/40">{record.employee}</span>.</DialogDescription>
                </div>
                <div className="p-6 bg-card flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1 h-10 font-bold uppercase tracking-wider text-[11px]" onClick={() => setShowApproveConfirm(false)}>Cancel</Button>
                    <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 font-bold uppercase tracking-wider text-[11px]" onClick={handleApprove} disabled={isSubmitting}>{isSubmitting ? "Processing..." : "Approve"}</Button>
                </div>
            </DialogContent>
        </Dialog>
        <Dialog open={showReturnConfirm} onOpenChange={setShowReturnConfirm}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-destructive p-6 text-destructive-foreground flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"><Undo2 className="h-6 w-6 text-white" /></div>
                    <DialogTitle className="text-xl font-bold tracking-tight text-white mb-2">Return for Revision</DialogTitle>
                    <DialogDescription className="text-white/80 text-sm">The report will be sent back to <span className="font-bold text-white">{record.employee}</span> for corrections.</DialogDescription>
                </div>
                <div className="p-6 bg-card flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1 h-10 font-bold uppercase tracking-wider text-[11px]" onClick={() => setShowReturnConfirm(false)}>Cancel</Button>
                    <Button variant="destructive" className="flex-1 h-10 font-bold uppercase tracking-wider text-[11px]" onClick={handleReturn} disabled={isSubmitting}>{isSubmitting ? "Returning..." : "Confirm Return"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    </>
);
