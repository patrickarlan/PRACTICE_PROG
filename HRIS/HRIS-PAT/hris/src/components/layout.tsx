import type { ErrorInfo } from "react";
import { Suspense, useState } from "react";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { usePermissions, type CoreLayoutProps } from "ra-core";
import { ErrorBoundary } from "react-error-boundary";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/user-menu";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Notification } from "@/components/notification";
import { AppSidebar } from "@/components/app-sidebar";
import { RefreshButton } from "@/components/refresh-button";
import { LocalesMenuButton } from "@/components/locales-menu-button";
import { NavClock } from "@/components/nav-clock";
import { NavNotifications } from "@/components/nav-notifications";
import { Footer } from "@/components/footer";
import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { Profile } from "@/features/profile";
import { Dashboard } from "@/features/employee/pages/Dashboard";
import { ARCreate } from "@/features/employee/pages/ARCreate";
import { ARDashboard } from "@/features/ar-dashboard/ARDashboard";
import { Payslips } from "@/features/employee/pages/Payslips";
import { Leave } from "@/features/employee/pages/Leave";
import { EmployerOutlet } from "@/features/employer/EmployerOutlet";
import { BackgroundMotion } from "@/components/background-motion";
import { GlobalLoader } from "@/components/global-loader";

/**
 * The main application layout with sidebar, header, and content area.
 *
 * Renders the app structure with a collapsible sidebar, header with breadcrumb navigation,
 * theme toggle, user menu, and main content area. Includes error boundary and loading states.
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/layout/ Layout documentation}
 */
export const Layout = (props: CoreLayoutProps) => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | undefined>(undefined);
  const location = useLocation();
  const { isPending } = usePermissions();

  const handleError = (_: unknown, info: ErrorInfo) => {
    setErrorInfo(info);
  };

  // Handle special routes (profile, employee pages)
  const renderSpecialRoute = () => {
    if (
      location.pathname === "/employer" ||
      location.pathname.startsWith("/employer/")
    ) {
      return <EmployerOutlet />;
    }

    switch (location.pathname) {
      case "/profile":
        return <Profile />;
      case "/ar-create":
        return <ARCreate />;
      case "/my-ar":
        return <ARDashboard mode="my-ar" />;
      case "/team-ar":
        return <ARDashboard mode="team-ar" />;
      case "/payslips":
        return <Payslips />;
      case "/leave":
        return <Leave />;
      // case "/inbox":
      //   return <InboxPage />;
      case "/":
        if (isPending) return null;
        return <Dashboard />;
      default:
        return null;
    }
  };

  const specialRouteContent = renderSpecialRoute();

  if (specialRouteContent) {
    return (
      <SidebarProvider>
        <GlobalLoader />
        <BackgroundMotion />
        <AppSidebar />
        <main
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "sm:transition-[width] sm:duration-200 sm:ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
          )}
        >
          <header className="flex h-10 shrink-0 items-center gap-4 px-2 bg-transparent sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-8 w-8" />
            </div>
            <div className="flex-1 flex items-center" id="breadcrumb" />
            <div className="flex items-center gap-1 bg-muted/20 p-0.5 rounded-full border border-border/40">
              <NavClock />
               <div className="w-[1px] h-3 bg-border/40 mx-0.5 hidden sm:block" />
              <NavNotifications />
              <LocalesMenuButton />
              <ThemeModeToggle />
              <RefreshButton />
            </div>
            <UserMenu />
          </header>
          <ErrorBoundary
            onError={handleError}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Error
                error={error}
                errorInfo={errorInfo}
                resetErrorBoundary={resetErrorBoundary}
              />
            )}
          >
            <Suspense fallback={<Loading />}>
              <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-4">
                <div className="flex-1 flex flex-col pb-6">
                  {specialRouteContent}
                </div>
                <Footer />
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Notification />
      </SidebarProvider>
    );
  }

  // Default layout for other routes
  return (
    <SidebarProvider>
      <GlobalLoader />
      <BackgroundMotion />
      <AppSidebar />
      <main
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
        )}
      >
        <header className="flex h-12 md:h-10 shrink-0 items-center gap-2 px-2">
          <SidebarTrigger className="scale-125 sm:scale-100" />
          <div className="flex-1 flex items-center" id="breadcrumb" />
          <NavClock />
          <NavNotifications />
          <LocalesMenuButton />
          <ThemeModeToggle />
          <RefreshButton />
          <UserMenu />
        </header>
        <ErrorBoundary
          onError={handleError}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Error
              error={error}
              errorInfo={errorInfo}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<Loading />}>
            <div className="flex flex-1 flex-col px-4 pb-4 overflow-y-auto">
              <div className="flex-1 flex flex-col pb-6">
                {props.children}
              </div>
              <Footer />
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Notification />
    </SidebarProvider>
  );
};
