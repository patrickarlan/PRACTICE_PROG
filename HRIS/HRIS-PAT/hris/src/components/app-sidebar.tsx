import { createElement } from "react";
import {
  useCanAccess,
  useCreatePath,
  useGetIdentity,
  useGetResourceLabel,
  usePermissions,
  useResourceDefinitions,
  useTranslate,
  useRefresh,
} from "ra-core";
import { Link, useMatch } from "react-router";
import {
  ROLE_SUPER_ADMIN,
  ROLE_APPROVER,
  ROLE_VIEWER,
  getPostLoginRedirect,
} from "@/auth/roles";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  List,
  Plus,
  ReceiptText,
  Settings2,
  Shell,
  ShieldCheck,
  Users,
} from "lucide-react";

/**
 * Navigation sidebar displaying menu items, allowing users to navigate between different sections of the application.
 *
 * The sidebar can collapse to an icon-only view and renders as a collapsible drawer on mobile devices.
 * It automatically includes links to the dashboard (if defined) and all list views defined in Resource components.
 *
 * Included in the default Layout component
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/appsidebar AppSidebar documentation}
 * @see {@link https://ui.shadcn.com/docs/components/sidebar shadcn/ui Sidebar component}
 * @see layout.tsx
 */

function SecurityMenuItem({ onClick, className }: { onClick?: () => void; className?: string }) {
  const match = useMatch({ path: "/security", end: true });
  return (
    <SidebarMenuButton asChild isActive={!!match} className={className}>
      <Link to="/security" onClick={onClick}>
        <ShieldCheck className="!size-4" />
        Security
      </Link>
    </SidebarMenuButton>
  );
}

/** Workspace links for Employee: ARs and New AR. */
function MyWorkspaceNav({ onClick }: { onClick?: () => void }) {
  const { permissions } = usePermissions();
  const { data: identity } = useGetIdentity();

  const isViewer = identity?.roles?.includes(ROLE_VIEWER);
  const isAdmin = permissions === ROLE_SUPER_ADMIN;

  const myArPath = "/my-ar";
  const arCreateMatch = useMatch({ path: "/ar-create", end: false });
  const myArMatch = useMatch({ path: "/my-ar", end: false });

  // Hide My Workspace for Viewers and Admins (Viewers use Team AR for oversight)
  if (isAdmin || isViewer) {
    return null;
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={!!myArMatch}>
          <Link to={myArPath} onClick={onClick}>
            <FileText className="!size-4" />
            My AR
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={!!arCreateMatch}>
          <Link to="/ar-create" onClick={onClick}>
            <Plus className="!size-4" />
            New AR
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}

/** Payroll and Benefits links for Employee: Payslips and Leave. */
function PayrollBenefitsNav({ onClick }: { onClick?: () => void }) {
  const payslipsMatch = useMatch({ path: "/payslips", end: false });
  const leaveMatch = useMatch({ path: "/leave", end: false });

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={!!payslipsMatch}>
          <Link to="/payslips" onClick={onClick}>
            <ReceiptText className="!size-4" />
            My Payslips
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={!!leaveMatch}>
          <Link to="/leave" onClick={onClick}>
            <CalendarDays className="!size-4" />
            Leave Management
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}

/** Employer links for Manager and SuperAdmin users. */
function EmployerManagerNav({ onClick }: { onClick?: () => void }) {
  const { permissions, isPending } = usePermissions();
  const teamMatch = useMatch({ path: "/employer/team", end: false });
  const configMatch = useMatch({ path: "/employer/config", end: false });

  if (isPending) {
    return (
      <>
        <SidebarMenuItem>
          <Skeleton className="h-8 w-full" />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Skeleton className="h-8 w-full" />
        </SidebarMenuItem>
      </>
    );
  }

  if (permissions !== ROLE_SUPER_ADMIN) {
    return null;
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={!!teamMatch}>
          <Link to="/employer/team" onClick={onClick}>
            <Users className="!size-4" />
            Employees
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={!!configMatch}>
          <Link to="/employer/config" onClick={onClick}>
            <Settings2 className="!size-4" />
            Configurations
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}

export function AppSidebar() {
  const resources = useResourceDefinitions();
  const { permissions } = usePermissions();
  const { data: identity } = useGetIdentity();
  const { openMobile, setOpenMobile } = useSidebar();
  const refresh = useRefresh();

  const dashboardPath = getPostLoginRedirect();

  const handleClick = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
    // Silently refresh data without full page reload
    refresh();
  };
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={dashboardPath}>
                <Shell className="!size-5" />
                <span className="text-base font-semibold">HRIS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* 1. GENERAL Group */}
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <DashboardMenuItem onClick={handleClick} />
              <InboxMenuItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 2. MY WORKSPACE Group - Hidden for Admin and Viewer */}
        {permissions !== ROLE_SUPER_ADMIN && 
         !identity?.roles?.includes(ROLE_VIEWER) && 
         !identity?.position?.toLowerCase().includes("viewer") && (
            <SidebarGroup>
              <SidebarGroupLabel>My Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <MyWorkspaceNav onClick={handleClick} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

        {/* 3. ACTIVITIES Group - Visible to SuperAdmin, Viewer, and Approver */}
        {(permissions === ROLE_SUPER_ADMIN ||
          identity?.roles?.includes(ROLE_VIEWER) ||
          identity?.roles?.includes(ROLE_APPROVER)) && (
            <SidebarGroup>
              <SidebarGroupLabel>ACTIVITIES</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <ARReviewMenuItem onClick={handleClick} />
                  <ForApprovalMenuItem onClick={handleClick} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

        {/* 4. PAYROLL & BENEFITS Group - Visible to non-Admins */}
        {permissions !== ROLE_SUPER_ADMIN && (
          <SidebarGroup>
            <SidebarGroupLabel>Payroll & Benefits</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <PayrollBenefitsNav onClick={handleClick} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* 5. SETTINGS Group - Always Last */}
        <SidebarGroup>
          <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {permissions === ROLE_SUPER_ADMIN && (
                <>
                  {Object.keys(resources)
                    .filter((name) => name === "ApprovalTeams" && resources[name].hasList)
                    .map((name) => (
                      <ResourceMenuItem
                        key={name}
                        name={name}
                        label="Approver Team"
                        onClick={handleClick}
                      />
                    ))}
                  <EmployerManagerNav onClick={handleClick} />
                </>
              )}
              
              {/* Security is visible to ALL users */}
              <SecurityMenuItem onClick={handleClick} className="!bg-transparent hover:!bg-sidebar-accent" />
              
              {permissions === ROLE_SUPER_ADMIN && Object.keys(resources)
                .filter((name) => name === "AuditLogs" && resources[name].hasList)
                .map((name) => (
                  <ResourceMenuItem
                    key={name}
                    name={name}
                    onClick={handleClick}
                  />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

/**
 * Menu item for the dashboard link in the sidebar.
 *
 * This component renders a sidebar menu item that links to the dashboard page.
 * It displays as active when the user is on the dashboard route.
 *
 * @example
 * <DashboardMenuItem onClick={handleClick} />
 */
export const DashboardMenuItem = ({ onClick }: { onClick?: () => void }) => {
  const translate = useTranslate();
  const label = translate("ra.page.dashboard", {
    _: "Dashboard",
  });
  const dashboardPath = getPostLoginRedirect();
  const match = useMatch({ path: dashboardPath, end: true });
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={!!match}>
        <Link to={dashboardPath} onClick={onClick}>
          <LayoutDashboard className="!size-4" />
          {label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const InboxMenuItem = () => {
  // Hide inbox menu item for now
  return null;
};

export const ARReviewMenuItem = ({ onClick }: { onClick?: () => void }) => {
  const { data: identity } = useGetIdentity();
  const { permissions } = usePermissions();
  const arReviewPath = "/team-ar";
  const match = useMatch({ path: "/team-ar", end: false });
  const isActive = !!match;

  const isAdmin = permissions === ROLE_SUPER_ADMIN;
  const hasReviewRole = isAdmin || identity?.roles?.includes(ROLE_VIEWER) || identity?.roles?.includes(ROLE_APPROVER);

  if (!hasReviewRole) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={arReviewPath} onClick={onClick}>
          <Users className="!size-4" />
          Team AR
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const ForApprovalMenuItem = ({ onClick }: { onClick?: () => void }) => {
  const { data: identity } = useGetIdentity();
  const { permissions } = usePermissions();
  const forApprovalPath = `/ar-reviews`;
  const match = useMatch({ path: "/ar-reviews", end: false });
  const isActive = !!match;

  const isAdmin = permissions === ROLE_SUPER_ADMIN;
  const isApprover = identity?.roles?.includes(ROLE_APPROVER);
  const isViewer = identity?.roles?.includes(ROLE_VIEWER);
  
  // Viewers only see 'For Approval' if they have assigned teams to watch
  const hasApproverRole = isApprover || (isViewer && identity?.hasAssignedTeams);

  if (!isAdmin && !hasApproverRole) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={forApprovalPath} onClick={onClick}>
          <ClipboardCheck className="!size-4" />
          For Approval
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

/**
 * Menu item for a resource link in the sidebar.
 *
 * This component renders a sidebar menu item that links to a resource's list view.
 * It checks permissions using canAccess and displays as active when the user is viewing that resource.
 * The component icon and label are derived from the resource definition.
 *
 * @example
 * <ResourceMenuItem key={name} name="posts" onClick={handleClick} />
 */
export const ResourceMenuItem = ({
  name,
  label,
  onClick,
}: {
  name: string;
  label?: string;
  onClick?: () => void;
}) => {
  const { canAccess, isPending } = useCanAccess({
    resource: name,
    action: "list",
  });
  const resources = useResourceDefinitions();
  const getResourceLabel = useGetResourceLabel();
  const createPath = useCreatePath();
  const to = createPath({
    resource: name,
    type: "list",
  });
  const match = useMatch({ path: to, end: false });

  if (isPending) {
    return <Skeleton className="h-8 w-full" />;
  }

  if (!resources || !resources[name] || !canAccess) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={!!match}>
        <Link to={to} state={{ _scrollToTop: true }} onClick={onClick}>
          {resources[name].icon ? (
            createElement(resources[name].icon)
          ) : (
            <List />
          )}
          {label || getResourceLabel(name, 2)}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
