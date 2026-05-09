import { useRecordContext } from 'ra-core';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Employee } from './types';
import { getInitials } from './utils';

export const EmployeeCell = () => {
    const record = useRecordContext<Employee>();
    if (!record) return null;
    return (
        <div className="flex items-center gap-3">
            <Avatar size="sm" className="h-9 w-9 border-2 border-primary/10">
                <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">
                    {getInitials(record.userName || 'U')}
                </AvatarFallback>
            </Avatar>
            <p className="font-semibold text-foreground leading-tight">{record.userName}</p>
        </div>
    );
};
