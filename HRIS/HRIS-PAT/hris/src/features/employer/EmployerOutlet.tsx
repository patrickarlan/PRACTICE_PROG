import { Navigate, useLocation } from 'react-router';
import { usePermissions } from 'ra-core';
import { ROLE_SUPER_ADMIN } from '@/auth/roles';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { Team } from './pages/Team';
import { Config } from './pages/Config';

export const EmployerOutlet = () => {
  const location = useLocation();
  const { permissions, isPending } = usePermissions();

  if (isPending) {
    return null;
  }

  const isManagerArea = permissions === ROLE_SUPER_ADMIN;

  if (!isManagerArea) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === '/employer') {
    return <Navigate to="/employer/dashboard" replace />;
  }

  switch (location.pathname) {
    case '/employer/dashboard':
      return <EmployerDashboard />;
    case '/employer/team':
      return <Team />;
    case '/employer/config':
      return <Config />;
    default:
      return <Navigate to="/employer/dashboard" replace />;
  }
};
