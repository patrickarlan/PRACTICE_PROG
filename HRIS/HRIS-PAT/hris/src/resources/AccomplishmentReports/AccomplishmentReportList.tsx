import { DeleteButton as RaDeleteButton, ColumnsButton, EmptyState } from "@/components";
import { useState, useEffect } from "react";
import {
    List,
    CreateButton,
    ExportButton,
    EditButton,
    DataTable,
    DateField,
    SearchInput,
    DateInput,
    SelectInput,
    FilterButton,
    ListPagination,
} from "@/components";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FileText, Plus, XCircle, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNotify, useRefresh, useDataProvider, useListContext, RaRecord, usePermissions, useGetList } from "ra-core";
import { ROLE_SUPER_ADMIN, ROLE_VIEWER } from "@/auth/roles";
import { useRecordContext } from "react-admin";
import { getARStatusLabel, getARStatusClass, ARRecord } from "@/features/ar-reviews/arReviewUtils";
import { arExcelExporter } from "./arExcelExporter";

const CustomEmptyState = () => (
    <EmptyState
        title="You have no report"
        description="Start tracking your work by creating your first accomplishment report today."
        action={
            <CreateButton
                label="New Report"
                icon={<Plus className="h-4 w-4" />}
                className="h-9 px-6 shadow-lg bg-primary hover:bg-primary/90 transition-all active:scale-95 mt-2 font-bold text-[10px] uppercase tracking-wider"
                to="/ar-create"
            />
        }
    />
);

const ARFilters = () => {
    const { permissions } = usePermissions();
    const isAdminOrViewer = permissions === ROLE_SUPER_ADMIN || permissions === ROLE_VIEWER;
    const { data: departments } = useGetList('Departments', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' }
    });

    return [
        <SearchInput source="q" alwaysOn key="q" />,
        <DateInput source="reportDate" label="Report Date" key="date" />,
        <SelectInput
            source="status"
            label="Status"
            choices={[
                { id: 'Draft', name: 'Draft' },
                { id: 'Pending', name: 'Pending' },
                { id: 'Approved', name: 'Approved' },
                { id: 'Returned', name: 'Returned' },
            ]}
            key="status"
        />,
        isAdminOrViewer && (
            <SelectInput
                source="department"
                label="Department"
                choices={departments?.map((d: any) => ({ id: d.name, name: d.name })) || []}
                key="dept"
            />
        )
    ].filter(Boolean);
};

// List actions removed in favor of standard header layout

const RowNumberCell = () => {
    const { page, perPage, data } = useListContext();
    const record = useRecordContext();
    if (!record || !data) return null;

    const index = data.findIndex((item: RaRecord) => item.id === record.id);
    const rowNumber = index >= 0 ? (page - 1) * perPage + index + 1 : undefined;
    return <span>{rowNumber ?? "-"}</span>;
};

/**
 * Ensures the 'today' filter is applied on initial load if no date is set.
 * This is more reliable than filterDefaultValues for tabbed views.
 */
const FilterSync = () => {
    const { filterValues, setFilters } = useListContext();
    
    useEffect(() => {
        if (!filterValues.reportDate) {
            const today = new Date().toLocaleDateString('en-CA');
            setFilters({ ...filterValues, reportDate: today }, undefined, true);
        }
    }, []); // Run once on mount

    return null;
};

const ActionButtons = () => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();
    const [isLoading, setIsLoading] = useState(false);

    if (!record) return null;

    const status = record.status?.toLowerCase();
    const isEditable = status === "draft" || status === "returned" || status === "returned_draft";
    const canCancel = status === "pending";
    const canDelete = status === "draft";

    const handleCancel = async () => {
        if (!record.id) return;
        setIsLoading(true);
        try {
            await dataProvider.update<RaRecord>("AccomplishmentReports", {
                id: record.id,
                data: { status: "Draft" },
                previousData: record,
                meta: { skipStatusRoute: true },
            });
            notify("Report canceled and moved back to draft.", { type: "success" });
            refresh();
        } catch (error: unknown) {
            const message = (error as Error)?.message || "Failed to cancel report.";
            notify(message, { type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-muted rounded-full">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] bg-card border-border shadow-xl rounded-xl p-1">
                <DropdownMenuLabel className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground px-2 py-1.5">Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                
                {isEditable && (
                    <DropdownMenuItem 
                        asChild 
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer focus:bg-primary/10 focus:text-primary rounded-lg transition-colors"
                    >
                        <EditButton className="w-full justify-start h-9 px-2 gap-2" label="Edit Report" to={`/my-ar/${record.id}`} />
                    </DropdownMenuItem>
                )}
                
                {canCancel && (
                    <DropdownMenuItem 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleCancel();
                        }}
                        disabled={isLoading}
                        className="cursor-pointer text-orange-600 focus:text-orange-600 focus:bg-orange-50 rounded-lg transition-colors h-9 px-2 gap-2"
                    >
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Cancel Submission</span>
                    </DropdownMenuItem>
                )}

                {canDelete && (
                    <DropdownMenuItem 
                        asChild 
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer focus:bg-destructive/10 focus:text-destructive rounded-lg transition-colors"
                    >
                        <RaDeleteButton className="w-full justify-start h-9 px-2 gap-2" label="Delete Draft" redirect={false} />
                    </DropdownMenuItem>
                )}

                {!isEditable && !canCancel && !canDelete && (
                    <DropdownMenuItem disabled className="text-xs text-muted-foreground italic px-2 py-3">
                        No actions available
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


export const AccomplishmentReportList = ({ hideHeader = false }: { hideHeader?: boolean }) => (
    <div className={cn("animate-in fade-in duration-500", !hideHeader && "space-y-5")}>
        {!hideHeader && (
            /* Header Banner */
            <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-2 gap-4">
                <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-foreground" />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-foreground">Accomplishment Reports</h1>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left">
                            Employee Logs · Internal Records
                        </p>
                    </div>
                </div>
            </div>
        )}

        <List
            resource="AccomplishmentReports"
            filters={ARFilters()}
            disableBreadcrumb
            title={false}
            hasCreate={false}
            perPage={window.location.search.includes('filter=') ? 1000 : 5}
            pagination={<ListPagination rowsPerPageOptions={[5, 10, 25, 50, 1000]} />}
            className="bg-card rounded-xl border shadow-sm overflow-hidden"
            actions={
                <>
                    <FilterButton variant="ghost" size="sm" />
                    <ColumnsButton variant="ghost" size="sm" />
                    <ExportButton className="h-8" exporter={arExcelExporter as any} />
                </>
            }
        >
            <FilterSync />
            <DataTable rowClick={(id) => `/my-ar/${id}`} className="border-none" empty={<CustomEmptyState />}>
                <DataTable.Col
                    label="#"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                >
                    <RowNumberCell />
                </DataTable.Col>

                <DataTable.Col
                    source="title"
                    label="Report Title"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                />

                <DataTable.Col
                    source="items"
                    label="Summary"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                />


                <DataTable.Col
                    label="Status"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                    render={(record: RaRecord) => {
                        const statusText = String(record.status || "Pending");
                        const lowerStatus = statusText.toLowerCase();
                        
                        if (lowerStatus === "draft") {
                            return (
                                <Badge
                                    variant="outline"
                                    className="min-w-[92px] text-center font-bold text-[10px] uppercase bg-orange-50 text-orange-600 border-orange-200"
                                >
                                    Draft
                                </Badge>
                            );
                        }

                        const label = getARStatusLabel(record as unknown as ARRecord);
                        const colorClass = getARStatusClass(record.status as string);
                        const isDestructive = (lowerStatus === 'returned' || lowerStatus === 'rejected');

                        return (
                            <Badge
                                variant={isDestructive ? 'destructive' : 'default'}
                                className={cn("min-w-[92px] text-center font-bold text-[10px] uppercase", colorClass)}
                            >
                                {label}
                            </Badge>
                        );
                    }}
                />

                <DataTable.Col
                    source="approverTeam"
                    label="Approver Team"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                    cellClassName="font-medium text-primary"
                />

                <DataTable.Col
                    source="reportDate"
                    label="Report Date"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                >
                    <DateField source="reportDate" />
                </DataTable.Col>

                <DataTable.Col
                    source="submitted"
                    label="Submitted At"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold"
                />


                <DataTable.Col
                    label="Actions"
                    cellClassName="text-right"
                    headerClassName="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground font-bold text-right"
                >
                    <ActionButtons />
                </DataTable.Col>
            </DataTable>
        </List>
    </div>
);
