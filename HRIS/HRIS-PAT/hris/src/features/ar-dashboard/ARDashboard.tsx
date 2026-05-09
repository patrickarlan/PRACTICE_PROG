import { AccomplishmentReportList } from "@/resources/AccomplishmentReports/AccomplishmentReportList";
import { ARReview } from "@/features/ar-reviews/ARReview";
import { ListChecks, FileText } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "@/components";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router";
import { usePermissions, useGetIdentity } from "ra-core";
import { useEffect } from "react";
import { ROLE_SUPER_ADMIN } from "@/auth/roles";

interface ARDashboardProps {
    mode?: 'my-ar' | 'team-ar';
}

export const ARDashboard = ({ mode }: ARDashboardProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { permissions } = usePermissions();
    const { data: identity, isLoading } = useGetIdentity();
    const isAdmin = permissions === ROLE_SUPER_ADMIN;

    const isViewer = identity?.roles?.includes("Viewer");
    const isApprover = identity?.roles?.includes("Approver");

    // General access to Team AR (Historical List)
    const hasTeamARPermission = isAdmin || isApprover || isViewer;

    // Strict access to Review Queue (For Approval)
    const hasReviewPermission = isAdmin || isApprover || (isViewer && identity?.hasAssignedTeams);

    // Viewers and SuperAdmins are considered oversight-only roles in the AR system
    const isAdministrativeUser = isAdmin || isViewer;

    // Safety Guard: Redirect Administrative users away from /my-ar to avoid blank pages
    useEffect(() => {
        if (mode === 'my-ar' && isAdministrativeUser) {
            navigate('/team-ar', { replace: true });
        }
        // Also redirect standard users away from /team-ar if they lack team-ar permission
        if (mode === 'team-ar' && !hasTeamARPermission) {
            navigate('/my-ar', { replace: true });
        }
    }, [mode, isAdministrativeUser, hasReviewPermission, navigate]);

    const title = mode === 'my-ar'
        ? "My Accomplishment Reports"
        : "Team Accomplishment Reports";

    // Ensure we wait for identity to load before deciding permissions
    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 animate-pulse">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-32 w-full bg-muted rounded-2xl" />
                <div className="h-64 w-full bg-muted rounded-xl" />
            </div>
        );
    }

    // Capture filter from URL if present
    const urlFilter = searchParams.get("filter");
    let initialFilters: any = mode === 'team-ar' ? {} : { status: 'Pending' };
    if (urlFilter) {
        try {
            initialFilters = JSON.parse(urlFilter);
        } catch (e) { /* ignore */ }
    }

    return (
        <div className="animate-in fade-in duration-500 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbPage>{mode === 'my-ar' ? 'My ARs' : 'Team ARs'}</BreadcrumbPage>
                </Breadcrumb>

                {/* Premium Header Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 mb-0">
                    {/* Decorative Background Blobs */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[60px] animate-in fade-in duration-1000" />
                        <div className="absolute bottom-[-20%] left-[10%] w-[250px] h-[250px] rounded-full bg-amber-500/5 blur-[50px] animate-in fade-in duration-1000" />
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-sm">
                                {mode === 'team-ar' ? (
                                    <ListChecks className="h-6 w-6 text-primary" />
                                ) : (
                                    <FileText className="h-6 w-6 text-primary" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-tight text-foreground uppercase">{title}</h1>
                                <p className="text-[10px] uppercase font-bold qtext-muted-foreground tracking-[0.2em] flex items-center gap-2 text-left">
                                    <span className="relative flex h-2 w-2 mr-1">
                                        <span className="animate-ping-traffic absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                                        <span className="animate-dot-traffic relative inline-flex rounded-full h-2 w-2"></span>
                                    </span>
                                    Historical List for Accomplishment Reports
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                {mode === 'my-ar' && (
                    <AccomplishmentReportList hideHeader />
                )}
                {mode === 'team-ar' && hasTeamARPermission && (
                    <ARReview
                        key={location.search || "team-ar"}
                        hideHeader
                        initialFilters={initialFilters}
                        isHistorical={true}
                    />
                )}
            </div>
        </div>
    );
};
