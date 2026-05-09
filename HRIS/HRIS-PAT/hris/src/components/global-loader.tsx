import { useLoading } from "ra-core";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Spinner } from "@/components/ui/spinner";

/**
 * A premium global loading indicator that reacts to React Admin's data fetching state.
 * Displays a sleek, animated progress bar and a Shadcn spinner.
 */
export const GlobalLoader = () => {
    const loading = useLoading();
    const [forceLoading, setForceLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        (window as any).forceGlobalLoading = (state?: boolean) => {
            setForceLoading(prev => state !== undefined ? state : !prev);
        };
    }, []);

    useEffect(() => {
        let showTimeout: NodeJS.Timeout;
        let hideTimeout: NodeJS.Timeout;

        if (loading || forceLoading) {
            // Delay showing the loader by 300ms to prevent flashing on fast navigations
            showTimeout = setTimeout(() => setVisible(true), 300);
        } else {
            // Clear any pending show timeouts if loading finished very fast
            hideTimeout = setTimeout(() => setVisible(false), 150);
        }

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, [loading, forceLoading]);

    if (!mounted || !visible) return null;

    return createPortal(
        <div 
            className={cn(
                "fixed inset-0 z-[999999] transition-all duration-200",
                (loading || forceLoading) ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            {/* Opaque Backdrop */}
            <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px] animate-in fade-in duration-200" />
            
            {/* Progress Bar at Top */}
            <div className="absolute top-0 left-0 right-0 h-1 w-full bg-primary animate-pulse" />

            {/* Shadcn Spinner at Center */}
            <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in-95 duration-200">
                <Spinner className="size-16 text-primary" />
            </div>
        </div>,
        document.body
    );
};
