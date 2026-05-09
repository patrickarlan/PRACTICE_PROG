export function Footer() {
    return (
        <footer className="mt-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground border-t border-border/40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div>
                &copy; {new Date().getFullYear()} HRIS Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
                <a href="/support" className="hover:underline">Contact Support</a>
            </div>
        </footer>
    );
}
