import { useState } from "react";
import { Form, required, useNotify } from "ra-core";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextInput } from "@/components/text-input";
import { Notification } from "@/components/notification";
import { useNavigate, useSearchParams } from "react-router";

const inputClassName =
  "bg-background border border-input shadow-sm focus-visible:ring-ring/40 dark:border-border";

export const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const handleSubmit: SubmitHandler<FieldValues> = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: values.email || email, 
          token: values.token || token, 
          newPassword: values.newPassword 
        }),
      });
      setLoading(false);
      if (response.ok) {
        notify("Password reset successfully", { type: "info" });
        navigate("/login");
      } else {
        const error = await response.json();
        notify(error[0]?.description || "Failed to reset password", { type: "error" });
      }
    } catch (e) {
      setLoading(false);
      notify("An error occurred", { type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Reset Password
          </CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form className="space-y-6" onSubmit={handleSubmit}>
            {!email && (
              <TextInput
                label="Email"
                source="email"
                type="email"
                validate={required()}
                inputClassName={inputClassName}
              />
            )}
            {!token && (
              <TextInput
                label="Reset Token"
                source="token"
                validate={required()}
                inputClassName={inputClassName}
              />
            )}
            <TextInput
              label="New Password"
              source="newPassword"
              type="password"
              validate={required()}
              inputClassName={inputClassName}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              Reset Password
            </Button>
            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </Form>
        </CardContent>
      </Card>
      <Notification />
    </div>
  );
};
