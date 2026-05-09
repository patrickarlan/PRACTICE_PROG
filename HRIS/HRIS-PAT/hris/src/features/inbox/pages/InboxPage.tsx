import { useState } from 'react';
import { ListBase, useListContext, useUpdate, useNotify, useRefresh } from 'ra-core';
import { useNavigate } from 'react-router';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    Archive,
    MailOpen,
    ArrowRight,
    Mail,
    Bell,
    CheckCircle2,
    CheckCheck,
    AlertCircle,
    Eye,
    SendHorizonal
} from 'lucide-react';
import { cn } from '@/lib/utils';

const getEventIcon = (eventType: string) => {
    switch (eventType) {
        case 'Approved': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
        case 'Returned': return <AlertCircle className="h-4 w-4 text-red-500" />;
        case 'Viewed': return <Eye className="h-4 w-4 text-blue-500" />;
        case 'Submitted': return <SendHorizonal className="h-4 w-4 text-primary" />;
        default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
};

// Types
type MessageRecord = {
    id: string;
    title: string;
    text: string;
    sender: string;
    date: string;
    read: boolean;
    tags: string[];
    type: string; // 'report' | 'system'
    linkTo: string | null;
    eventType: string;
};

// --- Actions Component ---
const InboxActions = ({ message }: { message: MessageRecord }) => {
    const notify = useNotify();
    const [update] = useUpdate();
    const navigate = useNavigate();

    const handleArchive = () => {
        update('messages', { id: message.id, data: { tags: ['archive'] } }, {
            onSuccess: () => notify(`Message archived`, { type: 'success' })
        });
    };

    const handleToggleRead = () => {
        update('messages', { id: message.id, data: { read: !message.read } });
    };

    const handleOpen = () => {
        if (message.linkTo) {
            navigate(message.linkTo);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleToggleRead} className="h-8 w-8 p-0" title={message.read ? "Mark as unread" : "Mark as read"}>
                <Mail className={cn("h-4 w-4", message.read ? "text-muted-foreground" : "text-primary")} />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleArchive}>
                <Archive className="mr-2 h-4 w-4" /> Archive
            </Button>
            {message.linkTo && (
                <Button size="sm" onClick={handleOpen}>
                    {message.type === 'report' ? 'Open Report' : 'View Details'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
    );
};

// --- Layout Component ---
const InboxLayout = () => {
    const { data, isPending } = useListContext<MessageRecord>();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [update] = useUpdate();
    const notify = useNotify();
    const refresh = useRefresh();
    const [isMarkingAll, setIsMarkingAll] = useState(false);

    const messages = data || [];
    const selectedMessage = messages.find((m) => m.id === selectedId);

    const handleSelect = (msg: MessageRecord) => {
        setSelectedId(msg.id);
        if (!msg.read) {
            update('messages', { id: msg.id, data: { read: true } });
        }
    };

    const handleMarkAllAsRead = async () => {
        setIsMarkingAll(true);
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE}/api/notifications/read-all`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Failed to mark all as read');
            
            notify('All notifications marked as read', { type: 'success' });
            refresh();
        } catch (error) {
            notify('Error marking all as read', { type: 'error' });
        } finally {
            setIsMarkingAll(false);
        }
    };

    const unreadCount = messages.filter(m => !m.read && m.tags?.includes('inbox')).length;

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-card border rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-500">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shadow-inner">
                        <MailOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-foreground">Notifications</h1>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left">
                            HRIS · Notifications
                        </p>
                    </div>
                </div>
                {unreadCount > 0 && (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleMarkAllAsRead} 
                        disabled={isMarkingAll}
                        className="h-8 text-xs font-semibold"
                    >
                        <CheckCheck className="mr-2 h-4 w-4 text-primary" />
                        {isMarkingAll ? 'Marking...' : 'Mark all as read'}
                    </Button>
                )}
            </div>

            {/* @ts-expect-error ResizablePanelGroup types might be incompatible with strict mode */}
            <ResizablePanelGroup direction="horizontal" className="flex-1 items-stretch">
                <ResizablePanel defaultSize={35} minSize={25} className="flex flex-col bg-muted/10">
                    <Tabs defaultValue="inbox" className="flex-1 flex flex-col">
                        <div className="px-4 py-2 border-b border-border">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="inbox">Inbox</TabsTrigger>
                                <TabsTrigger value="archive">Archive</TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Tab Content Helper */}
                        {['inbox', 'archive'].map((tabValue) => (
                            <TabsContent key={tabValue} value={tabValue} className="flex-1 p-0 m-0 data-[state=inactive]:hidden">
                                <ScrollArea className="h-[calc(100vh-14rem)]">
                                    <div className="flex flex-col p-2 gap-1.5">
                                        {isPending ? (
                                            <div className="p-4 text-center text-xs text-muted-foreground">Loading messages...</div>
                                        ) : messages.filter(m => m.tags?.includes(tabValue)).length === 0 ? (
                                            <div className="p-4 text-center text-xs text-muted-foreground">No messages found.</div>
                                        ) : (
                                            messages.filter(m => m.tags?.includes(tabValue)).map((msg) => (
                                                <button
                                                    key={msg.id}
                                                    onClick={() => handleSelect(msg)}
                                                    className={cn(
                                                        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted/50 cursor-pointer",
                                                        selectedId === msg.id ? "bg-muted shadow-sm border-border/80" : "bg-card border-transparent",
                                                        !msg.read && "font-medium border-l-2 border-l-primary"
                                                    )}
                                                >
                                                    <div className="flex w-full justify-between gap-2">
                                                        <div className="flex items-center gap-2 font-semibold text-foreground">
                                                            {getEventIcon(msg.eventType)}
                                                            {msg.sender}
                                                        </div>
                                                        <div className="text-[10px] font-bold tracking-tight uppercase text-muted-foreground whitespace-nowrap pt-1">
                                                            {new Date(msg.date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-semibold leading-none">{msg.title}</div>
                                                    <div className="text-xs text-muted-foreground line-clamp-2 leading-snug">
                                                        {msg.text}
                                                    </div>
                                                    {!msg.read && (
                                                        <Badge variant="default" className="mt-1 h-3.5 px-1.5 text-[9px] rounded-full">
                                                            New
                                                        </Badge>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        ))}
                    </Tabs>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={65} className="bg-card">
                    {selectedMessage ? (
                        <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex sm:items-center flex-col sm:flex-row justify-between gap-4 p-4 md:px-6 md:py-5 border-b border-border bg-muted/5">
                                <div className="grid gap-1.5">
                                    <h2 className="font-bold text-xl tracking-tight leading-none">{selectedMessage.title}</h2>
                                    <div className="flex items-center gap-2">
                                        {getEventIcon(selectedMessage.eventType)}
                                        <span className="text-sm font-semibold">{selectedMessage.sender}</span>
                                        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                            {new Date(selectedMessage.date).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <InboxActions message={selectedMessage} />
                                </div>
                            </div>
                            <ScrollArea className="flex-1 p-4 md:p-6">
                                <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed max-w-3xl">
                                    {selectedMessage.text}
                                </div>
                            </ScrollArea>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground/60 p-8 text-center flex-col gap-2">
                            <MailOpen className="h-10 w-10 opacity-20" />
                            Select a message to read
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

// --- Main Page Export ---
export const InboxPage = () => {
    return (
        <ListBase resource="messages">
            <InboxLayout />
        </ListBase>
    );
};
