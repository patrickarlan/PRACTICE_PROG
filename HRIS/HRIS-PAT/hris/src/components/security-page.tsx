import { useState } from "react";
import { Form, required, useNotify, useGetIdentity } from "ra-core";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OTPInput } from "@/components/otp-input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QRCodeSVG } from "qrcode.react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Smartphone, 
  KeyRound,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const SecurityPage = () => {
  const { data: identity, refetch } = useGetIdentity();
  const [setupData, setSetupData] = useState<{ sharedKey: string; qrCodeUri: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const handleSetupTotp = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/auth/mfa/setup-totp`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSetupData(data);
      } else {
        notify("Failed to initialize MFA setup", { type: "error" });
      }
    } catch {
      notify("An error occurred", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEnableTotp = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/auth/mfa/enable-totp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ code: values.code }),
      });
      if (response.ok) {
        notify("MFA enabled successfully", { type: "info" });
        setSetupData(null);
        refetch();
      } else {
        const error = await response.json().catch(() => ({}));
        notify(error.message || "Invalid verification code", { type: "error" });
      }
    } catch {
      notify("An error occurred", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!identity) return null;

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground">
          Manage your account's security and authentication methods.
        </p>
      </div>
      
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              identity.mfaEnabled ? "bg-primary/10" : "bg-yellow-500/10"
            )}>
              {identity.mfaEnabled ? (
                <ShieldCheck className="text-primary size-6" />
              ) : (
                <ShieldAlert className="text-yellow-600 size-6" />
              )}
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-xl">Two-Factor Authentication (2FA)</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Separator />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-border/50 rounded-xl bg-muted/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-background border border-border shadow-sm">
                <Smartphone className="size-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Authenticator App</p>
                  {identity.mfaEnabled && (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 px-2 py-0">
                      <CheckCircle2 className="size-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  Use an app like Google Authenticator to generate secure, one-time verification codes.
                </p>
              </div>
            </div>
            {!identity.mfaEnabled && !setupData && (
              <Button onClick={handleSetupTotp} disabled={loading} size="sm">
                Configure
              </Button>
            )}
          </div>

          {!identity.mfaEnabled && !setupData && (
            <Alert variant="default" className="bg-yellow-500/5 border-yellow-500/20 text-yellow-700">
              <AlertCircle className="size-4 text-yellow-600" />
              <AlertTitle className="font-semibold">Account at risk</AlertTitle>
              <AlertDescription className="text-yellow-600/90 text-sm">
                Two-factor authentication is currently disabled. We strongly recommend enabling it to protect your account from unauthorized access.
              </AlertDescription>
            </Alert>
          )}

          {setupData && (
            <div className="flex flex-col gap-8 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid md:grid-cols-[240px_1fr] gap-8 items-start">
                <div className="flex flex-col gap-4">
                  <div className="bg-white p-5 border border-border/80 rounded-2xl shadow-md ring-1 ring-black/5 mx-auto md:mx-0">
                    <QRCodeSVG value={setupData.qrCodeUri} size={200} level="H" />
                  </div>
                  <Badge variant="outline" className="justify-center py-1 font-mono text-[10px] tracking-tight uppercase bg-muted/30">
                    Verification Method: TOTP
                  </Badge>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-xs">1</span>
                      Scan QR Code
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Open your authenticator app (e.g., Google Authenticator, Authy) and scan the QR code on the left.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-xs">2</span>
                      Enter Verification Code
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Once scanned, your app will provide a 6-digit code. Enter it below to link your account.
                    </p>
                    
                    <Form onSubmit={handleEnableTotp} className="flex flex-col gap-6 pt-2">
                      <OTPInput
                        label={false}
                        source="code"
                        validate={required()}
                        length={6}
                      />
                      
                      <div className="flex items-center gap-3">
                        <Button type="submit" disabled={loading} className="px-8 shadow-sm">
                          {loading ? "Verifying..." : "Enable 2FA"}
                        </Button>
                        <Button variant="ghost" onClick={() => setSetupData(null)} disabled={loading}>
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  </div>

                  <Separator />
                  
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Troubleshooting</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/40">
                      <KeyRound className="size-3.5" />
                      <span>Cant scan? Use setup key: </span>
                      <code className="bg-background px-1.5 py-0.5 rounded border border-border font-mono font-bold text-foreground">
                        {setupData.sharedKey}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
