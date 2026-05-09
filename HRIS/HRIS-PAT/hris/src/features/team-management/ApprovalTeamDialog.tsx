import { useState, useEffect, useRef, useMemo } from 'react';
import { useNotify, useRefresh, useCreate, useUpdate, useGetList } from 'ra-core';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Plus, Trash2, Users, ListOrdered, GripVertical } from 'lucide-react';
import { ApprovalTeam, Approver, sortApprovers } from '@/features/team-management/approvalTeamUtils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

interface ApprovalTeamDialogProps {
    record?: ApprovalTeam;
    open: boolean;
    onClose: () => void;
}

export const ApprovalTeamDialog = ({ record, open, onClose }: ApprovalTeamDialogProps) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const [create] = useCreate();
    const [update] = useUpdate();

    // Fetch employees and existing teams for uniqueness check
    const { data: employees } = useGetList('employees', { pagination: { page: 1, perPage: 1000 } });
    const { data: allTeams } = useGetList('ApprovalTeams', { pagination: { page: 1, perPage: 1000 } });

    // 1. Memoize the base list of allowed employees (Approvers/Viewers)
    const allowedEmployees = useMemo(() => {
        return employees?.filter(emp => emp.accessLevel === 'APPROVER' || emp.accessLevel === 'VIEWER') || [];
    }, [employees]);

    // 2. Memoize the team names for uniqueness check to avoid scanning on every render
    const teamNamesSet = useMemo(() => {
        return new Set(allTeams?.filter(t => t.id !== record?.id).map(t => t.name.toLowerCase()) || []);
    }, [allTeams, record?.id]);

    const isEdit = Boolean(record?.id);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [approvers, setApprovers] = useState<(Approver & { id: string })[]>([]);
    const [saving, setSaving] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Check for name uniqueness with debouncing
    useEffect(() => {
        if (!name.trim() || name.trim().length < 2) {
            setNameError(null);
            return;
        }

        const timer = setTimeout(() => {
            const exists = teamNamesSet.has(name.trim().toLowerCase());
            setNameError(exists ? 'This team name is already taken' : null);
        }, 300);

        return () => clearTimeout(timer);
    }, [name, teamNamesSet]);

    useEffect(() => {
        if (record?.approvers) {
            setApprovers(sortApprovers(record.approvers).map(a => ({
                ...a,
                id: Math.random().toString(36).substring(7)
            })));
        } else {
            setApprovers([]);
        }

        if (record?.name) {
            setName(record.name);
        } else {
            setName('');
        }
    }, [record, open]);

    const handleAddApprover = () => {
        setApprovers([...approvers, {
            userId: '',
            userName: '',
            order: approvers.length + 1,
            id: Math.random().toString(36).substring(7)
        }]);
    };

    const handleRemoveApprover = (index: number) => {
        setApprovers(approvers.filter((_, i) => i !== index));
    };

    const handleApproverChange = (index: number, field: keyof Approver, value: any) => {
        const newApprovers = [...approvers];
        newApprovers[index] = { ...newApprovers[index], [field]: value };

        // Auto-sync userName if userId changes
        if (field === 'userId' && employees) {
            const emp = employees.find(e => e.id === value);
            if (emp) {
                newApprovers[index].userName = emp.userName || emp.fullName || 'Unknown';
            }
        }

        setApprovers(newApprovers);
    };

    // --- DRAG AND DROP LOGIC ---
    const dropIndex = useRef<number | null>(null);
    const x = useRef<number | null>(null);
    const y = useRef<number | null>(null);

    const handleDocumentDragOver = (event: DragEvent) => {
        x.current = event.clientX;
        y.current = event.clientY;
    };

    const handleDragStart = () => {
        document.addEventListener("dragover", handleDocumentDragOver as EventListener);
    };

    const handleDrag = (event: React.DragEvent) => {
        const selectedItem = event.target as HTMLElement;
        selectedItem.dataset.dragActive = "true";
        const list = selectedItem.closest("ul");
        if (x.current == null || y.current == null || !list) return;

        const elementAtDragCoordinates = document.elementFromPoint(x.current, y.current);
        let dropItem = elementAtDragCoordinates === null ? selectedItem : elementAtDragCoordinates.closest("li");

        if (!dropItem || dropItem === selectedItem) return;

        const dropItemParent = dropItem.parentNode;
        if (dropItemParent instanceof HTMLElement && list === dropItemParent.closest("ul")) {
            const dataIndex = dropItem.dataset.index;
            if (dataIndex) {
                dropIndex.current = parseInt(dataIndex, 10);
            }
            if (dropItem === selectedItem.nextSibling) {
                dropItem = dropItem.nextSibling as HTMLElement;
            }
            list.insertBefore(selectedItem, dropItem);
        }
    };

    const handleDragEnd = (event: React.DragEvent) => {
        const selectedItem = event.target as HTMLElement;
        const list = selectedItem.closest("ul");

        if (dropIndex.current !== null && list) {
            const dragIndex = parseInt(selectedItem.dataset.index!, 10);
            const newApprovers = [...approvers];
            const [movedItem] = newApprovers.splice(dragIndex, 1);
            newApprovers.splice(dropIndex.current, 0, movedItem);

            // Re-calculate orders based on new positions
            const updatedApprovers = newApprovers.map((a, i) => ({
                ...a,
                order: i + 1
            }));

            setApprovers(updatedApprovers);
        }

        selectedItem.dataset.dragActive = "false";
        document.removeEventListener("dragover", handleDocumentDragOver as EventListener);
        dropIndex.current = null;
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };
    // --- END DRAG AND DROP ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            notify('Team name is required', { type: 'error' });
            return;
        }
        if (approvers.length === 0) {
            notify('At least one approver is required', { type: 'error' });
            return;
        }

        const hasEmptyApprover = (approvers as any[]).some(a => !a.userId);
        if (hasEmptyApprover) {
            notify('Please select a user for all approver steps', { type: 'error' });
            return;
        }

        setSaving(true);
        const data = {
            Id: record?.id, // Include the ID for updates
            name,
            approvers: (sortApprovers(approvers) as any[]).map(({ id, ...a }) => a),
            members: (record?.members || []).map(({ id, ...m }: any) => m)
        };

        try {
            if (isEdit) {
                // Optimistic update for instant UI feedback
                await update(
                    'ApprovalTeams',
                    { id: record!.id, data, previousData: record },
                    { mutationMode: 'optimistic' }
                );
                notify('Approval Team updated successfully', { type: 'success' });
            } else {
                // Create remains pessimistic to ensure we get the new ID correctly
                await create('ApprovalTeams', { data });
                notify('Approval Team created successfully', { type: 'success' });
            }
            refresh();
            onClose();
        } catch (err: any) {
            notify(err.message || 'Failed to save team', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ApprovalTeams/${record?.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            if (res.ok) {
                notify('Team deleted successfully', { type: 'success' });
                refresh();
                onClose();
            } else {
                notify('Failed to delete team', { type: 'error' });
            }
        } catch (err) {
            notify('An error occurred during deletion', { type: 'error' });
        } finally {
            setDeleting(false);
            setDeleteConfirmOpen(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        <DialogHeader className="p-6 bg-card border-b relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                <div className="absolute top-[-50%] right-[-10%] w-[200px] h-[200px] rounded-full bg-primary/5 blur-[40px]" />
                            </div>

                            <div className="relative z-10 flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-sm text-primary">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <DialogTitle className="text-lg font-black uppercase tracking-tight">
                                        {isEdit ? 'Edit Approval Routing' : 'New Approval Team'}
                                    </DialogTitle>
                                    <DialogDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-0.5">
                                        {isEdit ? `Modifying ${record?.name}` : 'Establish a primary & backup approval pool'}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-background/50">
                            {/* Team Name Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Users className="size-3.5" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Team Identity</h3>
                                </div>
                                <div className="grid gap-1.5">
                                    <div className="flex items-center justify-between ml-1">
                                        <Label className="text-[10px] font-bold text-muted-foreground uppercase">Team Name</Label>
                                        <span className={cn("text-[10px] font-bold uppercase tabular-nums", name.length >= 25 ? "text-destructive" : "text-muted-foreground/50")}>
                                            {name.length}/25
                                        </span>
                                    </div>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Finance Dept, IT Approvers"
                                        className={`h-11 rounded-xl bg-card border-border shadow-sm focus:ring-primary/20 ${nameError ? 'border-destructive focus:ring-destructive/20' : ''}`}
                                        required
                                        maxLength={25}
                                    />
                                    {nameError && (
                                        <p className="text-[10px] font-bold text-destructive uppercase tracking-tighter ml-1 animate-in fade-in slide-in-from-top-1">
                                            {nameError}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Approvers Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-primary">
                                        <ListOrdered className="size-3.5" />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Primary & Backup Hierarchy</h3>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddApprover}
                                        className="h-7 text-[10px] font-bold uppercase tracking-wider rounded-lg border-primary/20 text-primary hover:bg-primary/5"
                                    >
                                        <Plus className="mr-1 size-3" /> Add Approver
                                    </Button>
                                </div>

                                <div className="relative flex gap-4">
                                    {/* Fixed Background Slot Numbers */}
                                    <div className="flex flex-col gap-3 py-0.5 shrink-0">
                                        {approvers.map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-center size-9 rounded-xl bg-muted/30 text-[11px] font-black text-muted-foreground/40 border border-transparent shrink-0 h-[66px]"
                                            >
                                                #{i + 1}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Draggable Members List */}
                                    <ul className="flex-1 space-y-3 min-h-[66px]">
                                        {approvers.length === 0 ? (
                                            <div className="py-8 text-center border border-dashed rounded-2xl bg-muted/10 h-full flex items-center justify-center">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">No approvers defined yet</p>
                                            </div>
                                        ) : (
                                            approvers.map((approver) => (
                                                <li
                                                    key={approver.id}
                                                    draggable
                                                    onDrag={handleDrag}
                                                    onDragStart={handleDragStart}
                                                    onDragEnd={handleDragEnd}
                                                    onDragOver={handleDragOver}
                                                    data-index={approvers.indexOf(approver)}
                                                    className="group flex items-center gap-4 p-3 h-[66px] rounded-2xl border bg-card shadow-sm hover:border-primary/30 transition-all data-[drag-active=true]:opacity-20 data-[drag-active=true]:border-dashed data-[drag-active=true]:border-primary"
                                                >
                                                    {/* Drag Handle */}
                                                    <div className="cursor-move flex items-center justify-center p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors shrink-0">
                                                        <GripVertical className="size-4" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <Select
                                                            value={approver.userId}
                                                            onValueChange={(val) => handleApproverChange(approvers.indexOf(approver), 'userId', val)}
                                                        >
                                                            <SelectTrigger className="h-12 w-full border-none bg-transparent shadow-none focus:ring-0 px-2 text-sm font-bold hover:bg-muted/30 transition-all rounded-xl cursor-pointer">
                                                                <div className="flex items-center gap-2 overflow-hidden pointer-events-none">
                                                                    <SelectValue placeholder="Select team approver..." />
                                                                </div>
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-xl shadow-xl border-border min-w-[240px] z-[9999]">
                                                                {allowedEmployees.filter(emp => {
                                                                    const isSelectedElsewhere = approvers.some(a => a.userId === emp.id && a.id !== approver.id);
                                                                    if (isSelectedElsewhere) return false;
                                                                    const isMemberOfThisTeam = record?.members?.some(m => m.userId === emp.id);
                                                                    if (isMemberOfThisTeam) return false;
                                                                    return true;
                                                                }).length === 0 ? (
                                                                    <SelectItem value="none" disabled className="py-6 px-2 text-center select-none pointer-events-none opacity-50">
                                                                        <div className="flex flex-col items-center justify-center w-full">
                                                                            <p className="text-[10px] font-black uppercase tracking-widest">No users available</p>
                                                                            <p className="text-[9px] font-bold mt-1 uppercase tracking-tighter">All eligible approvers are already assigned</p>
                                                                        </div>
                                                                    </SelectItem>
                                                                ) : (
                                                                    allowedEmployees.filter(emp => {
                                                                        const isSelectedElsewhere = approvers.some(a => a.userId === emp.id && a.id !== approver.id);
                                                                        if (isSelectedElsewhere) return false;
                                                                        const isMemberOfThisTeam = record?.members?.some(m => m.userId === emp.id);
                                                                        if (isMemberOfThisTeam) return false;
                                                                        return true;
                                                                    }).map(emp => (
                                                                        <SelectItem key={emp.id} value={emp.id} className="text-xs py-2.5 rounded-lg focus:bg-primary/5 cursor-pointer">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="size-7 rounded-full bg-primary/5 flex items-center justify-center text-[10px] font-black text-primary/60 border border-primary/10">
                                                                                    {(emp.userName || emp.fullName || '?').charAt(0).toUpperCase()}
                                                                                </div>
                                                                                <div className="flex flex-col">
                                                                                    <span className="font-bold text-foreground">
                                                                                        {emp.userName || emp.fullName}
                                                                                    </span>
                                                                                    <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter opacity-70">
                                                                                        {emp.department || 'No Department'} • {emp.accessLevel}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </SelectItem>
                                                                    ))
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRemoveApprover(approvers.indexOf(approver))}
                                                        className="size-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 shrink-0"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-4 bg-muted/20 border-t gap-2 flex flex-row items-center justify-between">
                            <div>
                                {isEdit && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            const hasMembers = record?.members && record.members.length > 0;
                                            if (hasMembers) {
                                                notify('Migrate assigned members to another team before deleting this row', { type: 'error' });
                                                return;
                                            }
                                            setDeleteConfirmOpen(true);
                                        }}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/5 rounded-xl text-[10px] font-black uppercase tracking-widest h-10 px-4"
                                    >
                                        <Trash2 className="mr-2 size-3" /> Delete Team
                                    </Button>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl text-xs font-bold uppercase tracking-widest h-10 px-6">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={saving || !!nameError}
                                    className="rounded-xl text-xs font-bold uppercase tracking-widest h-10 px-8 shadow-lg shadow-primary/20"
                                >
                                    {saving ? 'Processing...' : (isEdit ? 'Update Team' : 'Establish Team')}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmDialog
                open={deleteConfirmOpen}
                loading={deleting}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Approval Team"
                description={`This will permanently remove the "${record?.name}" routing sequence. This action cannot be undone.`}
            />
        </>
    );
};
