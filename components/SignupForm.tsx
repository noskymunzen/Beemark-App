import useForm from "@/hooks/useForm";
import { PostSignup } from "@/services/auth/auth.types";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";
import BoxForm from "./BoxForm";

interface SignupFormProps {
  ctx: ReturnType<typeof useForm<PostSignup>>;
  onSubmit: () => void;
}

const SignupForm: FC<SignupFormProps> = ({ ctx, onSubmit }) => {
  return (
    <BoxForm title=" User Register">
      <FormControl isInvalid={ctx.touched.name && ctx.errors.name}>
        <FormLabel mt="1rem">Name</FormLabel>
        <Input
          type="text"
          placeholder="Name"
          value={ctx.values?.name}
          onBlur={() => ctx.touchField("name")}
          onChange={(e) => {
            ctx.setField("name", e.target.value);
          }}
        />
        <FormErrorMessage>{ctx.errors.name}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={ctx.touched.email && ctx.errors.email}>
        <FormLabel mt="1rem">Email address</FormLabel>
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
      <FormControl isInvalid={ctx.touched.password && ctx.errors.password}>
        <FormLabel mt="1rem">Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={ctx.values?.password}
          onBlur={() => ctx.touchField("password")}
          onChange={(e) => {
            ctx.setField("password", e.target.value);
          }}
        />
        <FormErrorMessage>{ctx.errors.password}</FormErrorMessage>
      </FormControl>
      <Button
        mt="1rem"
        color="white"
        bg="#0987A0"
        _hover={{ backgroundColor: "#086F83" }}
        type="submit"
        onClick={onSubmit}
      >
        Sign up
      </Button>
    </BoxForm>
  );
};

export default SignupForm;
