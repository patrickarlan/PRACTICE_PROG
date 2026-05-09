import {
    Users,
} from 'lucide-react';
import {
    List,
    DataTable,
    EmailField,
    TextField,
    FilterButton,
    ColumnsButton,
    ListPagination,
} from '@/components';
import { cn } from '@/lib/utils';
import {
    EmployeeCell,
    RoleCell,
    TeamActions,
    TeamFilters,
    CreateEmployeeDialog,
    ApprovalTeamCell,
    Employee
} from '../components/Team';

export const Team = () => {
    return (
        <div className="animate-in fade-in duration-500 space-y-5">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-2 gap-4">
                <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-foreground" />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-foreground">Employees</h1>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left">
                            Workforce Structure · Human Resources
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <CreateEmployeeDialog />
                </div>
            </div>

            <List
                resource="employees"
                filters={TeamFilters}
                disableBreadcrumb
                title={false}
                perPage={5}
                pagination={<ListPagination rowsPerPageOptions={[5, 10, 25, 50, 1000]} />}
                className="bg-card rounded-xl border shadow-sm overflow-hidden"
                actions={
                    <div className="flex items-center gap-2">
                        <FilterButton />
                        <ColumnsButton />
                    </div>
                }
            >
                <DataTable className="border-none">
                    <DataTable.Col label="Employee" headerClassName="bg-muted/40 text-muted-foreground font-bold">
                        <EmployeeCell />
                    </DataTable.Col>

                    <DataTable.Col label="Email" source="email" headerClassName="bg-muted/40 text-muted-foreground font-bold">
                        <EmailField source="email" className="text-muted-foreground font-medium" />
                    </DataTable.Col>

                    <DataTable.Col
                        label="User Role"
                        headerClassName="bg-muted/40 text-muted-foreground font-bold w-[180px]"
                        cellClassName="pr-4"
                    >
                        <RoleCell />
                    </DataTable.Col>

                    <DataTable.Col
                        label="Approval Team"
                        headerClassName="bg-muted/40 text-muted-foreground font-bold w-[200px]"
                    >
                        <ApprovalTeamCell />
                    </DataTable.Col>

                    <DataTable.Col label="Department" source="department" headerClassName="bg-muted/40 text-muted-foreground font-bold">
                        <TextField source="department" />
                    </DataTable.Col>

                    <DataTable.Col
                        label="Status"
                        headerClassName="bg-muted/40 text-muted-foreground font-bold"
                        render={(record: Employee) => {
                            const inactive = record.isDeactivated || record.status === 'Inactive';
                            return (
                                <span className={cn(
                                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border',
                                    inactive
                                        ? 'bg-destructive/10 text-destructive border-destructive/30'
                                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                                )}>
                                    <span className={cn(
                                        'w-1.5 h-1.5 rounded-full',
                                        inactive ? 'bg-destructive' : 'bg-emerald-500'
                                    )} />
                                    {inactive ? 'Inactive' : 'Active'}
                                </span>
                            );
                        }}
                    />

                    <DataTable.Col label="Actions" headerClassName="bg-muted/40 text-muted-foreground font-bold text-right pr-6" cellClassName="text-right">
                        <TeamActions />
                    </DataTable.Col>
                </DataTable>
            </List>
        </div>
    );
};
