import { useState, useEffect } from 'react';
import { useNotify, useRefresh, useGetList } from 'ra-core';
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { Pencil, Eye, EyeOff } from 'lucide-react';
import { Employee } from './types';
import { parseName } from './utils';

interface EditMemberDialogProps {
    record: Employee;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const EditMemberDialog = ({ record, open, onClose, onSuccess }: EditMemberDialogProps) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';

    const { data: departments } = useGetList('Departments', { pagination: { page: 1, perPage: 100 } });
    const DEPARTMENT_OPTIONS = departments
        ?.filter(d => !d.isSystem)
        .map(d => ({ value: d.id.toString(), label: `${d.name} (${d.code})`, name: d.name })) || [];

    const parsed = parseName(record.fullName ?? record.userName ?? '');
    const [formData, setFormData] = useState({
        surname:    parsed.surname,
        firstName:  parsed.firstName,
        middleName: parsed.middleName,
        suffix:     parsed.suffix,
        email:      record.email ?? '',
        department: record.department ?? '',
        departmentId: record.departmentId?.toString() ?? '',
        newPassword: '',
    });
    const [showPw, setShowPw] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const p = parseName(record.fullName ?? record.userName ?? '');
        setFormData({
            surname:    p.surname,
            firstName:  p.firstName,
            middleName: p.middleName,
            suffix:     p.suffix,
            email:      record.email ?? '',
            department: record.department ?? '',
            departmentId: record.departmentId?.toString() ?? '',
            newPassword: '',
        });
    }, [record.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const nameParts = [formData.firstName, formData.middleName, formData.suffix].filter(Boolean).join(' ');
            const fullName  = `${formData.surname}, ${nameParts}`.trim();
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/employees/${record.id}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    fullName,
                    email:       formData.email,
                    department:  formData.department,
                    departmentId: formData.departmentId ? parseInt(formData.departmentId) : null,
                    newPassword: formData.newPassword || undefined,
                }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.message || 'Update failed');
            }
            notify('Member updated successfully', { type: 'success' });
            refresh();
            onSuccess();
            onClose();
        } catch (err: any) {
            notify(err.message || 'Failed to update member', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="pb-2">
                        <DialogTitle className="flex items-center gap-2">
                            <Pencil className="h-4 w-4 text-primary" />
                            Edit Member
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Editing credentials for <span className="font-semibold text-foreground">{record.userName}</span>.
                            Leave New Password blank to keep it unchanged.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4 p-4 rounded-xl border bg-muted/20">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Surname</Label>
                                    <Input 
                                        value={formData.surname}
                                        onChange={(e) => setFormData({...formData, surname: e.target.value})}
                                        className="h-9 bg-background"
                                        required
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Suffix</Label>
                                    <Input 
                                        value={formData.suffix}
                                        placeholder="Jr, III, etc"
                                        onChange={(e) => setFormData({...formData, suffix: e.target.value})}
                                        className="h-9 bg-background"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">First Name</Label>
                                    <Input 
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                        className="h-9 bg-background"
                                        required
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Middle Name <span className="lowercase font-normal">(optional)</span></Label>
                                    <Input 
                                        value={formData.middleName}
                                        onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                                        className="h-9 bg-background"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Email Address</Label>
                            <Input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="h-9 bg-background"
                                required
                            />
                        </div>



                        <div className="grid gap-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Department</Label>
                            <Select 
                                value={formData.departmentId}
                                onValueChange={(val) => {
                                    const opt = DEPARTMENT_OPTIONS.find(o => o.value === val);
                                    setFormData({...formData, departmentId: val, department: opt?.name || formData.department});
                                }}
                            >
                                <SelectTrigger className="h-9 bg-background">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DEPARTMENT_OPTIONS.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="grid gap-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Update Password</Label>
                            <div className="relative">
                                <Input 
                                    type={showPw ? 'text' : 'password'}
                                    value={formData.newPassword}
                                    placeholder="Enter new password (optional)"
                                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                    className="h-9 pr-10 bg-background"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
                        <Button type="submit" size="sm" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
