import { Form, required } from "ra-core";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/otp-input";

interface MfaFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  onBack: () => void;
  loading: boolean;
}

export const MfaForm = ({ onSubmit, onBack, loading }: MfaFormProps) => {
  return (
    <Form className="flex flex-col gap-8 items-center" onSubmit={onSubmit}>
      <OTPInput
        label="Verification Code"
        source="code"
        validate={required()}
      />
      <div className="flex flex-col gap-4 w-full">
        <Button
          type="submit"
          className="cursor-pointer w-full"
          disabled={loading}
        >
          Verify
        </Button>
        <Button variant="ghost" className="w-full" onClick={onBack}>
          Back to Login
        </Button>
      </div>
    </Form>
  );
};
