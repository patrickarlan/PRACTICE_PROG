import { useState, useEffect, useMemo } from 'react';
import { useNotify, useRefresh, useUpdate, useGetList, useGetOne } from 'ra-core';
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
import { Users, Search, Check, X, Building2, FilterX } from 'lucide-react';
import { ApprovalTeam } from '@/features/team-management/approvalTeamUtils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

// Memoized row component to prevent list-wide lag
const EmployeeRow = React.memo(({ emp, isSelected, onToggle }: { emp: any, isSelected: boolean, onToggle: () => void }) => {
    return (
        <div
            onClick={onToggle}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'
                }`}
        >
            <div className={`size-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30'
                }`}>
                {isSelected && <Check className="size-3 stroke-[4]" />}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate group-hover:text-primary transition-colors flex items-center gap-2">
                    {emp.userName || emp.fullName}
                    {emp.accessLevel?.toUpperCase() === 'APPROVER' ? (
                        <Badge variant="secondary" className="text-[8px] h-4 px-1.5 rounded-sm bg-orange-500/10 text-orange-600 border-orange-500/20 font-black">APPROVER</Badge>
                    ) : (
                        <Badge variant="secondary" className="text-[8px] h-4 px-1.5 rounded-sm bg-blue-500/10 text-blue-600 border-blue-500/20 font-black">CREATOR</Badge>
                    )}
                    <span className="text-[10px] font-mono text-muted-foreground/60 font-bold ml-auto tracking-tighter">
                        {emp.id.substring(0, 8)}
                    </span>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase font-medium">
                    {emp.department || 'No Department'}
                </div>
            </div>
        </div>
    );
}, (prev, next) => prev.isSelected === next.isSelected && prev.emp.id === next.emp.id);

interface ApprovalTeamMembersDialogProps {
    record?: ApprovalTeam;
    open: boolean;
    onClose: () => void;
}

/**
 * Simplified dialog for ONLY managing team members (Creators).
 * Used when clicking the "Assigned Users" badge in the list.
 */
export const ApprovalTeamMembersDialog = ({ record, open, onClose }: ApprovalTeamMembersDialogProps) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const [update] = useUpdate();

    // 1. Fetch the LATEST fresh record of this team (Optimized: enabled only when open)
    const { data: freshRecord } = useGetOne('ApprovalTeams', 
        { id: record?.id }, 
        { enabled: open && !!record?.id, refetchOnWindowFocus: false }
    );

    // These use cached data from the parent List component
    const { data: employees } = useGetList('employees', { pagination: { page: 1, perPage: 1000 } });
    const { data: departments } = useGetList('Departments', { pagination: { page: 1, perPage: 100 } });
    const { data: allTeams } = useGetList('ApprovalTeams', { pagination: { page: 1, perPage: 1000 } });

    const [memberIds, setMemberIds] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
    const [initialized, setInitialized] = useState(false);

    // Initial Sync: Only sync memberIds ONCE when the dialog opens or record changes
    useEffect(() => {
        if (!open) {
            setInitialized(false);
            return;
        }

        // If we have freshRecord, use it to initialize
        if (freshRecord?.members && !initialized) {
            setMemberIds(freshRecord.members.map((m: any) => m.userId));
            setInitialized(true);
        } 
        // Otherwise, if we have the list record, use it as a placeholder until fresh arrives
        else if (record?.members && !initialized && !freshRecord) {
            setMemberIds(record.members.map(m => m.userId));
            // We don't set initialized to true yet because we want freshRecord to take priority once it arrives
        }
    }, [freshRecord, record, open, initialized]);

    // Reset filters only when opening the dialog
    useEffect(() => {
        if (open) {
            setSearch('');
            setSelectedDeptId('all');
        }
    }, [open]);

    // 0. Memoize approver IDs (Prefer fresh record if available)
    const activeApprovers = useMemo(() => freshRecord?.approvers || record?.approvers || [], [freshRecord?.approvers, record?.approvers]);
    const approverIds = useMemo(() => activeApprovers.map((a: any) => a.userId), [activeApprovers]);

    // 1. Memoize IDs of users who are already members of OTHER teams
    const usersInOtherTeams = useMemo(() => {
        return (allTeams || [])
            .filter(t => t.id !== record?.id)
            .flatMap(t => (t.members || []).map((m: any) => m.userId));
    }, [allTeams, record?.id]);

    // 2. Memoize Option 2 Logic
    const hasViewerInSequence = useMemo(() => {
        return activeApprovers.some((approver: any) => {
            const emp = employees?.find(e => e.id === approver.userId);
            const role = emp?.role || emp?.accessLevel;
            return role?.toUpperCase() === 'VIEWER';
        });
    }, [activeApprovers, employees]);

    // 3. Memoize the filtered list to prevent lag during selection
    const filteredEmployees = useMemo(() => {
        return (employees || [])
            .filter(emp => {
                // 1. Uniqueness Filter: Exclude users already in ANOTHER team
                if (usersInOtherTeams.includes(emp.id)) return false;

                // 2. EXCLUDE users who are already set as Approvers for THIS team (Self-approval guard)
                if (approverIds.includes(emp.id)) return false;

                // 3. Role Filter: Only Creators and Approvers can be assigned as team members
                // Viewers and Admins are oversight-only and cannot submit reports.
                const role = emp?.role || emp?.accessLevel;
                const normalizedRole = role?.toUpperCase();
                const allowedRoles = ['CREATOR', 'APPROVER'];
                if (!allowedRoles.includes(normalizedRole)) return false;

                // 4. Department Filter
                if (selectedDeptId !== 'all') {
                    const dept = departments?.find(d => d.id.toString() === selectedDeptId);
                    if (dept && emp.department !== dept.name) return false;
                }

                // 5. Search Filter
                const term = search.toLowerCase();
                return (
                    emp.fullName?.toLowerCase().includes(term) ||
                    emp.userName?.toLowerCase().includes(term) ||
                    emp.department?.toLowerCase().includes(term) ||
                    emp.id?.toLowerCase().startsWith(term)
                );
            })
            .sort((a, b) => {
                const roleA = (a.role || a.accessLevel)?.toUpperCase();
                const roleB = (b.role || b.accessLevel)?.toUpperCase();
                if (roleA === 'APPROVER' && roleB !== 'APPROVER') return -1;
                if (roleA !== 'APPROVER' && roleB === 'APPROVER') return 1;
                return (a.fullName || '').localeCompare(b.fullName || '');
            });
    }, [employees, usersInOtherTeams, approverIds, hasViewerInSequence, selectedDeptId, search, departments]);

    const toggleUser = (userId: string) => {
        setMemberIds(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const toggleAll = () => {
        const filteredIds = filteredEmployees.map(e => e.id);
        const allSelected = filteredIds.every(id => memberIds.includes(id));

        if (allSelected) {
            setMemberIds(prev => prev.filter(id => !filteredIds.includes(id)));
        } else {
            setMemberIds(prev => [...new Set([...prev, ...filteredIds])]);
        }
    };

    const isAllSelected = filteredEmployees.length > 0 &&
        filteredEmployees.every(e => memberIds.includes(e.id));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!record) return;

        setSaving(true);
        // We use the latest data from the freshRecord if available, merged with our new members
        const baseData = freshRecord || record;
        const data = {
            ...baseData,
            members: memberIds.map(uid => ({ userId: uid }))
        };

        try {
            // Optimistic update for instant UI feedback
            await update(
                'ApprovalTeams', 
                { id: record.id, data, previousData: baseData },
                { mutationMode: 'optimistic' }
            );
            notify('Team members updated successfully', { type: 'success' });
            refresh();
            onClose();
        } catch (err: any) {
            notify(err.message || 'Failed to update members', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl bg-card">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <DialogHeader className="p-6 border-b bg-muted/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-black uppercase tracking-tight">
                                    Manage Team Members
                                </DialogTitle>
                                <DialogDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-0.5">
                                    {record?.name} Routing Group
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                Assign Creators
                            </Label>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] h-5 px-2 rounded-full font-bold bg-primary/5 text-primary border-primary/20">
                                    {memberIds.length} Selected
                                </Badge>
                            </div>
                        </div>

                        {/* Filter Bar */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                                <Input
                                    placeholder="Search name or ID..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-9 pl-9 rounded-xl bg-background border-border text-xs focus:ring-primary/20"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="size-3" />
                                    </button>
                                )}
                            </div>
                            <Select value={selectedDeptId} onValueChange={setSelectedDeptId}>
                                <SelectTrigger className="h-9 rounded-xl bg-background border-border text-xs focus:ring-primary/20">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="size-3 text-muted-foreground" />
                                        <SelectValue placeholder="Filter by Department" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-xl shadow-xl border-border">
                                    <SelectItem value="all" className="text-xs">All Departments</SelectItem>
                                    {departments?.filter(dept => dept.name !== 'Administration' && dept.name !== 'Management').map(dept => (
                                        <SelectItem key={dept.id} value={dept.id.toString()} className="text-xs">
                                            {dept.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col h-[400px] border rounded-2xl bg-background overflow-hidden shadow-inner">
                            {/* List Header */}
                            <div className="px-4 py-2 border-b flex items-center justify-between bg-muted/5">
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                    {filteredEmployees.length} Results Found
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    type="button"
                                    onClick={toggleAll}
                                    className="h-7 text-[10px] font-bold uppercase tracking-wider text-primary"
                                >
                                    {isAllSelected ? 'Unselect All' : 'Select All'}
                                </Button>
                            </div>

                            {/* Scrollable List */}
                            <ScrollArea className="flex-1">
                                <div className="p-2 space-y-1">
                                    {filteredEmployees.length === 0 ? (
                                        <div className="p-12 text-center">
                                            <FilterX className="size-8 text-muted-foreground/20 mx-auto mb-2" />
                                            <p className="text-xs text-muted-foreground font-medium">No matches found</p>
                                            <p className="text-[10px] text-muted-foreground/60 mt-1">Try adjusting your search or filters</p>
                                        </div>
                                    ) : (
                                        filteredEmployees.map((emp) => (
                                            <EmployeeRow
                                                key={emp.id}
                                                emp={emp}
                                                isSelected={memberIds.includes(emp.id)}
                                                onToggle={() => toggleUser(emp.id)}
                                            />
                                        ))
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    <DialogFooter className="p-4 bg-muted/20 border-t gap-2">
                        <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl text-xs font-bold uppercase tracking-widest h-10 px-6">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl text-xs font-bold uppercase tracking-widest h-10 px-8 shadow-lg shadow-primary/20"
                        >
                            {saving ? 'Saving...' : 'Update Members'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
