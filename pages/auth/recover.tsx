import $auth from "@/services/auth/auth.service";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import HeaderMain from "layout/HeaderMain";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import RecoverForm from "../../components/RecoverForm";

export default function Recover() {
  //const [formShowed, setFormShowed] = useState("login");

  const [emailRecover, setEmailRecover] = useState("");

  const queryrecover = useQuery(
    "postRecover",
    () =>
      $auth.postRecover({
        email: emailRecover,
      }),
    {
      enabled: false,
      onSuccess: (res) => {
        localStorage.setItem("code", res.data.code);
      },
      onError: (err) => {
        console.log(err);
        console.log("hola");
      },
    }
  );

  const postRecover = async () => {
    await queryrecover.refetch();
    console.log(queryrecover.status === "success");
  };

  // useEffect(() => {
  //   console.log(emailRecover);
  // }, [emailRecover]);

  return (
    <Flex flexDirection="column">
      <HeaderMain title="" formShowed={"recover"} isPageResetPass={false} />
      <Container py="1.5rem">
        <RecoverForm
          emailRecover={emailRecover}
          setEmailRecover={setEmailRecover}
          postRecover={postRecover}
        />
        <HStack
          display={{ base: "flex", md: "none" }}
          mt="0.5rem"
          direction={["column", "row"]}
          justify="center"
          align="center"
        >
          <Link href="/auth/login">
            <Button variant="link" color="#0987A0">
              Try login again
            </Button>
          </Link>
          <Text>or</Text>
          <Link href="/auth/signup">
            <Button variant="link" color="#0987A0">
              Register
            </Button>
          </Link>
        </HStack>
      </Container>
    </Flex>
  );
}
