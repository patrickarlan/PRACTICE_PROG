import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useGetList } from 'ra-core';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger
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
import { Plus, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCreateEmployee } from './useCreateEmployee';

export const CreateEmployeeDialog = () => {
    const [open, setOpen] = useState(false);
    const { 
        form, 
        isCreating, 
        showPassword,
        setShowPassword,
        onSubmit,
    } = useCreateEmployee(() => setOpen(false));


    const { data: departments } = useGetList('Departments', { pagination: { page: 1, perPage: 100 } });
    const { register, control, formState: { errors } } = form;

    const DEPARTMENT_OPTIONS = departments
        ?.filter(d => !d.isSystem)
        .map(d => ({ label: `${d.name} (${d.code})`, value: d.id.toString(), name: d.name })) || [];

    return (
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) form.reset(); }}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1.5 shadow-sm bg-primary hover:bg-primary/90">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Member</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card border-border shadow-2xl p-0 overflow-hidden gap-0">
                <form onSubmit={onSubmit}>
                    <DialogHeader className="p-6 bg-muted/30 border-b border-border/50">
                        <DialogTitle className="text-lg font-bold tracking-tight">Add New Member</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground/70">
                            Configure account credentials and organizational details for the new employee.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="firstName" className="text-xs">First Name <span className="text-destructive">*</span></Label>
                                    <Input id="firstName" placeholder="e.g. Juan" {...register('firstName')} className={cn(errors.firstName && "border-destructive")} />
                                    {errors.firstName && <p className="text-[10px] text-destructive">{errors.firstName.message}</p>}
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="surname" className="text-xs">Surname <span className="text-destructive">*</span></Label>
                                    <Input id="surname" placeholder="e.g. Dela Cruz" {...register('surname')} className={cn(errors.surname && "border-destructive")} />
                                    {errors.surname && <p className="text-[10px] text-destructive">{errors.surname.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="middleName" className="text-xs">Middle Name <span className="text-muted-foreground font-normal">(optional)</span></Label>
                                    <Input id="middleName" placeholder="e.g. Santos" {...register('middleName')} className={cn(errors.middleName && "border-destructive")} />
                                    {errors.middleName && <p className="text-[10px] text-destructive">{errors.middleName.message}</p>}
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="suffix" className="text-xs">Suffix <span className="text-muted-foreground font-normal">(optional)</span></Label>
                                    <Input id="suffix" placeholder="e.g. Jr." {...register('suffix')} className={cn(errors.suffix && "border-destructive")} />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 pt-4 border-t border-border/50">
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs">Company Email <span className="text-destructive">*</span></Label>
                                <Input id="email" type="email" placeholder="email@company.com" {...register('email')} className={cn(errors.email && "border-destructive")} />
                                {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                            </div>

                            <div className="grid gap-1.5 relative">
                                <Label htmlFor="password" className="text-xs">Initial Password <span className="text-destructive">*</span></Label>
                                <div className="relative">
                                    <Input 
                                        id="password" 
                                        type={showPassword ? 'text' : 'password'} 
                                        {...register('password')} 
                                        className={cn("pr-10", errors.password && "border-destructive")} 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-[10px] text-destructive">{errors.password.message}</p>}
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="departmentId" className="text-xs">Department <span className="text-destructive">*</span></Label>
                                <Controller
                                    control={control}
                                    name="departmentId"
                                    render={({ field }) => (
                                        <Select 
                                            onValueChange={(val) => {
                                                field.onChange(val);
                                                const opt = DEPARTMENT_OPTIONS.find(o => o.value === val);
                                                if (opt) form.setValue('department', opt.name);
                                            }} 
                                            value={field.value}
                                        >
                                            <SelectTrigger className={cn("w-full h-9 bg-transparent", errors.departmentId && "border-destructive")}>
                                                <SelectValue placeholder="Select department..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DEPARTMENT_OPTIONS.map(opt => (
                                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.departmentId && <p className="text-[10px] text-destructive">{errors.departmentId.message}</p>}
                            </div>

                        </div>
                    </div>

                    <DialogFooter className="p-6 bg-muted/30 border-t border-border/50">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="h-9 text-xs">Cancel</Button>
                        <Button type="submit" disabled={isCreating} className="h-9 text-xs font-bold px-6">
                            {isCreating ? 'Creating...' : 'Create Employee'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
