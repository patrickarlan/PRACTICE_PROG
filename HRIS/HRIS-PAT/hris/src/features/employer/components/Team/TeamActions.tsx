import { useState } from 'react';
import { useNotify, useRefresh, useRecordContext } from 'ra-core';
import { DeleteButton, Confirm } from '@/components';
import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Eye, Pencil, MoreVertical, ShieldAlert } from 'lucide-react';
import { Employee } from './types';
import { EditMemberDialog } from './EditMemberDialog';
import { ViewMemberDialog } from './ViewMemberDialog';

export const TeamActions = () => {
    const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [deactivating, setDeactivating] = useState(false);
    const record = useRecordContext<Employee>();
    const notify = useNotify();
    const refresh = useRefresh();
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';

    if (!record) return null;

    const handleToggleStatus = async () => {
        setDeactivating(true);
        const willDeactivate = !record.isDeactivated;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/employees/${record.id}/deactivate`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ deactivate: willDeactivate }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.message || `Failed to ${willDeactivate ? 'deactivate' : 'activate'}`);
            }
            notify(`Account for ${record.userName} has been ${willDeactivate ? 'deactivated' : 'activated'}`, { type: 'success' });
            refresh();
            setIsDeactivateDialogOpen(false);
        } catch (err: any) {
            notify(err.message || 'Action failed', { type: 'error' });
        } finally {
            setDeactivating(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-end gap-1.5 pr-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setViewOpen(true)}
                                className="h-8 w-8 p-0 border-none bg-transparent hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-md"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">View Details</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setEditOpen(true)}
                                className="h-8 w-8 p-0 border-none bg-transparent hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-md"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Edit Member</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-primary/5 rounded-md">
                            < MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 p-1">
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem
                            className={cn(
                                "gap-2 cursor-pointer py-2 focus:bg-primary/5",
                                record.isDeactivated ? "text-emerald-600 focus:text-emerald-600" : "text-destructive focus:text-destructive focus:bg-destructive/5"
                            )}
                            onClick={() => setIsDeactivateDialogOpen(true)}
                        >
                            <ShieldAlert className="h-4 w-4" />
                            <span className="text-sm">{record.isDeactivated ? 'Activate Account' : 'Deactivate Account'}</span>
                        </DropdownMenuItem>
                        <DeleteButton
                            variant="ghost"
                            className="w-full justify-start gap-2 py-2 h-auto px-2 text-sm font-normal text-destructive hover:text-destructive hover:bg-destructive/5 border-none mt-0.5 rounded-sm"
                            label="Delete Record"
                            redirect={false}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <EditMemberDialog
                record={record}
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onSuccess={() => setEditOpen(false)}
            />

            <ViewMemberDialog
                record={record}
                open={viewOpen}
                onClose={() => setViewOpen(false)}
            />

            <Confirm
                isOpen={isDeactivateDialogOpen}
                title={record.isDeactivated ? "Activate Account?" : "Are you absolutely sure?"}
                content={record.isDeactivated 
                    ? `This will restore login access for ${record.userName}. They will be able to access the system immediately.`
                    : `This will deactivate the account for ${record.userName}. They will no longer be able to log in.`
                }
                onConfirm={handleToggleStatus}
                onClose={() => setIsDeactivateDialogOpen(false)}
                loading={deactivating}
                confirm={record.isDeactivated ? "Activate" : "Deactivate"}
                confirmColor={record.isDeactivated ? "primary" : "warning"}
            />
        </>
    );
};
