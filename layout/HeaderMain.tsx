import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const HeaderMain = ({ formShowed, isPageResetPass }) => {
  return (
    <Flex
      minW="100vw"
      height="63px"
      bg="#0987A0"
      top="0px"
      zIndex="10"
      alignItems="center"
      justifyContent={{ base: "center", md: "space-between" }}
    >
      <Link href="/">
        <Text
          color="#F0F8FF"
          fontWeight="bold"
          ml={{ base: "1rem", md: "3rem" }}
          fontSize="20px"
          minW={{ base: "auto", md: "271px" }}
        >
          BEEMARK
        </Text>
      </Link>
      {!isPageResetPass && (
        <Flex
          gap={5}
          mr={{ base: "1rem", md: "3rem" }}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          <Link href="/login">
            <Button
              variant="link"
              color={formShowed === "login" ? "#2D3748" : "#F0F8FF"}
              fontWeight="bold"
            >
              Log in
            </Button>
          </Link>
          <Divider orientation="vertical" height="20px" colorScheme="gray" />
          <Link href="/signup">
            <Button
              variant="link"
              color={formShowed === "signup" ? "#2D3748" : "#F0F8FF"}
              fontWeight="bold"
            >
              Sign up
            </Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
export default HeaderMain;
