import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Settings2, Eye, EyeOff } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';

interface ChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

export function ChangePasswordDialog({ open, onClose }: ChangePasswordDialogProps) {
    const notify = useNotify();
    const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
    const [showPw, setShowPw] = useState(false);
    const [savingPw, setSavingPw] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwForm.next !== pwForm.confirm) {
            notify('Passwords do not match', { type: 'warning' });
            return;
        }
        setSavingPw(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/auth/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
            });
            if (res.ok) {
                notify('Password updated successfully', { type: 'success' });
                setPwForm({ current: '', next: '', confirm: '' });
                onClose();
            } else {
                const err = await res.json();
                throw new Error(err.message || 'Failed to update');
            }
        } catch (err) {
            const error = err as Error;
            notify(error.message || 'An unexpected error occurred', { type: 'error' });
        } finally {
            setSavingPw(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
            <DialogContent className="sm:max-w-[400px]">
                <form onSubmit={handlePasswordChange}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Settings2 className="h-4 w-4 text-primary" />
                            Security Settings
                        </DialogTitle>
                        <DialogDescription>
                            Change your account password.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Current Password</Label>
                            <Input type={showPw ? 'text' : 'password'} required value={pwForm.current}
                                onChange={e => setPwForm({ ...pwForm, current: e.target.value })} />
                        </div>
                        <Separator className="my-2" />
                        <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">New Password</Label>
                            <div className="relative">
                                <Input type={showPw ? 'text' : 'password'} required value={pwForm.next}
                                    onChange={e => setPwForm({ ...pwForm, next: e.target.value })} />
                                <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Confirm New Password</Label>
                            <Input type={showPw ? 'text' : 'password'} required value={pwForm.confirm}
                                onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
                        <Button type="submit" size="sm" disabled={savingPw}>{savingPw ? 'Updating...' : 'Update Password'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
