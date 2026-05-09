import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNotify, useCreate } from 'ra-core';
// Employee creation logic

// ─── Schema ─────────────────────────────────────────────────────────────────
export const createEmployeeSchema = z.object({
    surname:    z.string().min(1, 'Surname is required'),
    firstName:  z.string().min(1, 'First name is required'),
    middleName: z.string().optional(),
    suffix:     z.string().optional().default(''),
    email:      z.string().email('Invalid email address'),
    password:   z.string().min(8, 'Password must be at least 8 characters'),
    department: z.string().min(1, 'Department is required'),
    departmentId: z.string().min(1, 'Department is required'),
    position:   z.string().optional(),
    role:       z.string().default('Creator'),
    claims:     z.array(z.string()).default([]),
});

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>;

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useCreateEmployee = (onSuccess?: () => void) => {
    const notify = useNotify();
    const [createEmployee, { isPending: isCreating }] = useCreate();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<CreateEmployeeFormValues>({
        resolver: zodResolver(createEmployeeSchema) as any,
        defaultValues: {
            surname:    '',
            firstName:  '',
            middleName: '',
            suffix:     '',
            email:      '',
            password:   '',
            department: '',
            departmentId: '',
            position:   '',
            role:       'Creator',
            claims:     [],
        }
    });

    const selectedRole = form.watch('role');
    const isSuperAdmin  = selectedRole === 'SuperAdmin';
    // isManagement and isApprover are currently unused in the new flow

    // Administrative Department Logic
    const handleRoleChange = (val: string) => {
        form.setValue('role', val);
        if (val === 'SuperAdmin') {
            form.setValue('claims', []);
            form.setValue('department', 'Administration');
            // Administration departmentId will be handled by the backend if not provided
        }
    };

    const handleClaimChange = (claim: string, checked: boolean) => {
        const current = form.getValues('claims') || [];
        if (checked) {
            form.setValue('claims', [...current, claim]);
        } else {
            form.setValue('claims', current.filter(c => c !== claim));
        }
    };

    const onSubmit = (data: CreateEmployeeFormValues) => {
        // Clean up data before submission
        const payload = {
            ...data,
            fullName: `${data.surname}, ${data.firstName} ${data.middleName || ''}`.trim(),
            userName: data.email,
            departmentId: (data.departmentId && data.departmentId !== 'none') ? parseInt(data.departmentId) : null,
            position: data.position || data.role || 'Employee',
            // Map role to backend expectations if needed
            roles: [data.role]
        };

        createEmployee(
            'employees',
            { data: payload },
            {
                onSuccess: () => {
                    notify('Member created successfully', { type: 'success' });
                    onSuccess?.();
                },
                onError: (error: any) => {
                    notify(error.message || 'Failed to create member', { type: 'error' });
                }
            }
        );
    };

    return {
        form,
        isCreating,
        isSuperAdmin,
        showPassword,
        setShowPassword,
        handleRoleChange,
        handleClaimChange,
        onSubmit: form.handleSubmit(onSubmit, (errors) => {
            console.error('Validation Errors:', errors);
            notify('Please check the required fields', { type: 'error' });
        }),
    };
};
