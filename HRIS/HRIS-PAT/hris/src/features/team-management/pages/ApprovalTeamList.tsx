import { 
    List, 
    DataTable, 
    SearchInput, 
    ListPagination, 
    FilterForm,
} from '@/components';
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "@/components";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Plus, Pencil, Trash2, AlertCircle, Search, ListOrdered, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { ApprovalTeamDialog } from '../ApprovalTeamDialog';
import { ApprovalTeamMembersDialog } from '../ApprovalTeamMembersDialog';
import { ApprovalTeam, ApproverSequence } from '@/features/team-management/approvalTeamUtils';
import { useRecordContext, useDelete, useNotify, useRefresh, useGetList } from 'ra-core';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

/**
 * A specialized card for batch-fixing integrity issues.
 */
const FixCard = ({ 
    selectedIds, 
    onClear, 
    onProcess, 
    teams,
    isProcessing 
}: { 
    selectedIds: string[], 
    onClear: () => void, 
    onProcess: (teamId: string) => void,
    teams: any[],
    isProcessing: boolean
}) => {
    const [targetId, setTargetId] = useState<string>('');

    if (selectedIds.length === 0) return null;

    return (
        <Card className="border-amber-500/30 bg-amber-500/[0.02] shadow-xl shadow-amber-500/5 animate-in slide-in-from-top-4 duration-500 overflow-hidden">
            <CardHeader className="py-4 px-6 bg-amber-500/10 border-b border-amber-500/20 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-black shadow-lg">
                        {selectedIds.length}
                    </div>
                    <div>
                        <CardTitle className="text-[11px] font-black uppercase tracking-widest text-amber-900">Bulk Assignment Mode</CardTitle>
                        <p className="text-[10px] text-amber-700/70 font-bold uppercase tracking-tighter mt-0.5">Set routing for selected staff members</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-amber-700 hover:bg-amber-500/10 font-bold uppercase tracking-widest text-[10px]">
                    Cancel Selection
                </Button>
            </CardHeader>
            <CardContent className="p-6 flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/50 ml-1">Target Approval Team</label>
                    <Select value={targetId} onValueChange={setTargetId}>
                        <SelectTrigger className="h-11 bg-white border-amber-500/20 focus:ring-amber-500/20 rounded-xl font-bold text-xs uppercase tracking-tight">
                            <SelectValue placeholder="Select a team to assign..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-amber-500/20 shadow-2xl">
                            {teams.map(t => (
                                <SelectItem key={t.id} value={t.id.toString()} className="text-xs font-bold uppercase tracking-tight">
                                    {t.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button 
                    disabled={!targetId || isProcessing}
                    onClick={() => onProcess(targetId)}
                    className="h-11 px-8 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-600/20 active:scale-95 transition-all w-full sm:w-auto"
                >
                    {isProcessing ? 'Processing...' : 'Apply Assignment'}
                </Button>
            </CardContent>
        </Card>
    );
};

const ApprovalTeamActions = ({ onEdit }: { onEdit: (record: any) => void }) => {
    const record = useRecordContext();
    const [remove, { isLoading }] = useDelete();
    const notify = useNotify();
    const refresh = useRefresh();
    const [confirmOpen, setConfirmOpen] = useState(false);

    if (!record) return null;

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const hasMembers = record.members && record.members.length > 0;
        if (hasMembers) {
            notify('Migrate assigned members to another team before deleting this row', { type: 'error' });
            return;
        }
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        remove('ApprovalTeams', { id: record.id }, {
            onSuccess: () => {
                notify('Team deleted successfully', { type: 'success' });
                setConfirmOpen(false);
                refresh();
            },
            onError: (err: any) => {
                notify(err.message, { type: 'error' });
                setConfirmOpen(false);
            }
        });
    };

    return (
        <div className="flex items-center justify-end gap-2 pr-4">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => { e.stopPropagation(); onEdit(record); }}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
                <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDeleteClick}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
            >
                <Trash2 className="h-3.5 w-3.5" />
            </Button>

            <DeleteConfirmDialog
                open={confirmOpen}
                loading={isLoading}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Approval Team"
                description={`This will permanently remove the "${record.name}" routing sequence. This action cannot be undone.`}
            />
        </div>
    );
};

export const ApprovalTeamList = () => {
    const notify = useNotify();
    const refresh = useRefresh();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [membersDialogOpen, setMembersDialogOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<ApprovalTeam | undefined>();

    // Pre-fetch data at the list level to eliminate dialog mount lag
    const { data: teams } = useGetList('ApprovalTeams', { pagination: { page: 1, perPage: 1000 } });
    useGetList('employees', { pagination: { page: 1, perPage: 1000 } });
    useGetList('Departments', { pagination: { page: 1, perPage: 100 } });

    const handleCreate = () => {
        setSelectedRecord(undefined);
        setDialogOpen(true);
    };

    const handleEdit = (record: any) => {
        setSelectedRecord(record);
        setDialogOpen(true);
    };

    const handleManageMembers = (record: any) => {
        if (!record.approvers || record.approvers.length === 0) {
            notify('Please set at least one Approver before assigning team members.', { type: 'error' });
            return;
        }
        setSelectedRecord(record);
        setMembersDialogOpen(true);
    };

    const [activeTab, setActiveTab] = useState('inventory');
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);

    const { total: unassignedCount, data: unassignedUsers, isLoading: loadingUnassigned } = useGetList('employees', { 
        filter: { missingTeam: true },
        pagination: { page: 1, perPage: 100 } 
    });

    const filteredUnassigned = unassignedUsers?.filter(u => 
        u.userName?.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleAll = () => {
        if (selectedIds.length === filteredUnassigned.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredUnassigned.map(u => u.id));
        }
    };

    const handleBulkAssign = async (teamId: string) => {
        setProcessing(true);
        const token = localStorage.getItem('token');
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';
        
        try {
            const promises = selectedIds.map(userId => 
                fetch(`${API_BASE}/api/ApprovalTeams/${teamId}/members`, {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                })
            );

            const results = await Promise.all(promises);
            const failed = results.filter(r => !r.ok);

            if (failed.length > 0) {
                notify(`Assigned ${results.length - failed.length} users, but ${failed.length} failed.`, { type: 'warning' });
            } else {
                notify(`Successfully assigned ${results.length} users to team.`, { type: 'success' });
            }
            
            setSelectedIds([]);
            refresh();
        } catch (err: any) {
            notify(err.message || 'Bulk assignment failed', { type: 'error' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 flex flex-col gap-4 pt-4">
            <div className="flex flex-col gap-4">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbPage>Approval Teams</BreadcrumbPage>
                </Breadcrumb>

                {/* Premium Header Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 mb-0">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[60px]" />
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-sm">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-tight text-foreground uppercase">Approval Management</h1>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em] flex items-center gap-2 text-left">
                                    Hierarchy · Sequential Routing · Permissions
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button 
                                onClick={handleCreate}
                                className="h-10 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 gap-2"
                            >
                                <Plus className="size-4" />
                                Create Team
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-muted/50 border border-border p-1 h-11 mb-2">
                    <TabsTrigger value="inventory" className="gap-2">
                        <ListOrdered className="h-4 w-4" />
                        Routing Inventory
                    </TabsTrigger>
                    <TabsTrigger value="integrity" className="gap-2 relative">
                        <ShieldCheck className="h-4 w-4" />
                        Integrity Check
                        {unassignedCount !== undefined && unassignedCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white border-2 border-background">
                                {unassignedCount}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="inventory" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <List
                        resource="ApprovalTeams"
                        perPage={10}
                        pagination={<ListPagination />}
                        disableBreadcrumb
                        title={false}
                        className="bg-card rounded-xl border shadow-sm overflow-hidden"
                        actions={false}
                    >
                        <div className="px-6 py-4 bg-muted/20 border-b border-border flex items-center justify-start gap-12">
                            <div className="flex items-center gap-2">
                                <Users className="size-4 text-primary" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Active Routing Teams</span>
                            </div>
                            <div className="max-w-xs w-full">
                                <FilterForm filters={[<SearchInput source="q" alwaysOn key="q" className="bg-background border-none shadow-none focus-within:ring-0" />]} />
                            </div>
                        </div>

                        <DataTable className="border-none">
                            <DataTable.Col 
                                label="Team Name" 
                                headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold pl-6"
                                cellClassName="font-bold text-foreground pl-6 py-3"
                                render={(record: any) => (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleEdit(record); }}
                                        className="text-left hover:text-primary transition-colors cursor-pointer"
                                        title="Click to edit team"
                                    >
                                        {record.name}
                                    </button>
                                )}
                            />
                            <DataTable.Col 
                                label="Assigned Users" 
                                headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                                cellClassName="py-3"
                                render={(record: any) => (
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleManageMembers(record); }}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20 transition-all active:scale-95 group"
                                            title="Click to manage team members"
                                        >
                                            <Users className="size-3 text-primary/70 group-hover:text-primary transition-colors" />
                                            <span className="text-xs font-bold text-primary">
                                                {record.members?.length ?? 0}
                                            </span>
                                            <span className="text-[9px] uppercase font-black text-primary/50 tracking-tighter">Users</span>
                                        </button>
                                    </div>
                                )}
                            />
                            <DataTable.Col 
                                label="Approvers" 
                                headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                                cellClassName="py-3"
                                render={(record: any) => (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleEdit(record); }}
                                        className="group/seq flex items-center hover:opacity-80 transition-all cursor-pointer p-1 rounded-lg hover:bg-primary/5 active:scale-95 border border-transparent hover:border-primary/20"
                                        title="Click to edit approval routing"
                                    >
                                        <ApproverSequence approvers={record.approvers} />
                                    </button>
                                )}
                            />
                            <DataTable.Col 
                                label="Actions"
                                headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold text-right pr-6"
                                cellClassName="text-right pr-6 py-3"
                            >
                                <ApprovalTeamActions onEdit={handleEdit} />
                            </DataTable.Col>
                        </DataTable>
                    </List>
                </TabsContent>

                <TabsContent value="integrity" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex flex-col gap-6">
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
                            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 h-fit">
                                <AlertCircle className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-amber-900">Routing Integrity Detection</h3>
                                <p className="text-xs text-amber-800/80 leading-relaxed max-w-3xl">
                                    The users listed below (excluding Viewers) are not assigned to any **Approval Team**. Because there is no designated routing sequence for them, 
                                    they are currently blocked from submitting Accomplishment Reports. Please assign them to a team to restore their submission access.
                                </p>
                            </div>
                        </div>

                        {/* Bulk Fix Card */}
                        <FixCard 
                            selectedIds={selectedIds}
                            onClear={() => setSelectedIds([])}
                            onProcess={handleBulkAssign}
                            teams={teams || []}
                            isProcessing={processing}
                        />

                        <Card className="border shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl">
                            <CardHeader className="px-6 py-4 border-b bg-muted/5 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="size-4 text-primary" />
                                        <CardTitle className="text-[10px] font-black uppercase tracking-widest">Unassigned Employees ({unassignedCount})</CardTitle>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={toggleAll}
                                        className="h-7 text-[10px] font-bold uppercase tracking-widest text-primary"
                                    >
                                        {selectedIds.length === filteredUnassigned.length && filteredUnassigned.length > 0 ? 'Unselect All' : 'Select All'}
                                    </Button>
                                </div>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                                    <Input 
                                        placeholder="Filter unassigned..." 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="h-8 pl-8 text-[10px] uppercase font-bold rounded-lg border-muted-foreground/20 focus:ring-primary/20"
                                    />
                                </div>
                            </CardHeader>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border bg-muted/30">
                                        <TableHead className="w-[50px] pl-6"></TableHead>
                                        <TableHead className="w-[40%] text-[10px] uppercase font-bold tracking-widest">Employee</TableHead>
                                        <TableHead className="w-[30%] text-[10px] uppercase font-bold tracking-widest text-center">Department</TableHead>
                                        <TableHead className="w-[30%] text-[10px] uppercase font-bold tracking-widest text-right pr-6">Current Team</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loadingUnassigned ? (
                                        <TableRow><TableCell colSpan={4} className="h-24 text-center text-xs text-muted-foreground italic">Scanning database...</TableCell></TableRow>
                                    ) : filteredUnassigned.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-32 text-center py-10">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2">
                                                        <ShieldCheck className="h-8 w-8" />
                                                    </div>
                                                    <span className="text-sm font-bold text-foreground">All Users Assigned</span>
                                                    <span className="text-xs text-muted-foreground">Every employee is correctly linked to an approval routing sequence.</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUnassigned.map((user: any) => (
                                            <TableRow 
                                                key={user.id} 
                                                className={cn(
                                                    "group hover:bg-muted/30 transition-colors border-border/50 cursor-pointer",
                                                    selectedIds.includes(user.id) && "bg-primary/[0.03]"
                                                )}
                                                onClick={() => toggleSelection(user.id)}
                                            >
                                                <TableCell className="pl-6" onClick={(e) => e.stopPropagation()}>
                                                    <div 
                                                        onClick={() => toggleSelection(user.id)}
                                                        className={cn(
                                                            "size-4 rounded border transition-all flex items-center justify-center cursor-pointer",
                                                            selectedIds.includes(user.id) ? "bg-primary border-primary text-white" : "border-muted-foreground/30 hover:border-primary/50"
                                                        )}
                                                    >
                                                        {selectedIds.includes(user.id) && <Check className="size-3 stroke-[3]" />}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-foreground">{user.userName || user.fullName}</span>
                                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{user.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="outline" className="text-[10px] uppercase font-bold bg-muted/50 border-border">
                                                        {user.department || 'No Department'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-amber-600 border-amber-200 bg-amber-50">
                                                        NONE
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            <ApprovalTeamDialog 
                open={dialogOpen}
                record={selectedRecord}
                onClose={() => setDialogOpen(false)}
            />
            
            <ApprovalTeamMembersDialog
                open={membersDialogOpen}
                record={selectedRecord}
                onClose={() => setMembersDialogOpen(false)}
            />
        </div>
    );
};
