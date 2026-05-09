import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, LucideIcon } from 'lucide-react';

interface ConnectionErrorProps {
    title?: string;
    message?: string;
    icon?: LucideIcon;
}

export const ConnectionError = ({ 
    title = "Connection Error", 
    message, 
    icon: Icon = AlertCircle 
}: ConnectionErrorProps) => {
    return (
        <div className="p-4">
            <Alert variant="destructive">
                <Icon className="size-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {message || "There was a problem connecting to the server. Please try again later."}
                </AlertDescription>
            </Alert>
        </div>
    );
};
