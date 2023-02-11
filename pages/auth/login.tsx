import $auth from "@/services/auth/auth.service";
import { Button, Container, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import HeaderMain from "layout/HeaderMain";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const queryLogin = useQuery("postLogin", () => $auth.postLogin(loginValues), {
    enabled: false,
    onSuccess: async (res) => {
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      await router.push("/");
    },
    onError: (err) => {
      console.log(err);
      console.log("hola");
    },
  });

  const router = useRouter();

  const queryUserData = useQuery("getUserData", () => $auth.getUserData(), {
    enabled: false,
    onSuccess: async (res) => {
      console.log(res);
      await router.push("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const postLogin = async () => {
    await queryLogin.refetch();
  };

  const getUserData = async () => {
    await queryUserData.refetch();
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Flex flexDirection="column">
      <HeaderMain title="Log in" formShowed={"login"} isPageResetPass={false} />
      <Container py="1.5rem">
        <>
          <LoginForm
            loginValues={loginValues}
            setLoginValues={setLoginValues}
            postLogin={postLogin}
          />
          <Stack
            mt="0.5rem"
            direction={["column", "row"]}
            justify="center"
            align="center"
          >
            <Link href="/auth/recover">
              <Button variant="link" color="#0987A0">
                Forgot your password?
              </Button>
            </Link>
            <HStack>
              <Text>Still not a user?</Text>
              <Link href="/auth/signup">
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
