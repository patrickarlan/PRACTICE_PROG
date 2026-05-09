import {
  List,
  DataTable,
  TextField,
  DateField,
  SearchInput,
  SelectInput,
} from "@/components";
import { useRecordContext } from "ra-core";
import { History } from "lucide-react";

const AuditLogFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <SelectInput
    source="tableName"
    label="Filter Table"
    key="tableName"
    choices={[
      { id: "AccomplishmentReports", name: "Reports" },
      { id: "AspNetUsers", name: "Users" },
    ]}
  />,
  <SelectInput
    source="action"
    label="Filter Action"
    key="action"
    choices={[
      { id: "INSERT", name: "Created" },
      { id: "UPDATE", name: "Modified" },
      { id: "DELETE", name: "Deleted" },
    ]}
  />,
];

const ActionField = () => {
  const record = useRecordContext();
  if (!record) return null;
  const colors: Record<string, string> = {
    INSERT: "text-green-600 bg-green-50",
    UPDATE: "text-blue-600 bg-blue-50",
    DELETE: "text-red-600 bg-red-50",
  };
  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${colors[record.action] || "text-gray-600 bg-gray-50"}`}>
      {record.action === 'INSERT' ? 'Created' : record.action === 'UPDATE' ? 'Modified' : 'Deleted'}
    </span>
  );
};

export const AuditLogList = () => (
  <div className="p-6">
    <div className="flex items-center gap-2 mb-6">
      <div className="p-2 bg-primary/10 rounded-lg">
        <History className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Audit Logs</h1>
        <p className="text-muted-foreground text-sm">
          Track every change made to reports and user accounts.
        </p>
      </div>
    </div>

    <List
      resource="AuditLogs"
      filters={AuditLogFilters}
      sort={{ field: "changedAt", order: "DESC" }}
      perPage={25}
      exporter={false}
    >
      <DataTable rowClick="show">
        <DataTable.Col source="changedAt" label="Timestamp">
            <DateField source="changedAt" showTime />
        </DataTable.Col>
        <DataTable.Col label="Action">
            <ActionField />
        </DataTable.Col>
        <DataTable.Col source="tableName" label="Target Table">
            <TextField source="tableName" className="font-medium" />
        </DataTable.Col>
        <DataTable.Col source="recordId" label="Record ID">
            <TextField source="recordId" className="font-mono text-[11px] text-muted-foreground" />
        </DataTable.Col>
        <DataTable.Col source="changedByName" label="Performed By">
            <TextField source="changedByName" />
        </DataTable.Col>
      </DataTable>
    </List>
  </div>
);
