export const ROLE_SUPER_ADMIN = "SuperAdmin";
export const ROLE_APPROVER = "Approver";
export const ROLE_VIEWER = "Viewer";
export const ROLE_EMPLOYEE = "Creator";

const PRECEDENCE = [ROLE_SUPER_ADMIN, ROLE_VIEWER, ROLE_APPROVER, ROLE_EMPLOYEE] as const;

/**
 * When multiple roles are assigned, the highest-precedence wins.
 * Empty or unknown roles behave as Employee for routing and UI gates.
 */
export function pickPrimaryRole(roles: string[]): string {
  if (!roles?.length) {
    return ROLE_EMPLOYEE;
  }
  for (const r of PRECEDENCE) {
    if (roles.includes(r)) {
      return r;
    }
  }
  return ROLE_EMPLOYEE;
}

export function getPostLoginRedirect(_primaryRole?: string): string {
  return "/";
}

export function canAccessEmployeesResource(primaryRole: string): boolean {
  return primaryRole === ROLE_SUPER_ADMIN;
}
