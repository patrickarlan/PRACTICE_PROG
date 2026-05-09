import { useState } from 'react';
import { Mail, ArrowLeft, HeadphonesIcon, Send, User, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const ContactSupport = () => {
    const navigate = useNavigate();
    const authenticated = !!localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        issueType: 'technical',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5107';
            const res = await fetch(`${API_BASE}/api/Support`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || 'Support request sent!');
                setForm({ name: '', email: '', issueType: 'technical', subject: '', message: '' });
                // Optional: navigate back after success?
            } else {
                toast.error(data.message || 'Failed to send request.');
            }
        } catch (_error) {
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-700">
            <div className="w-full max-w-2xl">
                <Button 
                    variant="ghost" 
                    className="mb-6 text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest px-0"
                    onClick={() => authenticated ? navigate(-1) : navigate('/login')}
                >
                    <ArrowLeft className="size-4 mr-2" />
                    {authenticated ? 'Go Back' : 'Back to Login'}
                </Button>

                <Card className="border-border/40 shadow-2xl bg-card overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                    <CardHeader className="pt-8 px-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shadow-inner">
                                <HeadphonesIcon className="size-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Support Center</CardTitle>
                                <CardDescription className="text-muted-foreground font-medium uppercase tracking-tighter text-[10px]">
                                    Submit your inquiry and our team will get back to you within 24 hours.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 size-4 text-muted-foreground/50" />
                                    <Input 
                                        required
                                        placeholder="John Doe" 
                                        className="pl-10 bg-muted/20 border-border/50 focus:bg-background transition-all h-11"
                                        value={form.name}
                                        onChange={e => setForm({...form, name: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 size-4 text-muted-foreground/50" />
                                    <Input 
                                        required
                                        type="email"
                                        placeholder="john@example.com" 
                                        className="pl-10 bg-muted/20 border-border/50 focus:bg-background transition-all h-11"
                                        value={form.email}
                                        onChange={e => setForm({...form, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Issue Category</label>
                                <Select value={form.issueType} onValueChange={v => setForm({...form, issueType: v})}>
                                    <SelectTrigger className="bg-muted/20 border-border/50 h-11">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technical">Technical Support</SelectItem>
                                        <SelectItem value="account">Account Access</SelectItem>
                                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                                        <SelectItem value="feature">Feature Request</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                                <div className="relative">
                                    <AlertCircle className="absolute left-3 top-3 size-4 text-muted-foreground/50" />
                                    <Input 
                                        required
                                        placeholder="Brief summary" 
                                        className="pl-10 bg-muted/20 border-border/50 focus:bg-background transition-all h-11"
                                        value={form.subject}
                                        onChange={e => setForm({...form, subject: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Detailed Description</label>
                                <div className="relative">
                                    <MessageCircle className="absolute left-3 top-3 size-4 text-muted-foreground/50" />
                                    <Textarea 
                                        required
                                        placeholder="Please provide as much detail as possible..." 
                                        className="min-h-[150px] pl-10 bg-muted/20 border-border/50 focus:bg-background transition-all pt-3"
                                        value={form.message}
                                        onChange={e => setForm({...form, message: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <Button 
                                    type="submit" 
                                    className="w-full h-12 font-bold uppercase tracking-widest shadow-lg shadow-primary/20 group"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending Request...' : (
                                        <>
                                            Submit Inquiry
                                            <Send className="size-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    
                    <div className="bg-muted/30 border-t border-border/40 p-4 text-center">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                            Direct Support: support@hris.test · Availability: Mon-Fri, 9AM-5PM
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
