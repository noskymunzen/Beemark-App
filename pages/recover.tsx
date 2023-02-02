import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import HeaderMain from "layout/HeaderMain";
import { useEffect, useState } from "react";
import RecoverForm from "../components/RecoverForm";

export default function Recover() {
  //const [formShowed, setFormShowed] = useState("login");

  const [emailRecover, setEmailRecover] = useState("");

  useEffect(() => {
    console.log(emailRecover);
  }, [emailRecover]);

  return (
    <Flex flexDirection="column">
      <HeaderMain formShowed={"recover"} isPageResetPass={false} />
      <Container py="1.5rem">
        <RecoverForm
          emailRecover={emailRecover}
          setEmailRecover={setEmailRecover}
        />
        <HStack
          display={{ base: "flex", md: "none" }}
          mt="0.5rem"
          direction={["column", "row"]}
          justify="center"
          align="center"
        >
          <Button variant="link" color="#0987A0">
            Try login again
          </Button>
          <Text>or</Text>
          <Button variant="link" color="#0987A0">
            Register
          </Button>
        </HStack>
      </Container>
    </Flex>
  );
}
