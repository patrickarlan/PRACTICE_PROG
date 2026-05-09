import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { 
    Plus, 
    Pencil, 
    Archive, 
    Building2, 
    Users, 
    ShieldCheck, 
    AlertCircle, 
    Wrench,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotify, useRefresh, useGetList, useCreate, useUpdate } from 'ra-core';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog';
import { EditMemberDialog } from '../Team/EditMemberDialog';
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface DepartmentEntity {
    id: number;
    name: string;
    code: string;
    isActive: boolean;
    isSystem: boolean;
    userCount: number;
    createdAt: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}

/**
 * A specialized card for batch-fixing integrity issues.
 */
const FixCard = ({ 
    selectedIds, 
    onClear, 
    onProcess, 
    departments,
    isProcessing 
}: { 
    selectedIds: string[], 
    onClear: () => void, 
    onProcess: (deptId: string) => void,
    departments: any[],
    isProcessing: boolean
}) => {
    const [targetId, setTargetId] = useState<string>('');

    if (selectedIds.length === 0) return null;

    return (
        <Card className="border-primary/30 bg-primary/[0.02] shadow-xl shadow-primary/5 animate-in slide-in-from-top-4 duration-500 overflow-hidden">
            <CardHeader className="py-4 px-6 bg-primary/10 border-b border-primary/20 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-black shadow-lg">
                        {selectedIds.length}
                    </div>
                    <div>
                        <CardTitle className="text-[11px] font-black uppercase tracking-widest text-primary">Bulk Department Fix</CardTitle>
                        <p className="text-[10px] text-primary/70 font-bold uppercase tracking-tighter mt-0.5">Link selected staff to a formal entity</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-primary hover:bg-primary/10 font-bold uppercase tracking-widest text-[10px]">
                    Cancel Selection
                </Button>
            </CardHeader>
            <CardContent className="p-6 flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-1">Target Department</label>
                    <Select value={targetId} onValueChange={setTargetId}>
                        <SelectTrigger className="h-11 bg-white border-primary/20 focus:ring-primary/20 rounded-xl font-bold text-xs uppercase tracking-tight">
                            <SelectValue placeholder="Select a department to assign..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-primary/20 shadow-2xl">
                            {departments.map(d => (
                                <SelectItem key={d.id} value={d.id.toString()} className="text-xs font-bold uppercase tracking-tight">
                                    {d.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button 
                    disabled={!targetId || isProcessing}
                    onClick={() => onProcess(targetId)}
                    className="h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 active:scale-95 transition-all w-full sm:w-auto"
                >
                    {isProcessing ? 'Processing...' : 'Apply Links'}
                </Button>
            </CardContent>
        </Card>
    );
};

export function ConfigManagement() {
    const notify = useNotify();
    const refresh = useRefresh();
    const { data: departments, isLoading } = useGetList<DepartmentEntity>('Departments', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' },
        filter: { includeInactive: true }
    });

    const [create] = useCreate();
    const [update] = useUpdate();

    const [editingItem, setEditingItem] = useState<DepartmentEntity | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', code: '' });
    const [archiveTarget, setArchiveTarget] = useState<DepartmentEntity | null>(null);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('inventory');
    const [fixingUser, setFixingUser] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);

    const { data: unhealthyUsers, isLoading: loadingHealth } = useGetList('employees', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'username', order: 'ASC' },
        filter: { missingDepartment: true }
    });

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleAll = () => {
        if (!unhealthyUsers) return;
        if (selectedIds.length === unhealthyUsers.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(unhealthyUsers.map((u: any) => u.id));
        }
    };

    const handleBulkAssign = async (departmentId: string) => {
        setProcessing(true);
        const token = localStorage.getItem('token');
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';
        
        try {
            const promises = selectedIds.map(userId => 
                fetch(`${API_BASE}/api/employees/${userId}/profile`, {
                    method: 'PUT',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ departmentId: parseInt(departmentId) })
                })
            );

            const results = await Promise.all(promises);
            const failed = results.filter(r => !r.ok);

            if (failed.length > 0) {
                notify(`Updated ${results.length - failed.length} users, but ${failed.length} failed.`, { type: 'warning' });
            } else {
                notify(`Successfully updated ${results.length} users.`, { type: 'success' });
            }
            
            setSelectedIds([]);
            refresh();
        } catch (err: any) {
            notify(err.message || 'Bulk update failed', { type: 'error' });
        } finally {
            setProcessing(false);
        }
    };

    const visibleDepartments = departments?.filter(d => !d.isSystem) || [];
    const inventoryCount = visibleDepartments.length;
    const healthIssueCount = unhealthyUsers?.length || 0;

    const handleAdd = async () => {
        if (!formData.name.trim() || !formData.code.trim()) return;
        setSaving(true);
        try {
            await create('Departments', { data: { name: formData.name, code: formData.code } });
            notify('Department added successfully', { type: 'success' });
            setFormData({ name: '', code: '' });
            setIsAddDialogOpen(false);
            refresh();
        } catch (err: any) {
            notify(err.message || 'Failed to add department', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async () => {
        if (!editingItem || !editingItem.name.trim() || !editingItem.code.trim()) return;
        setSaving(true);
        try {
            await update('Departments', { 
                id: editingItem.id, 
                data: { name: editingItem.name, code: editingItem.code, isActive: editingItem.isActive },
                previousData: editingItem
            });
            notify('Department updated successfully', { type: 'success' });
            setEditingItem(null);
            refresh();
        } catch (err: any) {
            notify(err.message || 'Failed to update department', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleArchive = async () => {
        if (!archiveTarget) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';
            const res = await fetch(`${API_BASE}/api/Departments/${archiveTarget.id}/archive`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Archive failed');
            
            notify('Department archived successfully', { type: 'success' });
            setArchiveTarget(null);
            refresh();
        } catch (err: any) {
            notify(err.message || 'Failed to archive department', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <TabsList className="bg-muted/50 border border-border p-1 h-11">
                        <TabsTrigger value="inventory" className="gap-2">
                            <Building2 className="h-4 w-4" />
                            Department Inventory
                            <Badge variant="secondary" className="ml-1 text-[10px] h-4 px-1">{inventoryCount}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="health" className="gap-2 relative">
                            <ShieldCheck className="h-4 w-4" />
                            Integrity Check
                            {healthIssueCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white border-2 border-background animate-in zoom-in duration-300">
                                    {healthIssueCount}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {activeTab === 'inventory' && (
                        <Button
                            size="sm"
                            variant="default"
                            className="h-10 px-6 text-xs font-bold uppercase tracking-wider gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                            onClick={() => setIsAddDialogOpen(true)}
                        >
                            <Plus className="h-4 w-4" /> Add Department
                        </Button>
                    )}
                </div>

                <TabsContent value="inventory" className="mt-6">
                    <Card className="border-border/50 shadow-sm overflow-hidden bg-card">
                        <CardHeader className="bg-muted/30 border-b border-border/40 py-3 px-6 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-primary" />
                                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-foreground">Active Units</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/20">
                                    <TableRow className="hover:bg-transparent border-border/40">
                                        <TableHead className="text-[10px] uppercase font-bold tracking-widest pl-6">Code</TableHead>
                                        <TableHead className="text-[10px] uppercase font-bold tracking-widest">Name</TableHead>
                                        <TableHead className="text-[10px] uppercase font-bold tracking-widest text-center">Status</TableHead>
                                        <TableHead className="text-[10px] uppercase font-bold tracking-widest text-center">Users</TableHead>
                                        <TableHead className="text-[10px] uppercase font-bold tracking-widest text-right pr-6">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow><TableCell colSpan={5} className="h-24 text-center text-xs italic">Loading...</TableCell></TableRow>
                                    ) : visibleDepartments.length === 0 ? (
                                        <TableRow><TableCell colSpan={5} className="h-24 text-center text-xs italic">No departments found.</TableCell></TableRow>
                                    ) : (
                                        visibleDepartments.map((dept) => (
                                            <TableRow key={dept.id} className={cn("group border-border/20 transition-colors", !dept.isActive && "bg-muted/30 opacity-60")}>
                                                <TableCell className="pl-6">
                                                    <Badge variant="outline" className="font-mono text-[10px] font-bold uppercase tracking-wider bg-background">
                                                        {dept.code}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm font-semibold text-foreground">{dept.name}</span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge 
                                                        variant="outline" 
                                                        className={cn(
                                                            "text-[9px] uppercase tracking-tighter",
                                                            dept.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-border"
                                                        )}
                                                    >
                                                        {dept.isActive ? 'Active' : 'Archived'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                                                        <Users className="size-3" />
                                                        <span className="text-xs font-bold">{dept.userCount}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        {!dept.isSystem && (
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                                onClick={() => setEditingItem(dept)}
                                                            >
                                                                <Pencil className="h-3.5 w-3.5" />
                                                            </Button>
                                                        )}
                                                        {(dept.isActive && !dept.isSystem) && (
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-8 w-8 text-muted-foreground hover:text-orange-600 hover:bg-orange-50"
                                                                onClick={() => setArchiveTarget(dept)}
                                                            >
                                                                <Archive className="h-3.5 w-3.5" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="health" className="mt-6">
                    <div className="flex flex-col gap-6">
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-4">
                            <div className="p-2 rounded-lg bg-amber-100 text-amber-700 h-fit">
                                <AlertCircle className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-amber-900">Legacy Data Detection</h3>
                                <p className="text-xs text-amber-700 leading-relaxed max-w-2xl">
                                    These users are assigned to legacy department strings but lack a link to the formal Department Entity system. 
                                    This can cause issues with routing, reporting, and dashboard visibility. Use the fix button to link them.
                                </p>
                            </div>
                        </div>

                        {/* Bulk Fix Card */}
                        <FixCard 
                            selectedIds={selectedIds}
                            onClear={() => setSelectedIds([])}
                            onProcess={handleBulkAssign}
                            departments={departments?.filter(d => d.isActive && !d.isSystem) || []}
                            isProcessing={processing}
                        />

                        <Card className="border shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl">
                            <CardHeader className="px-6 py-4 border-b bg-muted/5 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="size-4 text-primary" />
                                        <CardTitle className="text-[10px] font-black uppercase tracking-widest">Unassigned Employees ({healthIssueCount})</CardTitle>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={toggleAll}
                                        className="h-7 text-[10px] font-bold uppercase tracking-widest text-primary"
                                    >
                                        {selectedIds.length === unhealthyUsers?.length && unhealthyUsers?.length > 0 ? 'Unselect All' : 'Select All'}
                                    </Button>
                                </div>
                            </CardHeader>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-border bg-muted/30">
                                        <TableHead className="w-[50px] pl-6"></TableHead>
                                        <TableHead className="w-[30%] text-[10px] uppercase font-bold tracking-widest">Employee Name</TableHead>
                                        <TableHead className="w-[30%] text-[10px] uppercase font-bold tracking-widest text-center">Legacy String</TableHead>
                                        <TableHead className="w-[20%] text-[10px] uppercase font-bold tracking-widest text-center">Entity Status</TableHead>
                                        <TableHead className="w-[20%] text-[10px] uppercase font-bold tracking-widest text-right pr-6">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loadingHealth ? (
                                        <TableRow><TableCell colSpan={5} className="h-24 text-center text-xs text-muted-foreground italic">Scanning for inconsistencies...</TableCell></TableRow>
                                    ) : healthIssueCount === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-32 text-center py-10">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2">
                                                        <ShieldCheck className="h-8 w-8" />
                                                    </div>
                                                    <span className="text-sm font-bold text-foreground">System Healthy</span>
                                                    <span className="text-xs text-muted-foreground">All users are correctly linked to department entities.</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        unhealthyUsers?.map((user: any) => (
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
                                                        <span className="text-sm font-bold text-foreground">{user.userName}</span>
                                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{user.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="outline" className="text-[10px] uppercase font-bold bg-muted/50 border-border">
                                                        {user.department || 'None'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">Missing ID</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                                    <Button 
                                                        size="sm" 
                                                        variant="ghost" 
                                                        className="h-8 gap-2 text-primary hover:text-primary hover:bg-primary/10 rounded-lg group"
                                                        onClick={() => setFixingUser(user)}
                                                    >
                                                        <Wrench className="h-3.5 w-3.5" />
                                                        <span className="text-xs font-bold uppercase tracking-widest">Fix Link</span>
                                                    </Button>
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

            {/* Add/Edit Dialog */}
            <Dialog open={isAddDialogOpen || !!editingItem} onOpenChange={() => { setIsAddDialogOpen(false); setEditingItem(null); setFormData({ name: '', code: '' }); }}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {editingItem ? <Pencil className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
                            {editingItem ? 'Edit Department' : 'Add New Department'}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            {editingItem ? 'Update the department identity details below.' : 'Create a new organizational department entity.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Department Code</Label>
                            <Input
                                placeholder="e.g. DEV, FUNC, PM"
                                value={editingItem ? editingItem.code : formData.code}
                                onChange={(e) => editingItem ? setEditingItem({...editingItem, code: e.target.value.toUpperCase()}) : setFormData({...formData, code: e.target.value.toUpperCase()})}
                                className="h-10 uppercase font-mono tracking-widest"
                                maxLength={10}
                            />
                        </div>
                        <div className="grid gap-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Department Name</Label>
                            <Input
                                placeholder="e.g. Development, Functional"
                                value={editingItem ? editingItem.name : formData.name}
                                onChange={(e) => editingItem ? setEditingItem({...editingItem, name: e.target.value}) : setFormData({...formData, name: e.target.value})}
                                className="h-10"
                                maxLength={25}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" size="sm" onClick={() => { setIsAddDialogOpen(false); setEditingItem(null); }}>Cancel</Button>
                        <Button size="sm" onClick={editingItem ? handleUpdate : handleAdd} disabled={saving}>
                            {saving ? 'Processing...' : (editingItem ? 'Save Changes' : 'Create Department')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Archive Confirmation */}
            <Dialog open={!!archiveTarget} onOpenChange={(v) => !v && setArchiveTarget(null)}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Archive className="h-5 w-5 text-orange-600" />
                            Archive Department
                        </DialogTitle>
                        <DialogDescription className="pt-2 text-foreground/80 leading-relaxed">
                            Are you sure you want to archive <span className="font-bold underline decoration-orange-600/30 underline-offset-4">"{archiveTarget?.name}"</span>?
                            <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-xl flex gap-3">
                                <AlertCircle className="size-5 text-orange-600 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-orange-800 uppercase tracking-wider">Historical Preservation</p>
                                    <p className="text-[10px] text-orange-700 leading-tight">
                                        This will hide the department from active dropdowns and lists, but will NOT affect historical reports or existing user associations.
                                    </p>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => setArchiveTarget(null)}>Cancel</Button>
                        <Button variant="default" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200" size="sm" onClick={handleArchive} disabled={saving}>
                            {saving ? 'Archiving...' : 'Confirm Archive'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {fixingUser && (
                <EditMemberDialog 
                    record={fixingUser} 
                    open={!!fixingUser} 
                    onClose={() => setFixingUser(null)}
                    onSuccess={() => { setFixingUser(null); refresh(); }}
                />
            )}
        </div>
    );
}
