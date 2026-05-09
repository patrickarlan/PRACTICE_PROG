import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface EditableListProps {
    items: string[];
    itemType: 'position' | 'department';
    onAdd: (v: string) => void;
    onRename: (o: string, n: string) => void;
    onRemove: (v: string) => void;
}

export function EditableList({ items, itemType, onAdd, onRename, onRemove }: EditableListProps) {
    const [newValue, setNewValue] = useState('');
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    return (
        <>
            <DeleteConfirmDialog
                open={!!deleteTarget} itemName={deleteTarget ?? ''} itemType={itemType}
                onConfirm={() => { if (deleteTarget) onRemove(deleteTarget); setDeleteTarget(null); }}
                onCancel={() => setDeleteTarget(null)}
            />
            <div className="flex flex-col gap-1.5">
                {items.map(item => (
                    <div key={item} className="flex items-center gap-2">
                        {editingItem === item ? (
                            <>
                                <Input className="h-7 text-sm flex-1" value={editValue}
                                    onChange={e => setEditValue(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') { onRename(item, editValue); setEditingItem(null); }
                                        if (e.key === 'Escape') setEditingItem(null);
                                    }} autoFocus />
                                <Button size="sm" className="h-7 px-2 text-xs" onClick={() => { onRename(item, editValue); setEditingItem(null); }}>Save</Button>
                                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setEditingItem(null)}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                <span className="flex-1 text-sm">{item}</span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                        onClick={() => { setEditingItem(item); setEditValue(item); }}>
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                        onClick={() => setDeleteTarget(item)} disabled={items.length <= 1}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-2">
                <Input className="h-7 text-sm flex-1" placeholder={`New ${itemType} name...`}
                    value={newValue} onChange={e => setNewValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && newValue.trim()) { onAdd(newValue.trim()); setNewValue(''); } }} />
                <Button size="sm" className="h-7 px-3 text-xs gap-1" disabled={!newValue.trim()}
                    onClick={() => { onAdd(newValue.trim()); setNewValue(''); }}>
                    <Plus className="h-3 w-3" />Add
                </Button>
            </div>
        </>
    );
}
