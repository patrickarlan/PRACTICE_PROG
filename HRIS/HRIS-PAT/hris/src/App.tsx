import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router";
import { Admin } from "@/components/admin";
import { authProvider } from "@/authProvider";
import { dataProvider } from "@/dataProvider";
import { CustomRoutes, Resource } from "ra-core";
import { QueryClient } from "@tanstack/react-query";

import { AuditLogList } from "./features/audit-logs/AuditLogList";
import { AuditLogShow } from "./features/audit-logs/AuditLogShow";
import { Dashboard } from "./features/employee/pages/Dashboard";
import { ApprovalTeamList } from "./features/team-management/pages/ApprovalTeamList";
import { UserRound, MessageSquare, FileText, ClipboardCheck, History, ShieldCheck } from "lucide-react";
import { ARDashboard } from "@/features/ar-dashboard/ARDashboard";
import { ARCreate } from "./features/employee/pages/ARCreate";
import { AREdit } from "./features/employee/pages/AREdit";
import { ARReviewDetail } from "./features/ar-reviews/ARReviewDetail";
import { ARReview } from "./features/ar-reviews/ARReview";
import { ResetPasswordPage } from "./components/reset-password-page";
import { SecurityPage } from "./components/security-page";
import { ContactSupport } from "./components/contact-support";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const AdminApp = () => {
  return (
    <>
      <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        queryClient={queryClient}
        dashboard={Dashboard}
        requireAuth
      >
        <CustomRoutes noLayout>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </CustomRoutes>

        <CustomRoutes>
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/AccomplishmentReports/create" element={<Navigate to="/ar-create" replace />} />
          <Route path="/my-ar" element={<ARDashboard mode="my-ar" />} />
          <Route path="/my-ar/:id" element={<AREdit />} />
          <Route path="/team-ar" element={<ARDashboard mode="team-ar" />} />
          <Route
            path="/AccomplishmentReports"
            element={
              <Navigate
                to={window.location.search.includes('tab=reviews') ? "/team-ar" : "/my-ar"}
                replace
              />
            }
          />
          <Route
            path="/team-ar/:id"
            element={<ARReviewDetail />}
          />
        </CustomRoutes>

        {/* List/edit access for `employees` is limited to SuperAdmin & Manager via authProvider.canAccess */}
        <Resource name="employees" icon={UserRound} />
        <Resource name="messages" icon={MessageSquare} />
        <Resource
          icon={ClipboardCheck}
          name="ar-reviews"
          list={ARReview}
          edit={ARReviewDetail}
        />
        <Resource
          icon={FileText}
          name="AccomplishmentReports"
          options={{ label: 'Accomplishment Reports' }}
          create={ARCreate}
          edit={AREdit}
        />
        <Resource
          name="AuditLogs"
          list={AuditLogList}
          show={AuditLogShow}
          icon={History}
          options={{ label: 'Audit Logs' }}
        />
        <Resource
          name="ApprovalTeams"
          list={ApprovalTeamList}
          icon={ShieldCheck}
          options={{ label: 'Approval Teams' }}
        />
      </Admin>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/support" element={<ContactSupport />} />
      <Route path="/*" element={<AdminApp />} />
    </>
  )
);

const App = () => (
  <RouterProvider router={router} />
);

export default App;