import HeaderMain from "@/layout/HeaderMain";
import { Container, Flex } from "@chakra-ui/react";
import ResetPass from "../components/ResetPass";

export default function resetPass() {
  return (
    <Flex flexDirection="column">
      <HeaderMain formShowed={""} isPageResetPass={true} />
      <Container py="1.5rem">
        <ResetPass />
      </Container>
    </Flex>
  );
}
