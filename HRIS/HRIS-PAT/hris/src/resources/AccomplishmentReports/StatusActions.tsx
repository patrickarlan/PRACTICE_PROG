import React from "react";
import { useNotify, useUpdate, useRecordContext, RaRecord } from "ra-core";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

type StatusActionsProps = {
    label?: string;
    // allow passing the record directly when rendered inside FunctionField
    record?: RaRecord;
};

export const StatusActions: React.FC<StatusActionsProps> = ({ record: propRecord }) => {
    const recordContext = useRecordContext();
    const ctxRecord = propRecord ?? recordContext;
    const notify = useNotify();
    const [update, { isLoading }] = useUpdate();

    if (!ctxRecord || ctxRecord.status !== "Pending") return null;

    const handleStatusChange = (newStatus: string) => {
        update(
            "AccomplishmentReports",
            {
                id: ctxRecord.id,
                data: { status: newStatus },
                previousData: ctxRecord,
            },
            {
                onSuccess: () => {
                    notify(`Report ${newStatus}`, { type: 'success' });
                },
                onError: (error: Error) => {
                    const message = error?.message || String(error);
                    notify(`Error: ${message}`, { type: 'error' });
                }
            }
        );
    };

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                variant="default"
                disabled={isLoading}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleStatusChange("Approved");
                }}
            >
                <Check className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button
                size="sm"
                variant="destructive"
                disabled={isLoading}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleStatusChange("Returned");
                }}
            >
                <X className="w-4 h-4 mr-1" /> Reject
            </Button>
        </div>
    );
};