import useForm from "@/hooks/useForm";
import { PostRecover } from "@/services/auth/auth.types";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import BoxForm from "./BoxForm";

interface RecoverFormProps {
  ctx: ReturnType<typeof useForm<PostRecover>>;
  onSubmit: () => void;
}

const RecoverForm: FC<RecoverFormProps> = ({ ctx, onSubmit }) => {
  return (
    <BoxForm title=" Recover your account">
      <>
        <FormControl isInvalid={ctx.touched.email && ctx.errors.email}>
          <FormLabel mt="1rem">
            Enter your email to find your account.
          </FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={ctx.values?.email}
            onBlur={() => ctx.touchField("email")}
            onChange={(e) => {
              ctx.setField("email", e.target.value);
            }}
          />
          <FormErrorMessage>{ctx.errors.email}</FormErrorMessage>
        </FormControl>
        <ButtonGroup display="flex" justifyContent="flex-end" mt="1.5rem">
          <Link href="/auth/login">
            <Button minW="85px" type="submit">
              Cancel
            </Button>
          </Link>
          <Button
            minW="85px"
            color="white"
            bg="#0987A0"
            _hover={{ backgroundColor: "#086F83" }}
            type="submit"
            onClick={onSubmit}
          >
            {/* Send or Submit */}
            Seek
          </Button>
        </ButtonGroup>
      </>
    </BoxForm>
  );
};

export default RecoverForm;
