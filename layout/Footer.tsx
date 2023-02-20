import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      bg="RGBA(0, 0, 0, 0.06)"
      minH="70px"
      justifyContent="center"
      alignItems="center"
      display={{ base: "none", md: "flex" }}
    >
      <Text>Ninoska Münzenmayer &#169; {new Date().getFullYear()}</Text>
    </Flex>
  );
};

export default Footer;
