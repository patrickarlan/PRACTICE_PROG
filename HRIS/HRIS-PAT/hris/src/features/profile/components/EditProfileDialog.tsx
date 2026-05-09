import { useState, useEffect } from 'react';
import { useNotify } from 'ra-core';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Pencil } from 'lucide-react';
import { parseFullName } from './utils';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';

interface EditProfileDialogProps {
    open: boolean;
    onClose: () => void;
    identity: { fullName?: string; avatar?: string; position?: string; department?: string; employeeId?: string | number };
    departments: string[];
    onSuccess: () => void;
    isAdmin: boolean;
}

export function EditProfileDialog({ open, onClose, identity, departments, onSuccess, isAdmin }: EditProfileDialogProps) {
    const notify = useNotify();
    const [form, setForm] = useState({ surname: '', firstName: '', middleName: '', suffix: '', position: '', department: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (open && identity) {
            const parsed = parseFullName(identity.fullName);
            setForm({
                surname: parsed.surname,
                firstName: parsed.firstName,
                middleName: parsed.middleName,
                suffix: parsed.suffix,
                position: identity.position ?? '',
                department: identity.department ?? '',
            });
        }
    }, [open, identity]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const nameParts = [form.firstName, form.middleName, form.suffix].filter(Boolean).join(' ');
        const fullName = `${form.surname}, ${nameParts}`.trim();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/auth/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ fullName, position: form.position, department: form.department }),
            });
            if (res.ok) {
                notify('Profile updated successfully', { type: 'success' });
                onSuccess();
                onClose();
            } else {
                const err = await res.json();
                throw new Error(err.message || 'Failed to update');
            }
        } catch (err: unknown) {
            const message = (err as Error)?.message || 'Failed to update';
            notify(message, { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
            <DialogContent className="sm:max-w-[480px]">
                <form onSubmit={handleSave}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Pencil className="h-4 w-4 text-primary" />
                            Edit Profile
                        </DialogTitle>
                        <DialogDescription>
                            Update your personal information below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4 p-4 rounded-lg border bg-muted/20">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Surname</Label>
                                    <input className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={form.surname} onChange={e => setForm({ ...form, surname: e.target.value })} required />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Suffix</Label>
                                    <input className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={form.suffix} onChange={e => setForm({ ...form, suffix: e.target.value })} placeholder="Jr, III" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">First Name</Label>
                                    <input className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Middle Name</Label>
                                    <input className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={form.middleName} onChange={e => setForm({ ...form, middleName: e.target.value })} required />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Position</Label>
                            {isAdmin ? (
                                <input className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} placeholder="Job Title (e.g. Developer)" />
                            ) : (
                                <input className="flex h-9 w-full rounded-md border border-input bg-muted px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={form.position} readOnly />
                            )}
                        </div>

                        <div className="grid gap-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Department</Label>
                            {isAdmin ? (
                                <Select value={form.department} onValueChange={val => setForm({ ...form, department: val })}>
                                    <SelectTrigger className="h-9 bg-background">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <input className="flex h-9 w-full rounded-md border border-input bg-muted px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={form.department} readOnly />
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
                        <Button type="submit" size="sm" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
