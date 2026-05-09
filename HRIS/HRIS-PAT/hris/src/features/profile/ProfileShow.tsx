import { useState } from 'react';
import { useGetIdentity, usePermissions } from 'ra-core';
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Building2, User2,
    LayoutGrid, Briefcase, 
    MoreHorizontal
} from 'lucide-react';
import { ROLE_SUPER_ADMIN } from '@/auth/roles';
import { useAppConfig } from '@/hooks/useAppConfig';
import { 
    EditProfileDialog, 
    ChangePasswordDialog 
} from './components';

export const Profile = () => {
    const { data: identity, refetch } = useGetIdentity();
    const { permissions } = usePermissions();
    const { 
        departments 
    } = useAppConfig();

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isSecurityOpen, setIsSecurityOpen] = useState(false);

    const isAdmin = permissions?.includes(ROLE_SUPER_ADMIN);

    if (!identity) return null;

    // Template Placeholder constant
    // Note: These fields are for templating the look as requested. Backend implementation is not applied yet.
    const NOT_APPLIED = "Not provided"; 

    // Helper for rendering a detail item in the Bento cards
    const BentoItem = ({ label, value }: { label: string; value: string | undefined }) => (
        <div className="space-y-0.5">
            <p className="text-[9px] uppercase font-bold text-muted-foreground/70 tracking-wider">{label}</p>
            <p className="text-xs font-semibold text-foreground leading-tight">{value || NOT_APPLIED}</p>
        </div>
    );

    // Helper for rendering Sidebar Stats
    const SidebarStat = ({ label, value }: { label: string; value: string | number | undefined }) => (
        <div className="bg-muted/30 p-2 rounded-lg border border-border/40 flex flex-col gap-0.5">
            <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-tight opacity-70 leading-none">{label}</p>
            <p className="text-[11px] font-bold text-foreground tracking-tight">{value || NOT_APPLIED}</p>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-500 space-y-4 pb-8">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-0 py-0.5 gap-4">
                <div className="flex items-center gap-3">
                    <User2 className="h-4 w-4 text-foreground/70" />
                    <div>
                        <h1 className="text-base font-bold tracking-tight text-foreground">My Profile</h1>
                        <p className="text-[9px] uppercase font-bold text-muted-foreground/50 tracking-widest leading-none mt-0.5">Account & Organization</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                
                {/* LEFT SIDEBAR: Profile Identity & Stats */}
                <Card className="w-full lg:w-[280px] shrink-0 border-border/40 overflow-hidden shadow-sm flex flex-col h-full">
                    <div className="h-20 bg-primary/5 relative flex items-center justify-center">
                        <div className="absolute top-1/2 translate-y-1/4">
                            <Avatar className="h-20 w-20 border-[4px] border-card shadow-lg">
                                <AvatarImage src={identity.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-black">
                                    {identity.fullName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="mt-12 px-5 pb-5 flex-1 flex flex-col items-center text-center">
                        <h2 className="text-base font-bold tracking-tight text-foreground">{identity.fullName}</h2>
                        <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">{identity.position}</p>
                        
                        <div className="flex items-center gap-1.5 mt-2.5">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold uppercase text-[7px] px-1.5 py-0.5 rounded-full">
                                {identity.primaryRole || 'Employee'}
                            </Badge>
                            <Badge variant="outline" className="text-foreground border-border/40 bg-muted/20 font-bold uppercase text-[7px] px-1.5 py-0.5 rounded-full">
                                Active
                            </Badge>
                        </div>
                        <div className="mt-3 px-3 py-1 rounded-full bg-muted/60 border border-border/40 shadow-inner">
                            <p className="text-[8px] font-mono text-muted-foreground font-black tracking-widest uppercase">
                                UID: {identity.id?.toString().substring(0, 8)}
                            </p>
                        </div>

                        <div className="w-full mt-5 pt-5 border-t border-border/10 flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-2">
                                <SidebarStat label="EMPLOYEE ID" value={`#${identity.employeeId || '00142'}`} />
                                <SidebarStat label="TENURE" value="N/A" />
                                <SidebarStat label="LEAVE LEFT" value="N/A" />
                                <SidebarStat label="JOINED" value="N/A" />
                            </div>

                            <div className="mt-5 space-y-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full h-8 text-[10px] font-bold bg-muted/10 border-border/40 rounded-lg" 
                                    onClick={() => setIsEditProfileOpen(true)}
                                >
                                    Edit Profile
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full h-8 text-[10px] font-bold bg-muted/10 border-border/40 rounded-lg" 
                                    onClick={() => setIsSecurityOpen(true)}
                                >
                                    Security Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* RIGHT AREA: Information Bento Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <Card className="md:col-span-2 border-border/40 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-border/5 py-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                    <LayoutGrid className="size-3.5" />
                                </div>
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.15em]">Contact & Identity</CardTitle>
                            </div>
                            <CardAction>
                                <Button variant="ghost" size="icon" className="size-7">
                                    <MoreHorizontal className="size-3.5" />
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                <BentoItem label="EMAIL ADDRESS" value={identity.email} />
                                <BentoItem label="MOBILE NO." value={identity.phoneNumber} />
                                <BentoItem label="DATE OF BIRTH" value={undefined} />
                                <BentoItem label="ADDRESS" value={undefined} />
                                <BentoItem label="GENDER" value={undefined} />
                                <BentoItem label="NATIONALITY" value={undefined} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 shadow-sm">
                        <CardHeader className="flex flex-row items-center gap-2 border-b border-border/5 py-3">
                            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                                <Building2 className="size-3.5" />
                            </div>
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.15em]">Organization</CardTitle>
                        </CardHeader>
                        <CardContent className="py-4 space-y-4">
                            <BentoItem label="DEPARTMENT" value={identity.department} />
                            <BentoItem label="SUPERVISOR" value={identity.supervisorName} />
                            <BentoItem label="WORK LOCATION" value={undefined} />
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 shadow-sm">
                        <CardHeader className="flex flex-row items-center gap-2 border-b border-border/5 py-3">
                            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                                <Briefcase className="size-3.5" />
                            </div>
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.15em]">Employment</CardTitle>
                        </CardHeader>
                        <CardContent className="py-4 space-y-4">
                            <BentoItem label="TYPE" value={undefined} />
                            <BentoItem label="POSITION" value={identity.position} />
                            <BentoItem label="SCHEDULE" value={undefined} />
                        </CardContent>
                    </Card>
                </div>
            </div>




            <EditProfileDialog
                open={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                identity={identity}
                departments={departments}
                onSuccess={refetch}
                isAdmin={isAdmin}
            />

            <ChangePasswordDialog
                open={isSecurityOpen}
                onClose={() => setIsSecurityOpen(false)}
            />
        </div>
    );
};
