import useForm from "@/hooks/useForm";
import { PostLogin } from "@/services/auth/auth.types";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { FC } from "react";
import BoxForm from "./BoxForm";

interface LoginFormProps {
  ctx: ReturnType<typeof useForm<PostLogin>>;
  onSubmit: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ ctx, onSubmit }) => {
  return (
    <BoxForm title="User Login">
      <>
        <FormControl>
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
          {ctx.touched.email && ctx.errors.email && (
            <Text color="tomato" fontSize="xs">
              {ctx.errors.email}
            </Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel mt="1rem">Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={ctx.values.password}
            onBlur={() => ctx.touchField("password")}
            onChange={(e) => {
              ctx.setField("password", e.target.value);
            }}
          />
          {ctx.touched.password && ctx.errors.password && (
            <Text color="tomato" fontSize="xs">
              {ctx.errors.password}
            </Text>
          )}
        </FormControl>
        <Button
          mt="1rem"
          color="white"
          bg="#0987A0"
          _hover={{ backgroundColor: "#086F83" }}
          type="submit"
          onClick={onSubmit}
        >
          Login
        </Button>
      </>
    </BoxForm>
  );
};

export default LoginForm;
