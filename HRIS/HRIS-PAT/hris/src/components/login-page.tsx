import { useState, useEffect } from "react";
import { useNotify, useAuthProvider, useAuthState } from "ra-core";
import { useNavigate } from "react-router";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notification } from "@/components/notification";
import { Footer, Spinner } from "@/components";
import {
  Showcase,
  LoginForm,
  MfaForm,
  ForgotPasswordForm,
} from "./login";

/**
 * Login page displayed when authentication is enabled and the user is not authenticated.
 *
 * Automatically shown when an unauthenticated user tries to access a protected route.
 * Handles login via authProvider.login() and displays error notifications on failure.
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/loginpage LoginPage documentation}
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/security Security documentation}
 */
export const LoginPage = (props: { redirectTo?: string }) => {
  const { redirectTo } = props;
  const [loading, setLoading] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [forgotStep, setForgotStep] = useState(false);
  const [email, setEmail] = useState("");
  const authProvider = useAuthProvider();
  const navigate = useNavigate();
  const notify = useNotify();
  const { isPending, authenticated } = useAuthState();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isPending && authenticated) {
      navigate("/");
    }
  }, [isPending, authenticated, navigate]);

  if (isPending || authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    if (!authProvider) return;
    setLoading(true);
    
    authProvider.login({ ...values, mfaStep, email: mfaStep ? email : values.email })
      .then((res: any) => {
        setLoading(false);
        if (res && res.requiresMfa) {
          setMfaStep(true);
          setEmail(res.email);
          return;
        }
        
        // Manual redirect on success
        const destination = res?.redirectTo || redirectTo || "/";
        navigate(destination);
      })
      .catch((error: any) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
              ? "ra.auth.sign_in_error"
              : error.message,
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                    ? error.message
                    : undefined,
            },
          },
        );
      });
  };

  const handleForgotPassword = async (values: FieldValues) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        },
      );
      setLoading(false);
      if (response.ok) {
        notify("Reset code sent to your email", { type: "info" });
        setForgotStep(false);
      } else {
        notify("Failed to send reset code", { type: "error" });
      }
    } catch (e) {
      setLoading(false);
      notify("An error occurred", { type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="container relative grid min-h-screen w-full flex-col items-center justify-center sm:max-w-none lg:grid-cols-2 lg:items-stretch lg:px-0">
        <Showcase />
        <div className="relative flex flex-col min-h-screen items-center justify-center overflow-hidden bg-background lg:min-h-0 lg:h-full lg:p-8 w-full">
          <img
            src={`${import.meta.env.BASE_URL}ooorganize.svg`}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14] mix-blend-multiply dark:opacity-[0.22] dark:mix-blend-soft-light"
            aria-hidden
          />
          <div className="flex-1 flex items-center justify-center w-full">
            <Card className="relative z-10 mx-auto w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {mfaStep
                    ? "Two-Factor Auth"
                    : forgotStep
                      ? "Reset Password"
                      : "Sign in"}
                </CardTitle>
                <CardDescription>
                  {mfaStep
                    ? "Enter the code sent to your email or from your app"
                    : forgotStep
                      ? "Enter your email to receive a reset code"
                      : "Access your HRIS workspace"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {forgotStep ? (
                  <ForgotPasswordForm
                    onSubmit={handleForgotPassword}
                    onBack={() => setForgotStep(false)}
                    loading={loading}
                  />
                ) : mfaStep ? (
                  <MfaForm
                    onSubmit={handleSubmit}
                    onBack={() => setMfaStep(false)}
                    loading={loading}
                  />
                ) : (
                  <LoginForm
                    onSubmit={handleSubmit}
                    onForgotPassword={() => setForgotStep(true)}
                    loading={loading}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <Footer />
        </div>
      </div>
      <Notification />
    </div>
  );
};
