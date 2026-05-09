import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmDialogProps {
    open: boolean;
    itemName: string;
    itemType: 'position' | 'department';
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteConfirmDialog({
    open, itemName, itemType, onConfirm, onCancel,
}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel(); }}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4 text-destructive" />
                        Delete {itemType === 'position' ? 'Position' : 'Department'}
                    </DialogTitle>
                    <DialogDescription className="pt-1">
                        Are you sure you want to delete the{' '}
                        {itemType === 'position' ? 'position' : 'department'}{' '}
                        <span className="font-semibold text-foreground">"{itemName}"</span>?
                        <span className="text-xs text-muted-foreground mt-1 block">
                            Existing employee records will not be affected.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
                    <Button variant="destructive" size="sm" onClick={onConfirm}>Yes, delete it</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
