import { ListChecks, Eye, EyeOff, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router';
import {
    List,
    DataTable,
    SearchInput,
    SelectInput,
    DateInput,
    FilterButton,
    ColumnsButton,
    ExportButton,
    ListPagination,
    EmptyState,
    ReferenceInput,
} from '@/components';
import { arExcelExporter } from '@/resources/AccomplishmentReports/arExcelExporter';
import { useListContext, useRecordContext, usePermissions, useGetIdentity, useGetList } from 'ra-core';
import { ROLE_SUPER_ADMIN } from "@/auth/roles";
import { cn } from "@/lib/utils";
import { getARStatusLabel, getARStatusClass } from './arReviewUtils';

const ReviewEmptyState = () => (
    <EmptyState
        icon={ClipboardCheck}
        title="Review Queue Empty"
        description="There are currently no accomplishment reports waiting for your review. Check back later."
    />
);

const ReviewFilters = ({ isHistorical }: { isHistorical: boolean }) => {
    const { data: departments } = useGetList('Departments', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' }
    });

    const filters = [
        <SearchInput source="q" alwaysOn key="q" />,
        <DateInput
            source="reportDate"
            label="Report Date"
            key="date"
        />,
    ];

    if (isHistorical) {
        filters.push(
            <SelectInput
                source="status"
                label="Status"
                choices={[
                    { id: '', name: 'All' },
                    { id: 'Pending', name: 'Pending' },
                    { id: 'Approved', name: 'Approved' },
                    { id: 'Returned', name: 'Returned' },
                ]}
                className="min-w-36"
                key="status"
            />
        );
    }
    // NOTE: For Approval (isHistorical=false) intentionally has NO status filter.
    // Status is enforced via permanentFilter on the <List> component instead.

    filters.push(
        <ReferenceInput source="approvalTeamId" reference="ApprovalTeams" key="team">
            <SelectInput label="Approval Team" className="min-w-48" optionText="name" />
        </ReferenceInput>
    );

    filters.push(
        <SelectInput
            source="department"
            label="Department"
            choices={departments?.map((d: any) => ({ id: d.name, name: d.name })) || []}
            key="dept"
        />
    );

    return filters;
};

const RowNumberCell = () => {
    const { page, perPage, data } = useListContext();
    const record = useRecordContext();
    if (!record || !data) return null;

    const index = data.findIndex((item: any) => item.id === record.id);
    const rowNumber = index >= 0 ? (page - 1) * perPage + index + 1 : undefined;
    return <span>{rowNumber ?? '-'}</span>;
};


const ReviewActions = ({ isHistorical = false }: { isHistorical?: boolean }) => {
    const navigate = useNavigate();
    const record = useRecordContext();
    const { permissions } = usePermissions();
    const { data: identity } = useGetIdentity();

    if (!record) return null;

    const isAdmin = permissions === ROLE_SUPER_ADMIN;
    const isApprover = identity?.roles?.includes("Approver");
    const isManagement = identity?.roles?.includes("Viewer");
    const canReview = isAdmin || isApprover;

    // Management-specific: show 'Viewed' button with tooltip if the report has been viewed
    if (isManagement && !isAdmin && !isApprover) {
        const hasBeenViewed = !!record.viewedAt;

        const button = (
            <Button
                size="sm"
                variant={hasBeenViewed ? 'secondary' : 'default'}
                onClick={() => {
                    navigate(isHistorical ? `/team-ar/${record.id}` : `/ar-reviews/${record.id}`);
                }}
                className="shadow-sm active:scale-95 transition-transform gap-1.5"
            >
                {hasBeenViewed
                    ? <><EyeOff className="size-3.5" /> Viewed</>
                    : <><Eye className="size-3.5" /> View</>}
            </Button>
        );

        if (!hasBeenViewed) return button;

        const tooltipText = `Viewed by: ${record.viewedByName ?? 'Viewer'} on ${new Date(record.viewedAt + 'Z').toLocaleString()}`;

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {button}
                    </TooltipTrigger>
                    <TooltipContent side="left" className="text-xs max-w-[200px]">
                        {tooltipText}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    const label = record.status === 'Approved' ? 'Open' : (canReview ? 'Review' : 'View');

    return (
        <Button
            size="sm"
            variant={record.status === 'Approved' || !canReview ? 'outline' : 'default'}
            onClick={() => {
                navigate(isHistorical ? `/team-ar/${record.id}` : `/ar-reviews/${record.id}`);
            }}
            className="shadow-sm active:scale-95 transition-transform"
        >
            {label}
        </Button>
    );
};

const EmployeeCell = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <div className="flex flex-col">
            <p className="font-semibold text-foreground leading-tight">{record.employee}</p>
        </div>
    );
}


const ReviewStatusBadge = () => {
    const record = useRecordContext();
    if (!record) return null;

    const label = getARStatusLabel(record as any);
    const colorClass = getARStatusClass(record.status as string);
    const isDestructive = (record.status?.toLowerCase() === 'returned' || record.status?.toLowerCase() === 'rejected');

    return (
        <Badge
            variant={isDestructive ? 'destructive' : 'default'}
            className={cn('rounded-md px-2 text-center text-[10px] font-bold uppercase', colorClass)}
        >
            {label}
        </Badge>
    );
};

export const ARReview = ({ 
    hideHeader = false, 
    initialFilters,
    isHistorical = false
}: { 
    hideHeader?: boolean; 
    initialFilters?: any;
    isHistorical?: boolean;
}) => {
    // Map dashboard box label → the value the backend/dataProvider expects for status
    const statusApiMap: Record<string, string> = {
        Pending: 'Active', // Dashboard "Pending" maps to "Active" in review list logic
        Approved: 'Approved',
        Returned: 'Returned',
    };

    // When coming from a dashboard tab or box, set the default filters.
    // If no initial filters are provided (e.g. from sidebar), we keep defaultFilters empty 
    // so the UI stays clean (the backend defaults to Pending internally anyway).
    const defaultFilters: any = {};
    
    if (initialFilters) {
        Object.keys(initialFilters).forEach(key => {
            let val = initialFilters[key];
            if (key === 'status') {
                if (val.toLowerCase() === 'all') return; // Don't add to UI filters
                val = statusApiMap[val as keyof typeof statusApiMap] || val;
            }
            defaultFilters[key] = val;
        });
    }

    // Permanent filter: If NOT historical, we force 'Active' (Pending) status
    // This makes the 'For Approval' tab strictly for pending reports.
    const permanentFilter = !isHistorical ? { status: 'Active' } : {};

    const fromDashboard = Boolean(initialFilters);
    const listPerPage = fromDashboard && initialFilters.status !== 'all' ? 1000 : 5;

    return (
        <div className={cn("animate-in fade-in duration-500", !hideHeader && "space-y-5")}>
            {!hideHeader && (
                /* Header Banner */
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 mb-2">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[60px] animate-blob-slow" />
                        <div className="absolute bottom-[-20%] left-[10%] w-[250px] h-[250px] rounded-full bg-amber-500/5 blur-[50px] animate-blob-slower" />
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                <ListChecks className="h-6 w-6 text-primary animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-tight text-foreground uppercase">
                                    {isHistorical ? "AR Historical List" : "AR Review Queue"}
                                </h1>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em] flex items-center gap-2">
                                    <span className="relative flex h-2 w-2 mr-1">
                                        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", isHistorical ? "animate-ping-traffic" : "animate-ping-tri bg-primary")}></span>
                                        <span className={cn("relative inline-flex rounded-full h-2 w-2", isHistorical ? "animate-dot-traffic" : "animate-dot-tri bg-primary")}></span>
                                    </span>
                                    {isHistorical ? "Full history of submitted reports" : "Pending Accomplishment Reports"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <List
                resource="ar-reviews"
                filters={ReviewFilters({ isHistorical })}
                perPage={listPerPage}
                pagination={<ListPagination rowsPerPageOptions={[5, 10, 25, 50, 1000]} />}
                disableBreadcrumb
                title={false}
                filterDefaultValues={defaultFilters}
                filter={permanentFilter}
                className="bg-card rounded-xl border shadow-sm overflow-hidden"
                actions={
                    <div className="flex items-center gap-2">
                        <FilterButton />
                        <ColumnsButton />
                        <ExportButton className="h-8" exporter={arExcelExporter as any} />
                    </div>
                }
            >
                <div className="px-4 py-3 bg-card border-b border-border">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Queue Status</span>
                            <Badge variant="outline" className="text-[10px] h-5 bg-background font-bold tracking-tight">Active Review</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Reports</span>
                            <span className="text-xs font-bold text-foreground">Showing Queue</span>
                        </div>
                    </div>
                </div>
                <DataTable 
                    className="border-none" 
                    empty={<ReviewEmptyState />}
                    rowClick={(id) => isHistorical ? `/team-ar/${id}` : `/ar-reviews/${id}`}
                >
                    <DataTable.Col
                        label="#"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold pl-6"
                        cellClassName="pl-6 py-3"
                    >
                        <RowNumberCell />
                    </DataTable.Col>

                    <DataTable.Col
                        label="Employee"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                        cellClassName="py-3"
                    >
                        <EmployeeCell />
                    </DataTable.Col>

                    <DataTable.Col
                        label="Report Date"
                        source="reportDate"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                        cellClassName="py-3"
                    />
                    <DataTable.Col
                        label="Status"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                        cellClassName="py-3"
                    >
                        <ReviewStatusBadge />
                    </DataTable.Col>

                    {/* APPROVER TEAM COLUMN */}
                    <DataTable.Col
                        label="Approver Team"
                        source="approverTeam"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                        cellClassName="py-3 font-medium text-primary"
                    />

                    {/* EMPLOYEE ROLE & DEPT COLUMNS */}
                    <DataTable.Col
                        label="Employee Role"
                        source="role"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                        cellClassName="py-3"
                    />
                    <DataTable.Col
                        label="Department"
                        source="department"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                        cellClassName="py-3 text-muted-foreground"
                    />

                    <DataTable.Col
                        label="Actions"
                        headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold text-right pr-6"
                        cellClassName="text-right pr-6 py-3"
                    >
                        <ReviewActions isHistorical={isHistorical} />
                    </DataTable.Col>
                </DataTable>
            </List>
        </div>
    );
};


