import { Form, required } from "ra-core";
import { useState } from "react";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/text-input";
import { Eye, EyeOff } from "lucide-react";

const loginInputClassName =
  "bg-background border border-input shadow-sm focus-visible:ring-ring/40 dark:border-border pr-10";

interface LoginFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  onForgotPassword: () => void;
  loading: boolean;
}

export const LoginForm = ({
  onSubmit,
  onForgotPassword,
  loading,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <TextInput
          label="Email"
          source="email"
          type="email"
          validate={required()}
          inputClassName={loginInputClassName}
        />
        <TextInput
          label="Password"
          source="password"
          type={showPassword ? "text" : "password"}
          validate={required()}
          inputClassName={loginInputClassName}
          suffix={
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          className="cursor-pointer w-full"
          disabled={loading}
        >
          Sign in
        </Button>
        <Button
          variant="link"
          className="w-full h-auto p-0"
          onClick={onForgotPassword}
          type="button"
        >
          Forgot your password?
        </Button>
      </div>
    </Form>
  );
};
