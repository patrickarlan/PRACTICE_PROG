import React from 'react';
import { Loader2 } from 'lucide-react';

interface LogoutOverlayProps {
    isVisible: boolean;
}

export const LogoutOverlay: React.FC<LogoutOverlayProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center animate-in fade-in duration-300">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
            
            {/* Content */}
            <div className="relative flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl">
                <div className="relative">
                    {/* Pulsing ring around the spinner */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
                </div>
                
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Signing out safely
                    </h2>
                    <p className="text-sm text-muted-foreground animate-pulse">
                        Cleaning up your session...
                    </p>
                </div>
            </div>
        </div>
    );
};
