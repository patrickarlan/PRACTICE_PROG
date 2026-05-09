import { Form, required } from "ra-core";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/text-input";

const loginInputClassName =
  "bg-background border border-input shadow-sm focus-visible:ring-ring/40 dark:border-border";

interface ForgotPasswordFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  onBack: () => void;
  loading: boolean;
}

export const ForgotPasswordForm = ({
  onSubmit,
  onBack,
  loading,
}: ForgotPasswordFormProps) => {
  return (
    <Form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <TextInput
        label="Email"
        source="email"
        type="email"
        validate={required()}
        inputClassName={loginInputClassName}
      />
      <div className="flex flex-col gap-4">
        <Button type="submit" className="w-full" disabled={loading}>
          Send Reset Code
        </Button>
        <Button variant="ghost" className="w-full" onClick={onBack}>
          Back to Login
        </Button>
      </div>
    </Form>
  );
};
