import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import HeaderMain from "layout/HeaderMain";
import Link from "next/link";
import { useState } from "react";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  const [signupValues, setSignupValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  // useEffect(() => {
  //   console.log(emailRecover);
  // }, [emailRecover]);

  return (
    <Flex flexDirection="column">
      <HeaderMain formShowed={"signup"} isPageResetPass={false} />
      <Container py="1.5rem">
        <SignupForm
          signupValues={signupValues}
          setSignupValues={setSignupValues}
        />
        <HStack justify="center" mt="0.5rem">
          <Text>Are you already a user?</Text>
          <Link href="/login">
            <Button variant="link" color="#0987A0">
              Login
            </Button>
          </Link>
        </HStack>
      </Container>
    </Flex>
  );
}
