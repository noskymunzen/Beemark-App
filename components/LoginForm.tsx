import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import BoxForm from "./BoxForm";

const LoginForm = ({ loginValues, setLoginValues, postLogin }) => {
  return (
    <BoxForm title="User Login">
      <>
        <FormControl>
          <FormLabel mt="1rem">Email address</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={loginValues?.email}
            onChange={(e) => {
              setLoginValues({ ...loginValues, ["email"]: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt="1rem">Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={loginValues?.password}
            onChange={(e) => {
              setLoginValues({ ...loginValues, ["password"]: e.target.value });
            }}
          />
        </FormControl>
        <Button
          mt="1rem"
          color="white"
          bg="#0987A0"
          _hover={{ backgroundColor: "#086F83" }}
          type="submit"
          onClick={postLogin}
        >
          Login
        </Button>
      </>
    </BoxForm>
  );
};

export default LoginForm;
