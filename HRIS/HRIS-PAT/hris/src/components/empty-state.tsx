import { ReactNode } from "react";
import { LucideIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export const EmptyState = ({
    icon: Icon = FileText,
    title,
    description,
    action,
    className
}: EmptyStateProps) => {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-4 text-center py-20 px-4", className)}>
            <div className="bg-primary/10 p-4 rounded-full animate-pulse">
                <Icon className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                {description && (
                    <p className="text-muted-foreground text-xs max-w-xs mx-auto">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
};
