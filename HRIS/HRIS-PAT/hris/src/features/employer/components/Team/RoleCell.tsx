import { useState } from 'react';
import { useNotify, useRefresh, useUpdate, useRecordContext } from 'ra-core';
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
import { Info, AlertCircle } from 'lucide-react';
import { ROLE_OPTIONS, type Employee } from './types';
import { getRoleSelectValue } from './utils';

export const RoleCell = () => {
    const record = useRecordContext<Employee>();
    const notify = useNotify();
    const refresh = useRefresh();
    const [update, { isLoading }] = useUpdate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingRole, setPendingRole] = useState<string | null>(null);

    if (!record) return null;

    const selectValue = getRoleSelectValue(record.roles);

    const handleUpdate = (newRole: string) => {
        update(
            'employees',
            {
                id: record.id,
                data: { role: newRole },
                previousData: record,
            },
            {
                onSuccess: () => {
                    notify(`Role updated to ${newRole}`, { type: 'success' });
                    setShowConfirm(false);
                    setPendingRole(null);
                    refresh();
                },
                onError: (error: Error | any) => {
                    notify(error?.message || 'Failed to update role', { type: 'error' });
                },
            }
        );
    };

    const onSelectChange = (newRole: string) => {
        if (newRole === selectValue) return;
        setPendingRole(newRole);
        setShowConfirm(true);
    };

    const cleanName = record.userName.includes(',') ? record.userName.split(',')[1].trim() : record.userName;
    const pendingRoleName = ROLE_OPTIONS.find(r => r.id === pendingRole)?.name;
    const currentRoleName = ROLE_OPTIONS.find(r => r.id === selectValue)?.name;

    return (
        <>
            <Select
                value={selectValue}
                onValueChange={onSelectChange}
                disabled={isLoading}
            >
                <SelectTrigger className="w-[140px] h-8 bg-transparent text-left">
                    <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                    {ROLE_OPTIONS.map(opt => (
                        <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-primary">
                            <Info className="h-5 w-5" />
                            Confirm Role Change
                        </DialogTitle>
                        <DialogDescription>
                            Administrative Role Change
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-4 animate-in fade-in zoom-in duration-300">
                            {/* Role Transition Header */}
                            <div className="flex gap-3">
                                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="space-y-1.5">
                                    <p className="text-sm font-bold text-amber-900 leading-tight">
                                        Confirming role transition for <span className="underline decoration-amber-500/30 underline-offset-4">{cleanName}</span>?
                                    </p>
                                    <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.15em] text-amber-700/70">
                                        <span>FROM: <span className="text-amber-900 bg-amber-900/5 px-1.5 py-0.5 rounded">{currentRoleName}</span></span>
                                        <span className="text-amber-400 font-normal">→</span>
                                        <span>TO: <span className="text-amber-900 bg-amber-900/10 px-1.5 py-0.5 rounded border border-amber-500/20">{pendingRoleName}</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Administrative Warnings Footer */}
                            <div className="pt-3.5 border-t border-amber-500/20 space-y-3">
                                <div className="flex gap-2">
                                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-amber-800/90 leading-normal font-medium">
                                        Changing this role will modify the user's base access permissions and system capabilities immediately.
                                    </p>
                                </div>

                                {(record.approvalTeamId || (record.approvalTeams && record.approvalTeams.length > 0)) && (
                                    <div className="p-2.5 rounded-lg bg-amber-900/5 border border-amber-500/10 space-y-1">
                                        <p className="text-[10px] font-bold text-amber-900 uppercase leading-tight flex items-center gap-1.5">
                                            <span className="h-1 w-1 rounded-full bg-amber-600" />
                                            Team Membership Warning
                                        </p>
                                        <p className="text-[11px] text-amber-800/70 leading-normal italic">
                                            This user is currently assigned to a team. Changing roles may reset or invalidate their current memberships.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" size="sm" onClick={() => setShowConfirm(false)}>Cancel</Button>
                            <Button 
                                size="sm" 
                                onClick={() => pendingRole && handleUpdate(pendingRole)} 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Updating...' : 'Confirm Change'}
                            </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
