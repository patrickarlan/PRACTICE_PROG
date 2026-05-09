import { Show, DateField } from "@/components";
import { useRecordContext } from "ra-core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, User as UserIcon, Shield, FileText } from "lucide-react";

const JsonDiffViewer = () => {
    const record = useRecordContext();
    if (!record) return null;

    const oldData = typeof record.oldData === 'string' ? JSON.parse(record.oldData || '{}') : (record.oldData || {});
    const newData = typeof record.newData === 'string' ? JSON.parse(record.newData || '{}') : (record.newData || {});

    const allKeys = Array.from(new Set([...Object.keys(oldData), ...Object.keys(newData)])).sort();

    return (
        <div className="mt-6 border rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b">
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 w-1/4">Field</th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 w-1/2">Previous State</th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-primary w-1/2">New State</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {allKeys.map(key => {
                        const isChanged = JSON.stringify(oldData[key]) !== JSON.stringify(newData[key]);
                        const isAdded = oldData[key] === undefined;
                        const isRemoved = newData[key] === undefined;

                        if (!isChanged && !isAdded && !isRemoved) return null;

                        return (
                            <tr key={key} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 align-top">
                                    <span className="text-sm font-bold text-slate-700">{key}</span>
                                </td>
                                <td className={`px-6 py-5 align-top ${isAdded ? 'bg-slate-50/30' : 'bg-red-50/30'}`}>
                                    <div className="text-sm font-mono text-slate-600 break-all whitespace-pre-wrap">
                                        {isAdded ? (
                                            <span className="text-slate-400 italic text-xs"> (empty)</span>
                                        ) : (
                                            typeof oldData[key] === 'object' ? 
                                                <pre className="text-xs">{JSON.stringify(oldData[key], null, 2)}</pre> : 
                                                String(oldData[key])
                                        )}
                                    </div>
                                </td>
                                <td className={`px-6 py-5 align-top ${isRemoved ? 'bg-slate-50/30' : 'bg-green-50/30'}`}>
                                    <div className="text-sm font-mono font-bold text-slate-900 break-all whitespace-pre-wrap">
                                        {isRemoved ? (
                                            <span className="text-slate-400 italic font-normal text-xs">(deleted)</span>
                                        ) : (
                                            typeof newData[key] === 'object' ? 
                                                <pre className="text-xs">{JSON.stringify(newData[key], null, 2)}</pre> : 
                                                String(newData[key])
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export const AuditLogShow = () => {
    return (
        <Show title="Audit Log Details">
            <AuditLogShowContent />
        </Show>
    );
};

const AuditLogShowContent = () => {
    const record = useRecordContext();
    if (!record) return null;

    const isUserTable = record.tableName === 'AspNetUsers';

    return (
        <div className="grid gap-8 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border shadow-sm">
                    <CardHeader className="pb-3 px-6 bg-slate-50/50 border-b">
                        <CardTitle className="text-[10px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2">
                            <UserIcon className="w-3 h-3" />
                            Performed By
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <div className="text-lg font-bold tracking-tight text-slate-900">{record.changedByName}</div>
                    </CardContent>
                </Card>

                <Card className="border shadow-sm">
                    <CardHeader className="pb-3 px-6 bg-slate-50/50 border-b">
                        <CardTitle className="text-[10px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2">
                            <History className="w-3 h-3" />
                            Timestamp
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <DateField source="changedAt" showTime className="text-lg font-bold tracking-tight text-slate-900" />
                    </CardContent>
                </Card>

                <Card className="border shadow-sm border-l-4 border-l-primary">
                    <CardHeader className="pb-3 px-6 bg-slate-50/50 border-b">
                        <CardTitle className="text-[10px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2">
                            <Shield className="w-3 h-3" />
                            Target Record
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 px-6">
                        <div className="space-y-3">
                            <div className="text-lg font-black tracking-tight text-slate-900 leading-none">{record.targetName || 'Unknown Record'}</div>
                            
                            <div className="space-y-2 pt-1 border-t border-slate-50 mt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Category</span>
                                    <Badge variant="secondary" className="font-bold text-[9px] h-4 px-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-sm">
                                        {record.tableName === 'AspNetUsers' ? 'EMPLOYEE ACCOUNT' : 
                                         record.tableName === 'ApprovalTeams' ? 'APPROVAL TEAM' :
                                         record.tableName === 'Departments' ? 'DEPARTMENT' :
                                         record.tableName === 'ApprovalTeamMembers' ? 'TEAM MEMBERSHIP' :
                                         record.tableName === 'ApprovalTeamApprovers' ? 'TEAM APPROVER' :
                                         record.tableName}
                                    </Badge>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                        {isUserTable ? 'USER ID' : 'RECORD ID'}
                                    </span>
                                    <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 select-all break-all leading-relaxed">
                                        {record.recordId}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <FileText className="w-4 h-4 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">Modification Details</h3>
                </div>
                <JsonDiffViewer />
            </div>
        </div>
    );
};
