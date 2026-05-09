import { useState } from 'react';
import { useNotify, useRefresh, useUpdate, useRecordContext, useGetList } from 'ra-core';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter,
    DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Info, AlertCircle } from 'lucide-react';
import { type Employee } from './types';

export const ApprovalTeamCell = () => {
    const record = useRecordContext<Employee>();
    const notify = useNotify();
    const refresh = useRefresh();
    const [update, { isLoading }] = useUpdate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingTeamId, setPendingTeamId] = useState<string | null>(null);

    const { data: teams, isPending: teamsLoading } = useGetList('ApprovalTeams', { 
        pagination: { page: 1, perPage: 100 } 
    });

    if (!record) return null;

    const currentTeamId = record.approvalTeamId?.toString() || 'none';

    const handleUpdate = (newTeamId: string) => {
        const teamIdValue = newTeamId === 'none' ? null : parseInt(newTeamId);
        
        update(
            'employees',
            {
                id: record.id,
                data: { approvalTeamId: teamIdValue },
                previousData: record,
            },
            {
                onSuccess: () => {
                    notify('Approval team updated', { type: 'success' });
                    setShowConfirm(false);
                    setPendingTeamId(null);
                    refresh();
                },
                onError: (error: Error | any) => {
                    notify(error?.message || 'Failed to update team', { type: 'error' });
                },
            }
        );
    };

    const onSelectChange = (newTeamId: string) => {
        if (newTeamId === currentTeamId) return;
        setPendingTeamId(newTeamId);
        setShowConfirm(true);
    };

    const cleanName = record.userName.includes(',') ? record.userName.split(',')[1].trim() : record.userName;
    const pendingTeamName = pendingTeamId === 'none' ? 'None' : teams?.find(t => t.id.toString() === pendingTeamId)?.name;
    const currentTeamName = currentTeamId === 'none' ? 'None' : teams?.find(t => t.id.toString() === currentTeamId)?.name;

    if (record.isAdmin) {
        return (
            <div className="flex items-center justify-center gap-1.5 px-3 h-7 text-[10px] font-bold tracking-wider text-primary uppercase bg-primary/5 rounded-md border border-primary/20 w-[160px]">
                <ShieldCheck className="h-3 w-3" />
                <span className="truncate">ALL</span>
            </div>
        );
    }

    if (record.isManagement) {
        const managedTeams = record.approvalTeams?.filter(at => at.role === 'Approver') || [];
        const label = managedTeams.length === 1 ? managedTeams[0].teamName : 'NONE';
        const isMultiple = managedTeams.length > 1;

        return (
            <div className="space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 px-3 h-7 text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-500/5 rounded-md border border-blue-500/20 w-[160px] truncate" title={label}>
                    <ShieldCheck className="h-3 w-3 shrink-0" />
                    <span className="truncate">{label}</span>
                </div>
                {/* Only show additional badges if there are multiple teams */}
                {isMultiple && managedTeams.map((at, idx) => (
                    <div 
                        key={idx} 
                        className="flex items-center justify-center gap-1.5 px-2 h-6 text-[9px] font-bold tracking-tight text-emerald-600 uppercase bg-emerald-500/5 rounded-md border border-emerald-500/20 w-[160px] truncate"
                        title={`Approver for ${at.teamName}`}
                    >
                        <ShieldCheck className="h-3 w-3" />
                        {at.teamName}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="space-y-1.5">
                {/* Main Assignment (Member Role) */}
                <Select
                    value={currentTeamId}
                    onValueChange={onSelectChange}
                    disabled={isLoading || teamsLoading}
                >
                    <SelectTrigger className="w-[160px] h-7 bg-transparent text-[10px] font-medium border-dashed hover:border-solid transition-all">
                        <SelectValue placeholder="No Team (Member)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none" className="text-muted-foreground italic">None (Unassigned)</SelectItem>
                        {teams?.filter(t => {
                            // PHASE 24: Critical Guard - Don't allow a user to be a MEMBER of a team they APPROVE
                            const isApproverForThisTeam = record.approvalTeams?.some(at => at.teamId === t.id && at.role === 'Approver');
                            return !isApproverForThisTeam;
                        }).map(t => (
                            <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Approver Assignments (Phase 23) */}
                {record.approvalTeams?.filter(at => at.role === 'Approver').map((at, idx) => (
                    <div 
                        key={idx} 
                        className="flex items-center justify-center gap-1.5 px-3 h-7 text-[9px] font-bold tracking-tight text-emerald-600 uppercase bg-emerald-500/5 rounded-md border border-emerald-500/20 w-[160px] truncate"
                        title={`Approver for ${at.teamName}`}
                    >
                        <ShieldCheck className="h-3 w-3 shrink-0" />
                        <span className="truncate">{at.teamName}</span>
                    </div>
                ))}
            </div>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent className="sm:max-w-[420px] overflow-hidden p-0 border-none shadow-2xl">
                    <div className="p-6 space-y-6">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-primary">
                                <ShieldCheck className="h-5 w-5" />
                                Change Approval Team
                            </DialogTitle>
                            <DialogDescription>
                                Routing and Approval Workflow Update
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-4 animate-in fade-in zoom-in duration-300">
                            {/* Team Transition Header */}
                            <div className="flex gap-3">
                                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="space-y-1.5">
                                    <p className="text-sm font-bold text-amber-900 leading-tight">
                                        Assign <span className="underline decoration-amber-500/30 underline-offset-4">{cleanName}</span> to a different team?
                                    </p>
                                    <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.15em] text-amber-700/70">
                                        <span>FROM: <span className="text-amber-900 bg-amber-900/5 px-1.5 py-0.5 rounded">{currentTeamName}</span></span>
                                        <span className="text-amber-400 font-normal">→</span>
                                        <span>TO: <span className="text-amber-900 bg-amber-900/10 px-1.5 py-0.5 rounded border border-amber-500/20">{pendingTeamName}</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Administrative Note Footer */}
                            <div className="pt-3.5 border-t border-amber-500/20">
                                <div className="flex gap-2">
                                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-amber-800/90 leading-normal font-medium italic">
                                        Note: This will change where their reports are routed immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="bg-muted/30 px-6 py-4 border-t flex items-center justify-end gap-3">
                        <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)} className="h-8 font-semibold">
                            Cancel
                        </Button>
                        <Button 
                            size="sm" 
                            className="h-8 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4"
                            onClick={() => pendingTeamId && handleUpdate(pendingTeamId)} 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Confirm Assignment'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
