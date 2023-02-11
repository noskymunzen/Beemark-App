import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import BoxForm from "./BoxForm";

interface SignupFormProps {
  signupValues: {};
  setSignupValues: () => void;
}

const SignupForm = ({ signupValues, setSignupValues, postSignin }) => {
  return (
    <BoxForm title=" User Register">
      <FormControl>
        <FormLabel mt="1rem">Name</FormLabel>
        <Input
          type="text"
          placeholder="Name"
          value={signupValues?.name}
          onChange={(e) => {
            setSignupValues({ ...signupValues, ["name"]: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel mt="1rem">Email address</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={signupValues?.email}
          onChange={(e) => {
            setSignupValues({ ...signupValues, ["email"]: e.target.value });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel mt="1rem">Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={signupValues?.password}
          onChange={(e) => {
            setSignupValues({
              ...signupValues,
              ["password"]: e.target.value,
            });
          }}
        />
      </FormControl>
      <Button
        mt="1rem"
        color="white"
        bg="#0987A0"
        _hover={{ backgroundColor: "#086F83" }}
        type="submit"
        onClick={postSignin}
      >
        Sign in
      </Button>
    </BoxForm>
  );
};

export default SignupForm;
