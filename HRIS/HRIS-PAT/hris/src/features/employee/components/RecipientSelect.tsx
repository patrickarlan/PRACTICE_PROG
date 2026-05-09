import { useGetList, useGetIdentity } from 'ra-core';
import { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

/**
 * RecipientSelect - Searchable name search for all users except self.
 */
export const RecipientSelect = ({ value, onChange, className, disabled }: { value: string, onChange: (val: string) => void, className?: string, disabled?: boolean }) => {
    const getFirstName = (fullName?: string | null): string => {
        if (!fullName) return '';
        if (fullName.includes('@')) {
            if (fullName.toLowerCase().startsWith('admin')) return 'Middle Management';
            const prefix = fullName.split('@')[0];
            return prefix.charAt(0).toUpperCase() + prefix.slice(1);
        }
        if (fullName.includes(',')) {
            return fullName.split(',')[1]?.trim().split(' ')[0] ?? fullName;
        }
        return fullName.split(' ')[0];
    };

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const { data: identity } = useGetIdentity();
    const { data: users, isPending } = useGetList('users/discovery', {
        filter: { q: search },
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' }
    });

    // Filter out the current user
    const filteredUsers = users?.filter(u => String(u.id) !== String(identity?.id)) || [];
    const selectedUser = filteredUsers.find((user) => String(user.id) === String(value));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(className || "w-[200px]", "justify-between font-normal bg-muted/20 hover:bg-card")}
                >
                    <span className="truncate">
                        {selectedUser ? getFirstName(selectedUser.name) : (isPending ? "Loading..." : "Select Recipient")}
                    </span>
                    <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput 
                        placeholder="Search user..." 
                        className="h-8" 
                        onValueChange={setSearch}
                    />
                    <CommandList className="max-h-[200px]">
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                            {filteredUsers.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    value={user.name}
                                    onSelect={() => {
                                        onChange(String(user.id));
                                        setOpen(false);
                                    }}
                                    className="text-xs"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-3 w-3",
                                            String(value) === String(user.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {getFirstName(user.name)}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
