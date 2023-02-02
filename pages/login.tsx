import { Button, Container, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import HeaderMain from "layout/HeaderMain";
import Link from "next/link";
import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   console.log(emailRecover);
  // }, [emailRecover]);

  return (
    <Flex flexDirection="column">
      <HeaderMain formShowed={"login"} isPageResetPass={false} />
      <Container py="1.5rem">
        <>
          <LoginForm
            loginValues={loginValues}
            setLoginValues={setLoginValues}
          />
          <Stack
            mt="0.5rem"
            direction={["column", "row"]}
            justify="center"
            align="center"
          >
            <Link href="/recover">
              <Button variant="link" color="#0987A0">
                Forgot your password?
              </Button>
            </Link>
            <HStack>
              <Text>Still not a user?</Text>
              <Link href="/signup">
                <Button variant="link" color="#0987A0">
                  Register Now!
                </Button>
              </Link>
            </HStack>
          </Stack>
        </>
      </Container>
    </Flex>
  );
}
