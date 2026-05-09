import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    loading?: boolean;
}

export const DeleteConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    loading = false,
}: DeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-[400px] border-none shadow-2xl rounded-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 pt-8 flex flex-col items-center text-center space-y-4">
                    <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive border border-destructive/20 shadow-sm animate-pulse">
                        <AlertTriangle className="size-8" />
                    </div>
                    
                    <div className="space-y-2">
                        <DialogTitle className="text-xl font-black uppercase tracking-tight text-foreground">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-xs font-medium text-muted-foreground leading-relaxed px-4">
                            {description}
                        </DialogDescription>
                    </div>
                </div>

                <DialogFooter className="p-4 bg-muted/30 border-t flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest h-11"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest h-11 shadow-lg shadow-destructive/20 transition-all active:scale-95"
                    >
                        {loading ? "Deleting..." : "Confirm Deletion"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
