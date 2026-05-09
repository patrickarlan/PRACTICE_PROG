import type { AuthProvider } from "ra-core";
import {
  getPostLoginRedirect,
  pickPrimaryRole,
} from "@/auth/roles";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_STORAGE_KEY = "userData";
const ROLES_STORAGE_KEY = "userRoles";

async function fetchProfileAndCacheRoles(token: string) {
  try {
    const response = await fetch(`${API_BASE}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      throw { status: 401 };
    }

    if (!response.ok) {
      throw new Error("Profile request failed");
    }

    const user = await response.json();
    const roles: string[] = Array.isArray(user.roles) ? user.roles : [];
    localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 401) throw error;

    const cachedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }
    throw error;
  }
}

async function getPrimaryRoleFromStorageOrFetch(): Promise<string> {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return Promise.reject();
  }

  let rawRoles = localStorage.getItem(ROLES_STORAGE_KEY);
  if (rawRoles === null) {
    try {
      const user = await fetchProfileAndCacheRoles(token);
      rawRoles = JSON.stringify(user.roles || []);
    } catch (e) {
      if (e && typeof e === 'object' && 'status' in e && e.status === 401) throw e;
      rawRoles = "[]";
    }
  }

  const roles = JSON.parse(rawRoles) as string[];
  return pickPrimaryRole(roles);
}

export const authProvider: AuthProvider = {
  login: async ({ email, password, code, mfaStep }) => {
    const endpoint = mfaStep ? `${API_BASE}/api/auth/verify-2fa` : `${API_BASE}/api/auth/login`;
    const body = mfaStep ? { email, code } : { email, password };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Invalid credentials or code");
    }

    const data = await response.json();

    if (data.requiresTwoFactor) {
      // Return a special object that the custom login page will handle
      return {
        requiresMfa: true,
        email: data.email,
        message: "MFA Required"
      };
    }

    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

    const user = await fetchProfileAndCacheRoles(data.accessToken);
    const roles: string[] = Array.isArray(user.roles) ? user.roles : [];
    const primary = pickPrimaryRole(roles);

    return {
      redirectTo: getPostLoginRedirect(primary),
    };
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ROLES_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkError: async (error) => {
    const status = error.status;
    if (status === 401) {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        try {
          const response = await fetch(`${API_BASE}/api/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: refreshToken }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem(TOKEN_KEY, data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
            return Promise.resolve(); // Token refreshed, retry request
          }
        } catch {
          // Refresh failed
        }
      }

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(ROLES_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return Promise.reject();

    try {
      const user = await fetchProfileAndCacheRoles(token);
      const roles: string[] = Array.isArray(user.roles) ? user.roles : [];
      const primaryRole = pickPrimaryRole(roles);
      const profileClaims = Array.isArray(user.claims) ? user.claims : [];
      const normalizedClaims = profileClaims.map((claim: { Type?: string; type?: string; Value?: string; value?: string }) => ({
        type: claim.Type ?? claim.type,
        value: claim.Value ?? claim.value,
      }));

      return Promise.resolve({
        id: user.id,
        email: user.email,
        fullName: user.fullName || user.userName || user.email,
        department: user.department || "Unassigned",
        position: user.position || "Not specified",
        status: "Active",
        roles,
        primaryRole,
        claims: normalizedClaims,
        mfaEnabled: user.mfaEnabled,
        supervisorId: user.supervisorId,
        supervisorName: user.supervisorName,
        viewerId: user.viewerId,
        viewerName: user.viewerName,
        teamName: user.teamName,
        hasAssignedTeams: user.hasAssignedTeams,
        managedTeams: user.managedTeams
      });

    } catch (e) {
      return Promise.reject(e);
    }
  },
  getPermissions: async () => {
    return getPrimaryRoleFromStorageOrFetch();
  },
  canAccess: async ({ resource }) => {
    const role = await getPrimaryRoleFromStorageOrFetch();

    if (resource === 'AuditLogs' || resource === 'employees') {
      return role === 'SuperAdmin';
    }

    return true;
  },
};
