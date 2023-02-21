import useForm from "@/hooks/useForm";
import { ResetPasswordForm } from "@/services/auth/auth.types";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";
import BoxForm from "./BoxForm";

interface ResetPassFormProps {
  ctx: ReturnType<typeof useForm<ResetPasswordForm>>;
  onSubmit: () => void;
}

const ResetPassForm: FC<ResetPassFormProps> = ({ ctx, onSubmit }) => {
  return (
    <BoxForm title="Reset password">
      <FormControl
        display="flex"
        mt="1rem"
        flexDirection="column"
        isInvalid={ctx.touched.password && ctx.errors.password}
      >
        <FormLabel minW="100px" fontSize="sm">
          New password
        </FormLabel>
        <Input
          type="password"
          borderColor="gray.300"
          value={ctx.values?.password}
          onBlur={() => ctx.touchField("password")}
          onChange={(e) => {
            ctx.setField("password", e.target.value);
          }}
        />
        <FormErrorMessage>{ctx.errors.password}</FormErrorMessage>
      </FormControl>
      <FormControl
        display="flex"
        mt="1rem"
        flexDirection="column"
        isInvalid={ctx.touched.confirmPass && ctx.errors.confirmPass}
      >
        <FormLabel minW="100px" fontSize="sm">
          Repeat new password
        </FormLabel>
        <Input
          type="password"
          borderColor="gray.300"
          value={ctx.values?.confirmPass}
          onBlur={() => ctx.touchField("confirmPass")}
          onChange={(e) => {
            ctx.setField("confirmPass", e.target.value);
          }}
        />
        <FormErrorMessage>{ctx.errors.confirmPass}</FormErrorMessage>
      </FormControl>

      <Button
        mt="1rem"
        color="white"
        bg="cyan.700"
        _hover={{ backgroundColor: "#086F83" }}
        onClick={onSubmit}
      >
        Save new password
      </Button>
    </BoxForm>
  );
};

export default ResetPassForm;
