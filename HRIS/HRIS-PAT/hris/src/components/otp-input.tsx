import { useInput, useResourceContext, FieldTitle } from "ra-core";
import type { InputProps } from "ra-core";
import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@/components/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { InputHelperText } from "@/components/input-helper-text";
import { cn } from "@/lib/utils";

export type OTPInputProps = InputProps & {
  className?: string;
  containerClassName?: string;
  length?: number;
};

/**
 * OTP input component for 2FA verification codes.
 * 
 * Integrates shadcn's <InputOTP> with react-admin's form state.
 * Default length is 6 digits.
 * 
 * @example
 * <OTPInput source="code" length={6} validate={required()} />
 */
export const OTPInput = (props: OTPInputProps) => {
  const {
    label,
    source,
    className,
    containerClassName,
    helperText,
    length = 6,
    ...rest
  } = props;

  const resource = useResourceContext(props);
  const { id, field, isRequired } = useInput(props);

  return (
    <FormField id={id} className={className} name={field.name}>
      {label !== false && (
        <FormLabel>
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        </FormLabel>
      )}
      <FormControl>
        <InputOTP
          maxLength={length}
          containerClassName={cn("justify-start", containerClassName)}
          {...field}
          {...rest}
        >
          <InputOTPGroup>
            {Array.from({ length }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
      <InputHelperText helperText={helperText} />
      <FormError />
    </FormField>
  );
};
