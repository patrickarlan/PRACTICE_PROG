import { useEffect, useState, useMemo } from 'react';
import { Clock, ShieldCheck, User as UserIcon, Users, Settings } from 'lucide-react';
import { useGetIdentity, usePermissions } from 'ra-core';
import { ROLE_SUPER_ADMIN, ROLE_APPROVER, ROLE_VIEWER, pickPrimaryRole } from '@/auth/roles';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function NavClock() {
    const [time, setTime] = useState(new Date());
    const { data: identity } = useGetIdentity();
    const { permissions } = usePermissions();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const roleInfo = useMemo(() => {
        if (!identity) return null;

        const roles = identity.roles || [];
        const isAdmin = permissions === ROLE_SUPER_ADMIN || roles.includes(ROLE_SUPER_ADMIN);
        const teamName = identity.teamName;
        const managedTeams: string[] = identity.managedTeams || [];
        const primaryRole = pickPrimaryRole(roles);
        const userDept = identity.department === 'Unassigned' ? '' : identity.department;

        let roleLabel = 'CREATOR';
        let rolePurpose = 'Report Creator';
        let Icon = UserIcon;
        let color = 'text-muted-foreground';

        if (isAdmin || primaryRole === ROLE_SUPER_ADMIN) {
            roleLabel = 'SUPER ADMIN';
            rolePurpose = 'System-wide Administrator';
            Icon = Settings;
            color = 'text-rose-500';
        } else if (primaryRole === ROLE_VIEWER) {
            roleLabel = 'VIEWER';
            rolePurpose = `Viewer for ${userDept || 'assigned departments'}`;
            Icon = ShieldCheck;
            color = 'text-blue-500';
        } else if (primaryRole === ROLE_APPROVER) {
            roleLabel = 'APPROVER';
            rolePurpose = `Approver for ${teamName || 'assigned teams'}`;
            Icon = Users;
            color = 'text-amber-500';
        }

        const deptPurpose = `Designated department: ${userDept || 'General'}`;
        
        // If it's a viewer/approver with managed teams, use that list
        const displayTeams = managedTeams.length > 0 ? managedTeams : (teamName ? [teamName] : []);

        return { 
            label: roleLabel, 
            dept: userDept || 'Staff', 
            teams: displayTeams, 
            Icon, 
            color,
            rolePurpose,
            deptPurpose,
            primaryRole
        };
    }, [identity, permissions]);

    return (
        <div className="hidden lg:flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3">
            {roleInfo && (
                <TooltipProvider>
                    <div className="flex items-center gap-1.5 py-0.5 px-2 rounded-full bg-muted/30 border border-border/40 whitespace-nowrap overflow-hidden max-w-[50vw]">
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1.5 cursor-help shrink-0">
                                    <roleInfo.Icon className={`h-3 w-3 ${roleInfo.color}`} />
                                    <span className="text-foreground">{roleInfo.label}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-[10px] py-1 px-2">
                                <p>{roleInfo.rolePurpose}</p>
                            </TooltipContent>
                        </Tooltip>

                        <span className="opacity-40 px-1 shrink-0">·</span>

                        <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                                <span className="cursor-help hover:text-foreground transition-colors shrink-0">{roleInfo.dept}</span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-[10px] py-1 px-2">
                                <p>{roleInfo.deptPurpose}</p>
                            </TooltipContent>
                        </Tooltip>

                        {roleInfo.teams.map((t, idx) => (
                            <div key={idx} className="flex items-center shrink-0">
                                <span className="opacity-40 px-1.5 shrink-0">|</span>
                                <Tooltip delayDuration={200}>
                                    <TooltipTrigger asChild>
                                        <span className="text-foreground/80 cursor-help hover:text-foreground transition-colors truncate max-w-[120px]">
                                            {t}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="text-[10px] py-1 px-2">
                                        <p>
                                            {roleInfo.primaryRole === ROLE_APPROVER || roleInfo.primaryRole === ROLE_VIEWER
                                                ? `Assigned to approve: ${t}`
                                                : `Assigned team to create reports: ${t}`}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </TooltipProvider>
            )}

            <div className="flex items-center gap-2 border-l border-border/40 pl-3">
                <Clock className="h-3 w-3" />
                <span>
                    {time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="mx-1">•</span>
                <span className="text-foreground">
                    {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
}
