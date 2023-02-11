import $auth from "@/services/auth/auth.service";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import HeaderMain from "layout/HeaderMain";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import SignupForm from "../../components/SignupForm";

export default function Signup() {
  const [signupValues, setSignupValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const querySignup = useQuery(
    "postSignup",
    () => $auth.postSignin(signupValues),
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
      },
      onError: (err) => {
        console.log(err);
        console.log("hola");
      },
    }
  );

  const postSignin = async () => {
    await querySignup.refetch();
  };
  // useEffect(() => {
  //   console.log(emailRecover);
  // }, [emailRecover]);

  return (
    <Flex flexDirection="column">
      <HeaderMain
        title="Sign up"
        formShowed={"signup"}
        isPageResetPass={false}
      />
      <Container py="1.5rem">
        <SignupForm
          signupValues={signupValues}
          setSignupValues={setSignupValues}
          postSignin={postSignin}
        />
        <HStack justify="center" mt="0.5rem">
          <Text>Are you already a user?</Text>
          <Link href="/auth/login">
            <Button variant="link" color="#0987A0">
              Login
            </Button>
          </Link>
        </HStack>
      </Container>
    </Flex>
  );
}
