import { useEffect } from "react";
import { useAuthState } from "ra-core";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/loading";

/**
 * Fallback component that redirects users back to the dashboard if a route is not found.
 */
export const NotFound = () => {
  const { isPending, authenticated } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && authenticated) {
        // Redirect to root (dashboard) if the user is authenticated but hits a bad link
        navigate("/", { replace: true });
    }
  }, [isPending, authenticated, navigate]);

  return <Loading />;
};
